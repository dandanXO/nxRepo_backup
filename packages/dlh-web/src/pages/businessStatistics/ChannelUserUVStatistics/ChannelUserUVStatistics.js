import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { channelUserUVStatisticsAction } from './index';
import { CommonTable, CopyText } from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';


class ChannelUserUVStatistics extends Component {

    columns = [
        { title: <FormattedMessage id="page.table.date" />, dataIndex: 'date', key: 'date', sorter: true },
        { title: <FormattedMessage id="page.table.channel.ID" />, dataIndex: 'channel_id', key: 'channel_id', sorter: true },
        { title: <FormattedMessage id="page.search.list.channelId" />, dataIndex: 'name', key: 'name', sorter: true },
        { title: <FormattedMessage id="page.table.uv.qantity" />, dataIndex: 'uv', key: 'uv', sorter: true },
        {
            title: <FormattedMessage id="page.search.list.source.URL" />, dataIndex: 'user_source', key: 'user_source', sorter: true, width: '40%',
            render(text) {
                return <CopyText text={text} />
            }
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            channelList : []
        };
        this.initTime = [
            moment().subtract(7, 'days'),
            moment()
        ];
        this.userSource = "";
        const _this = this;
        this.pageSize = 30;
        this.sorter = {};
        this.searchParams = this.convertParams({});
    }
    
    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/getChannelSourceUVStatisticDownload",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.channel.user.statistics"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime , channelId='',userSource = this.userSource } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const sorter = this.sorter;
        return {
            startDate: isArr ? time[0].format('YYYY-MM-DD'): '',
            endDate: isArr? time[1].format('YYYY-MM-DD') : '',
            channelId,
            userSource,
            sortField:sorter.field,
            sortOrder:sorter.order
        };
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = this.convertParams(obj);
        this.searchParams = params;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    handlePageChange = (pagination,filters, sorter) => {
        this.sorter = sorter;
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.searchParams.sortField = this.sorter.field;
        this.searchParams.sortOrder = this.sorter.order;
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams({});
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
        this.getChannelList();
    }

    getChannelList() {
        const _this = this;
        axios({
            url: '/hs/admin/channel/getChannelList',
            method: 'post',
            data: {pageSize: 1000, pageNum: 1}
        }).then((res) => {
            if(res && res.code == '200') {
                let { data } = res;
                data.records.unshift({id: '', name: _this.props.intl.formatMessage({id : "page.search.list.no.restrict"})});
                _this.setState({
                    channelList : data.records
                });
                
            }
        });
    }


    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        const {channelList} = this.state;
        return (
            <div>
                <SearchList initTime={this.initTime} userSource={this.userSource} handleSearch={this.handleSearch} channelList={channelList}
                		  exportRecord={this.exportRecord}
                          btnDisable={this.state.btnDisable}
                          />
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} pageSize={this.pageSize}/>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { channelUserUVStatisticsState } } = state;
    return {
        tableData: channelUserUVStatisticsState['tableData'],
        loading: channelUserUVStatisticsState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: channelUserUVStatisticsAction.channelUserUvStatisticGetTableData,
        setTableData: channelUserUVStatisticsAction.channelUserUvStatisticSetTableData
    }, dispatch);
}

ChannelUserUVStatistics.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChannelUserUVStatistics));