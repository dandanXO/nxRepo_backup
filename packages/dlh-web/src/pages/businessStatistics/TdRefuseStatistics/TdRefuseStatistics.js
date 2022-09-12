import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tdRefuseStatisticsAction} from './index';
import {CommonTable,CopyText} from 'components';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

class TdRefuseStatistics extends Component {
    columns = [
        {
            title: <FormattedMessage id="page.table.hit.rule" />, dataIndex: 'refusedReason', key: 'refusedReason', width: '50%',
            render(text) { return <CopyText text={text} /> }
        },
        {
            title: <FormattedMessage id="page.table.hit.amount" />,
            dataIndex: 'num',
            key: 'num',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                return (a.num - b.num);
            }
        },
        { title: <FormattedMessage id="page.table.num.reject" />, dataIndex: 'totalCount', key: 'totalCount' },
        { title: <FormattedMessage id="page.table.hit.rate" />, dataIndex: 'rate', key: 'rate' }
    ];

    constructor(props) {
        super(props);
        this.state = { btnDisabled: false };
        this.initTime = [
            moment(),
            moment()
        ];
        this.searchParams = {}
    }

    handleSearch = (obj) => {
        const { time, channelId } = obj;
        const { getTableData } = this.props;
        const isArr = Array.isArray(time) && time.length > 0;
        this.searchParams = {
            startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
            channelId: channelId,
        }
        getTableData({ ... this.searchParams, page: 0, size: 10 });
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ page: current - 1, size: pageSize, ...this.searchParams });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = {
            startTime: this.initTime[0].format('YYYY-MM-DD 00:00:00'),
            endTime: this.initTime[1].format('YYYY-MM-DD 23:59:59'),
            channelId: '',
        }
        getTableData({ ... this.searchParams, page: 0, size: 10 });
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData([]);
    }

    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const {time ,channelId} = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const params = {
            startTime: isArr ? time[0].format('YYYY-MM-DD') : '',
            endTime: isArr ? time[1].format('YYYY-MM-DD') : '',
            channelId:channelId
        }
        axios({
        url: "/hs/admin/statistics/refusedReasonStatisticDownLoad",
        method: "post",
        responseType: "blob",
        data: params
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.reject.reason.statis.export"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };



    render() {
        const {tableData: { data, pagination }, loading} = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList
                    initTime={this.initTime}
                    handleSearch={this.handleSearch}
                    exportRecord={this.exportRecord}
                    btnDisable={btnDisabled}
                />
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {businessStatisticsState: {tdRefuseStatisticsState}} = state;
    return {
        tableData: tdRefuseStatisticsState['tableData'],
        loading: tdRefuseStatisticsState['loading']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: tdRefuseStatisticsAction.trsGetTableData,
        setTableData: tdRefuseStatisticsAction.trsSetTableData
    }, dispatch);
}

TdRefuseStatistics.PropTypes={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TdRefuseStatistics));
