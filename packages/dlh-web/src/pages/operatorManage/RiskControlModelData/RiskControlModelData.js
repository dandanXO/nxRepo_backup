import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { riskControlModelDataAction } from './index';
import { CommonTable, CopyText } from 'components';
import SearchList from './SearchList/SearchList';
import moment from "moment/moment";
import { message } from "antd";
import { axios } from "utils";
import download from "downloadjs";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';


const convertParams = (time) => {
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : ''
    };
}

class RiskControlModelData extends Component {
    columns = [
        { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'name', key: 'name', width: '15%', render(text) { return <CopyText text={text} /> } },
        { title: <FormattedMessage id="page.search.list.mobile" />, dataIndex: 'phone', key: 'phone', render(text) { return <CopyText text={text} /> } },
        { title: <FormattedMessage id="windowPage.risk.model.name" />, dataIndex: 'providerDisplayName', key: 'providerDisplayName', width: '6%', render(text) { return <CopyText text={text} /> } },
        { title: <FormattedMessage id="windowPage.risk.model.score" />, dataIndex: 'score', key: 'score', width: '6%', render(text) { return <CopyText text={text} /> } },
        // { title: <FormattedMessage id="windowPage.bluelight.score" />, dataIndex: 'score', key: 'score', width: '6%', render(text) { return <CopyText text={text} /> } },
        // { title: <FormattedMessage id="windowPage.destiny.score" />, dataIndex: 'destinyScore', key: 'destinyScore', width: '6%', render(text) { return <CopyText text={text} /> } },
        // {title: <FormattedMessage id="windowPage.epoch.score"/>, dataIndex: 'epochScore', key: 'epochScore'},
        // {title: <FormattedMessage id="windowPage.shendun.score"/>, dataIndex: 'shenDunScore', key: 'shenDunScore'},
        //{ title: <FormattedMessage id="windowPage.credit.report.score" />, dataIndex: 'wjfScore', key: 'wjfScore' },
        //{ title: <FormattedMessage id="windowPage.customized.score" />, dataIndex: 'riskDModelScore', key: 'riskDModelScore' },
        { title: <FormattedMessage id="page.table.loan.date" />, dataIndex: 'loanTime', key: 'loanTime' },
        { title: <FormattedMessage id="page.tabel.due.date" />, dataIndex: 'expireTime', key: 'expireTime' },
        { title: <FormattedMessage id="page.table.repayment.date" />, dataIndex: 'minPayTime', key: 'minPayTime' },
        { title: <FormattedMessage id="page.table.current.status" />, dataIndex: 'state', key: 'state', width: '11%' },
        { title: <FormattedMessage id="page.table.channel.ID" />, dataIndex: 'channelId', key: 'channelId', width: '6%' },
        { title: <FormattedMessage id="page.search.list.channelId" />, dataIndex: 'channelName', key: 'channelName', width: '14%', render(text) { return <CopyText text={text} /> } },
        { title: <FormattedMessage id="page.table.number.loan" />, dataIndex: 'count', key: 'count', width: '7%' },
        // {
        //     title: '放款本金',
        //     dataIndex: 'lendMoney',
        //     key: 'lendMoney',
        //     render(text, record) {
        //         return convertMoneyFormat(text);
        //     }
        // },
    ];

    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.state = {
            time: [moment().subtract(9, 'days'), moment()],
            btnDisabled: false
        };
    }

    componentDidMount() {
        const {getTableData} = this.props;
        const params = convertParams(this.state.time);
        this.searchParams = params
        //getTableData({ ...params });
    }

    handleSearch = (obj) => {
        const {time = []} = obj;
        const {getTableData} = this.props;
        const params = convertParams(time);
        this.searchParams = params;
        getTableData({ ...params, page: 0, size: 10 });
    }

    //导出记录
    exportRecord = (obj) => {
        const {time = []} = obj;
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const searchStatus = convertParams(time);
        axios({
            url: "/hs/admin/order/riskControlAndRePaymentDownload",
            method: "post",
            responseType: "blob",
            data: searchStatus
        })
            .then(res => {
                hide && hide();
                this.setState({btnDisabled: false});
                download(res, this.props.intl.formatMessage({id: "page.table.risk.model.score.data"}, {expDate: Date.now()}));
            })
            .catch(() => {
                hide && hide();
                this.setState({btnDisabled: false});
            });
    };

    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({size:pageSize, page: current-1, ...this.searchParams});
    }


    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const {btnDisabled} = this.state;

        return (
            <div>
                <SearchList handleSearch={this.handleSearch} initTime={this.state.time}
                            exportRecord={this.exportRecord}
                            btnDisable={btnDisabled}
                />
                <CommonTable

                    dataSource={data}
                    loading={loading}
                    pagination={pagination}
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {operatorManageState: {riskControlModelDataState}} = state;
    return {
        tableData: riskControlModelDataState['tableData'],
        loading: riskControlModelDataState['loading']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: riskControlModelDataAction.rcmdGetTableData,
        setTableData: riskControlModelDataAction.rcmdSetTableData
    }, dispatch);
}

RiskControlModelData.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RiskControlModelData));