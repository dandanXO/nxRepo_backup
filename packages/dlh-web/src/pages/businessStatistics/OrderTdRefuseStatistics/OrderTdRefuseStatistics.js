import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {orderTdRefuseStatisticsAction} from './index';
import {CommonTable,CopyText} from 'components';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";
import {getIsSuperAdmin, getAllMerchants} from "utils";
class OrderTdRefuseStatistics extends Component {
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
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = { btnDisabled: false ,  isSuperAdmin, allMerchants};
        this.initTime = [
            moment(),
            moment()
        ];
        this.searchParams = {}
    }

    handleSearch = (obj) => {
        const { time, channelId ,merchantId='' } = obj;
        const { getTableData } = this.props;
        const isArr = Array.isArray(time) && time.length > 0;
        this.searchParams = {
            startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
            channelId: channelId,
            merchantId
        }
        getTableData({ ... this.searchParams, page: 0, size: 10 });
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams,page: current - 1, size: pageSize,  });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = {
            startTime: this.initTime[0].format('YYYY-MM-DD 00:00:00'),
            endTime: this.initTime[1].format('YYYY-MM-DD 23:59:59'),
            channelId: '',
            merchantId:''
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
            channelId:channelId,
            merchantId:''
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
                    isSuperAdmin={this.state.isSuperAdmin}
                    allMerchants={this.state.allMerchants}
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
    const {businessStatisticsState: {orderTdRefuseStatisticsState}} = state;
    return {
        tableData: orderTdRefuseStatisticsState['tableData'],
        loading: orderTdRefuseStatisticsState['loading']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: orderTdRefuseStatisticsAction.orderTrsGetTableData,
        setTableData: orderTdRefuseStatisticsAction.orderTrsSetTableData
    }, dispatch);
}

OrderTdRefuseStatistics.PropTypes={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderTdRefuseStatistics));
