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
import {getIsSuperAdmin, getAllMerchants} from "utils";
import styles from './NewOverdueStatistics.less';

const CustomColumnTitle = ({ titleText, contentText }) => {
    return <div className={styles.customColumn}>
        <div className={styles.customColumnTitle}>{titleText}</div>
        <div style={{ background: '#E6F7FF', margin: '-2px', padding: '0px' }} className={styles.customColumnText}>{contentText}</div>
    </div>
}

class NewOverdueStatistics extends Component {


    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        this.state = {
            channelList : [],
            isSuperAdmin,
            allMerchants,
        };
        this.initTime = [
            moment().subtract(9, 'days'),
            moment()
        ];
        this.isStatistLeng = false;
        const _this = this;
        this.searchParams = this.convertParams({});

    }


    //导出记录
    exportRecord = (obj) => {
        const { getTableData } = this.props;
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        this.searchParams = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/overdueRepayStatistics/download",
        method: "get",
        responseType: "blob",
        params:  this.searchParams
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            getTableData(this.searchParams);
            download(res, this.props.intl.formatMessage({id :'page.table.repayment.statis.export.two'}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime , channelId='',isOldUser='',isStatistLeng = this.isStatistLeng ,merchantId=''} = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD'): '',
            endTime: isArr? time[1].format('YYYY-MM-DD') : '',
            channelId,
            isOldUser,
            isStatistLeng,
            merchantId
        };
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams(obj);
        getTableData({  ...this.searchParams });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams({});
        getTableData({ ...this.searchParams });
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
        const { tableData: { list, total }, loading } = this.props;
        const {channelList} = this.state;

        const numberToFixed = (text) => {
            return <CopyText text={`${(Number(text) * 100).toFixed(2)}%`} />
        }

        const columns = [
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.date" />} contentText={total ? total.date : ''} />,
                dataIndex: 'date', key: 'date',width: '8%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.maturity" />} contentText={total ? total.dueOrderTotal : ''} />,
                dataIndex: 'dueOrderTotal', key: 'dueOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.realtime" />} contentText={total ? total.paidOrderTotal : ''} />,
                dataIndex: 'paidOrderTotal', key: 'paidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T_1Before" />} contentText={total ? total.t_1BeforePaidOrderTotal : ''} />,
                dataIndex: 't_1BeforePaidOrderTotal', key: 't_1BeforePaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T_1" />} contentText={total ? total.t_1PaidOrderTotal : ''} />,
                dataIndex: 't_1PaidOrderTotal', key: 't_1PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T0" />} contentText={total ? total.t0PaidOrderTotal : ''} />,
                dataIndex: 't0PaidOrderTotal', key: 't0PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T1" />} contentText={total ? total.t1PaidOrderTotal : ''} />,
                dataIndex: 't1PaidOrderTotal', key: 't1PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T2" />} contentText={total ? total.t2PaidOrderTotal : ''} />,
                dataIndex: 't2PaidOrderTotal', key: 't2PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T3" />} contentText={total ? total.t3PaidOrderTotal : ''} />,
                dataIndex: 't3PaidOrderTotal', key: 't3PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T4" />} contentText={total ? total.t4PaidOrderTotal : ''} />,
                dataIndex: 't4PaidOrderTotal', key: 't4PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T5" />} contentText={total ? total.t5PaidOrderTotal : ''} />,
                dataIndex: 't5PaidOrderTotal', key: 't5PaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.T5plus" />} contentText={total ? total.t5PlusPaidOrderTotal : ''} />,
                dataIndex: 't5PlusPaidOrderTotal', key: 't5PlusPaidOrderTotal', width: '3%'
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.realtime.repayment" }) + '%'}
                    contentText={total ? numberToFixed(total.paidOrderRate) : ''} />,
                dataIndex: 'paidOrderRate', key: 'paidOrderRate', width: '7%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T_1Before" }) + '%'}
                                          contentText={total ? numberToFixed(total.t_1BeforePaidOrderRate) : ''} />,
                dataIndex: 't_1BeforePaidOrderRate', key: 't_1BeforePaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T_1" }) + '%'}
                                          contentText={total ? numberToFixed(total.t_1PaidOrderRate) : ''} />,
                dataIndex: 't_1PaidOrderRate', key: 't_1PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T0.repayment" }) + '%'}
                    contentText={total ? numberToFixed(total.t0PaidOrderRate) : ''} />,
                dataIndex: 't0PaidOrderRate', key: 't0PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T1.repayment" }) + '%'}
                    contentText={total ? numberToFixed(total.t1PaidOrderRate) : ''} />,
                dataIndex: 't1PaidOrderRate', key: 't1PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T2" }) + '%'}
                    contentText={total ? numberToFixed(total.t2PaidOrderRate) : ''} />,
                dataIndex: 't2PaidOrderRate', key: 't2PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T3" }) + '%'}
                    contentText={total ? numberToFixed(total.t3PaidOrderRate) : ''} />,
                dataIndex: 't3PaidOrderRate', key: 't3PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T4" }) + '%'}
                    contentText={total ? numberToFixed(total.t4PaidOrderRate) : ''} />,
                dataIndex: 't4PaidOrderRate', key: 't4PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T5" }) + '%'}
                    contentText={total ? numberToFixed(total.t5PaidOrderRate) : ''} />,
                dataIndex: 't5PaidOrderRate', key: 't5PaidOrderRate', width: '5%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={this.props.intl.formatMessage({ id: "page.table.T5plus" }) + '%'}
                    contentText={total ? numberToFixed(total.t5PlusPaidOrderRate) : ''} />,
                dataIndex: 't5PlusPaidOrderRate', key: 't5PlusPaidOrderRate', width: '6%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.loan.principal" />} contentText={total ? <CopyText text={convertMoneyFormat(total.lendMoneyAmount)}/> : ''} />,
                dataIndex: 'lendMoneyAmount', key: 'lendMoneyAmount', width: '6%',
                render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.repayment.amount" />} contentText={total ? <CopyText text={convertMoneyFormat(total.paidOrderAmount)}/> : ''} />,
                dataIndex: 'paidOrderAmount', key: 'paidOrderAmount', width: '6%',
                render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="windowPage.late.fee" />} contentText={total ? <CopyText text={convertMoneyFormat(total.overMonyAmount)}/> : ''} />,
                dataIndex: 'overMonyAmount', key: 'overMonyAmount', width: '6%',
                render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.subtotal" />} contentText={total ? <CopyText text={convertMoneyFormat(total.totalMonyAmount)}/> : ''} />,
                dataIndex: 'totalMonyAmount', key: 'totalMonyAmount', width: '6%',
                render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.principal.repayment.rate" />}
                    contentText={total ? numberToFixed(total.paidLendMoneyRate) : ''} />,
                dataIndex: 'paidLendMoneyRate', key: 'paidLendMoneyRate', width: '8%',
                render (text, record) { return numberToFixed(text); }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.loan.principal.contain.leng" />}
                                          contentText={total ? <CopyText text={convertMoneyFormat(total.lendMoneyAmountContainLeng)}/> : ''} />,
                dataIndex: 'lendMoneyAmountContainLeng', key: 'lendMoneyAmountContainLeng', width: '6%',
                render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
                title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.repayment.amount.contain.leng" />}
                                          contentText={total ? <CopyText text={convertMoneyFormat(total.paidOrderAmountContainLeng)}/> : ''} />,
                dataIndex: 'paidOrderAmountContainLeng', key: 'paidOrderAmountContainLeng', width: '6%',
                render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
               title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.subtotal.contain.leng" />}
                                         contentText={total ? <CopyText text={convertMoneyFormat(total.totalMonyAmountContainLeng)}/> : ''} />,
               dataIndex: 'totalMonyAmountContainLeng', key: 'totalMonyAmountContainLeng', width: '6%',
               render (text, record) { return <CopyText text={convertMoneyFormat(text)} />; }
            },
            {
               title: <CustomColumnTitle titleText={<FormattedMessage id="page.table.principal.repayment.contain.leng.rate" />}
                                         contentText={total ? numberToFixed(total.paidLendMoneyRateContainLeng) : ''} />,
               dataIndex: 'paidLendMoneyRateContainLeng', key: 'paidLendMoneyRateContainLeng', width: '6%',
               render (text, record) { return numberToFixed(text); }
            },
        ];

        return (
            <div className={styles.newOverdueStatisticsTable}>
                <SearchList
                    initTime={this.initTime}
                    handleSearch={this.handleSearch}
                    channelList={channelList}
                    exportRecord={this.exportRecord}
                    btnDisable={this.state.btnDisable}
                    isSuperAdmin={this.state.isSuperAdmin}
                    allMerchants={this.state.allMerchants}
                />
                <CommonTable columns={columns} dataSource={list} loading={loading}  />
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
