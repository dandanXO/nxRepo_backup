import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newOverdueStatisticsAction } from './index';
import { CommonTable,CopyText } from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


class NewOverdueStatistics extends Component {

    columns = [
        { title: <FormattedMessage id="page.table.date" />, width: 110, dataIndex: 'date', key: 'date' },
        { title: <FormattedMessage id="page.table.maturity" />, dataIndex: 'dueOrderTotal', key: 'dueOrderTotal', width: 60 },
        { title: <FormattedMessage id="page.table.realtime" />, dataIndex: 'paidOrderTotal', key: 'paidOrderTotal', width: 60 },
        { title: <FormattedMessage id="page.table.T0" />, dataIndex: 't0PaidOrderTotal', key: 't0PaidOrderTotal', width: 55 },
        { title: <FormattedMessage id="page.table.T1" />, dataIndex: 't1PaidOrderTotal', key: 't1PaidOrderTotal', width: 55 },
        { title: <FormattedMessage id="page.table.T2" />, dataIndex: 't2PaidOrderTotal', key: 't2PaidOrderTotal', width: 55 },
        { title: <FormattedMessage id="page.table.T3" />, dataIndex: 't3PaidOrderTotal', key: 't3PaidOrderTotal', width: 55 },
        { title: <FormattedMessage id="page.table.T4" />, dataIndex: 't4PaidOrderTotal', key: 't3PaidOrderTotal', width: 55 },
        { title: <FormattedMessage id="page.table.T5" />, dataIndex: 't5PaidOrderTotal', key: 't3PaidOrderTotal', width: 55 },
        { title: <FormattedMessage id="page.table.T5plus" />, dataIndex: 't5PlusPaidOrderTotal', key: 't5PlusPaidOrderTotal', width: 60 },
        {
            title: this.props.intl.formatMessage({ id: "page.table.realtime.repayment" }) + '%', dataIndex: 'paidOrderRate', key: 'paidOrderRate',
            width: 100,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T0.repayment" }) + '%', dataIndex: 't0PaidOrderRate', key: 't0PaidOrderRate',
            width: 90,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T1.repayment" }) + '%', dataIndex: 't1PaidOrderRate', key: 't1PaidOrderRate',
            width: 90,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T2" }) + '%', dataIndex: 't2PaidOrderRate', key: 't2PaidOrderRate',
            width: 80,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T3" }) + '%', dataIndex: 't3PaidOrderRate', key: 't3PaidOrderRate',
            width: 80,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T4" }) + '%', dataIndex: 't4PaidOrderRate', key: 't4PaidOrderRate',
            width: 80,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T5" }) + '%', dataIndex: 't5PaidOrderRate', key: 't5PaidOrderRate',
            width: 80,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: this.props.intl.formatMessage({ id: "page.table.T5plus" }) + '%', dataIndex: 't5PlusPaidOrderRate', key: 't5PlusPaidOrderRate',
            width: 90,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
        {
            title: <FormattedMessage id="page.table.loan.principal" />,
            dataIndex: 'lendMoneyAmount',
            key: 'lendMoneyAmount',
            width: 100,
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.repayment.amount" />,
            dataIndex: 'paidOrderAmount',
            key: 'paidOrderAmount',
            width: 90,
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        // {
        //     title: '展期金额',
        //     dataIndex: 'lengAmount',
        //     key: 'lengAmount',
        //     render(text, record) {
        //         return convertMoneyFormat(text);
        //     }
        // },
        {
            title: <FormattedMessage id="windowPage.late.fee" />,
            dataIndex: 'overMonyAmount',
            key: 'overMonyAmount',
            width: 90,
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.subtotal" />,
            dataIndex: 'totalMonyAmount',
            key: 'totalMonyAmount',
            width: 90,
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.principal.repayment.rate" />, dataIndex: 'paidLendMoneyRate', key: 'paidLendMoneyRate',
            width: 120,
            render(text, record) {
                const data = Number(text) * 100;
                return <CopyText text={`${data.toFixed(2)}%`} />;
            }
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            channelList : []
        };
        this.initTime = [
            moment().subtract(9, 'days'),
            moment()
        ];
        this.isStatistLeng = false;
        const _this = this;
        this.pageSize = 30;
        this.searchParams = this.convertParams({});
    }
    
    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/overdueStatisticDownLoad",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id :'page.table.repayment.statis.export.two'}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime , channelId='',isOldUser='',isStatistLeng = this.isStatistLeng } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD'): '',
            endTime: isArr? time[1].format('YYYY-MM-DD') : '',
            channelId,
            isOldUser,
            isStatistLeng
        };
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = this.convertParams(obj);
        this.searchParams = params;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
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
                data.records.unshift({id: '', name: this.props.intl.formatMessage({id : "page.search.list.no.restrict"})});
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
                <SearchList initTime={this.initTime} handleSearch={this.handleSearch} channelList={channelList}
                		  exportRecord={this.exportRecord}
                          btnDisable={this.state.btnDisable}
                          />
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} pageSize={this.pageSize} scroll={{x:'100%'}}/>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { newOverdueStatisticsState } } = state;
    return {
        tableData: newOverdueStatisticsState['tableData'],
        loading: newOverdueStatisticsState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: newOverdueStatisticsAction.noscGetTableData,
        setTableData: newOverdueStatisticsAction.noscSetTableData
    }, dispatch);
}

NewOverdueStatistics.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NewOverdueStatistics));