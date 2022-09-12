import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {riskJointDebtModelDataAction} from './index';
import {CommonTable} from 'components';
import SearchList from './SearchList/SearchList';
import moment from "moment/moment";
import {message} from "antd";
import {axios, checkRecordStatus, orderStatus} from "utils";
import download from "downloadjs";
import {injectIntl} from "react-intl";
import PropTypes from 'prop-types';

const convertParams = (obj) => {
    const {time = [], loanTime = [], userPhone = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    const isLoanArr = Array.isArray(loanTime) && loanTime.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        loanStartTime: isLoanArr ? loanTime[0].format('YYYY-MM-DD 00:00:00') : '',
        loanEndTime: isLoanArr ? loanTime[1].format('YYYY-MM-DD 23:59:59') : '',
        userPhone: userPhone
    };
}


class RiskJointdebtModelData extends Component {

    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.state = {
            time: [moment(), moment()],
            btnDisabled: false,
        };
    }

    columns = [
        {title: this.props.intl.formatMessage({id: "windowPage.contact.person"}), dataIndex: 'realName', key: 'realName', width: 120},
        {title: this.props.intl.formatMessage({id: "windowPage.mobile"}), dataIndex: 'userPhone', key: 'userPhone', width: 120},
        {title: this.props.intl.formatMessage({id: "page.table.joint.debt.mobile"}), dataIndex: 'mobile', key: 'mobile', width: 120},
        {title: this.props.intl.formatMessage({id: "page.table.model.socre"}), dataIndex: 'modelScore', key: 'modelScore', width: 80},
        {
            title: this.props.intl.formatMessage({id: "page.table.exam.status"}),
            dataIndex: 'reviewStatus',
            key: 'reviewStatus',
            width: 100,
            render(text) {
                return checkRecordStatus[text];
            }
        },
        {
            title: this.props.intl.formatMessage({id: "page.search.list.order.status"}),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            width: 100,
            render(text) {
                return orderStatus[text];
            }
        },
        {title: this.props.intl.formatMessage({id: "page.table.refused.reason"}), dataIndex: 'refuseReson', key: 'refuseReson', width: 100},
        {
            title: this.props.intl.formatMessage({id: "page.table.loan.date"}),
            dataIndex: 'loanTime',
            key: 'loanTime',
            width: 100,
            render(text) {
                if (text != null && Number(text) > 0) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    return '';
                }
            }
        },
        {
            title: this.props.intl.formatMessage({id: "page.tabel.due.date"}),
            dataIndex: 'expireTime',
            key: 'expireTime',
            width: 100,
            render(text) {
                if (text != null && Number(text) > 0) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    return '';
                }
            }
        },
        {title: this.props.intl.formatMessage({id: "page.search.list.channelId"}), dataIndex: 'channelName', key: 'channelName', width: 70},
        {title: this.props.intl.formatMessage({id: "page.table.all.platform.order.total.count"}), dataIndex: 'totalOrderCount', key: 'totalOrderCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.all.platform.order.loan.success.total.count"}), dataIndex: 'totalSuccessCount', key: 'totalSuccessCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.loan.platform.total.count"}), dataIndex: 'totalPlatformCount', key: 'totalPlatformCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.loan.platform.success.total.count"}), dataIndex: 'totalSuccessPlatformCount', key: 'totalSuccessPlatformCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.overdue.platform.count"}), dataIndex: 'totalOverduePlatformCount', key: 'totalOverduePlatformCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.repayment.success.platform.count"}), dataIndex: 'totalSuccessRepayPlatformCount', key: 'totalSuccessRepayPlatformCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.repayment.success.order.count"}), dataIndex: 'totalSuccessRepayCount', key: 'totalSuccessRepayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.repayment.count.today"}), dataIndex: 'todayRepayCount', key: 'todayRepayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.order.progress.exam.repay"}), dataIndex: 'underWayCount', key: 'underWayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.current.pending.exam.order"}), dataIndex: 'waitCheckCount', key: 'waitCheckCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.current.refused.order"}), dataIndex: 'denyCount', key: 'denyCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.overdue.order.count"}), dataIndex: 'overdueYetCount', key: 'overdueYetCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.recent.month.order.overdue.repay.off"}), dataIndex: 'overdueNearlyMonthCount', key: 'overdueNearlyMonthCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.current.overdue.amount.sum"}), dataIndex: 'overdueYetMoney', key: 'overdueYetMoney', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.history.overdue.has.paid.off"}), dataIndex: 'historyOverdueCount', key: 'historyOverdueCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.today.order.application.count"}), dataIndex: 'applyTodayCount', key: 'applyTodayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.two.days.application.order.count"}), dataIndex: 'applyNearlyTwoDayCount', key: 'applyNearlyTwoDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.three.days.application.order.count"}), dataIndex: 'applyNearlyThreeDayCount', key: 'applyNearlyThreeDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.seven.days.application.order.count"}), dataIndex: 'applyNearlySevenDayCount', key: 'applyNearlySevenDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.thirty.days.application.order.count"}), dataIndex: 'applyNearlyThirtyDayCount', key: 'applyNearlyThirtyDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.due.today.order.count"}), dataIndex: 'dueTodayCount', key: 'dueTodayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.due.date.order.count.seven.day"}), dataIndex: 'dueNearlySevenDayCount', key: 'dueNearlySevenDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.two.days.repayment.order.count"}), dataIndex: 'repayNearlyTwoDayCount', key: 'repayNearlyTwoDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.seven.days.repayment.order.count"}), dataIndex: 'repayNearlySevenDayCount', key: 'repayNearlySevenDayCount', width: 80},
        {title: this.props.intl.formatMessage({id: "page.table.last.update.time"}), dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', width: 150},
    ];


    componentDidMount() {
        const {getTableData} = this.props;
        const params = convertParams({time: this.state.time});
        this.searchParams = params;
        getTableData({...params});
    }

    handleSearch = (obj) => {
        const params = convertParams(obj);
        const {getTableData} = this.props;
        this.searchParams = params;
        getTableData({...params});
    }

    //导出记录
    exportRecord = (obj) => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const searchStatus = convertParams(obj);
        const searchParam = {pageSize: 10000000, pageNum: 1, ...searchStatus};
        axios({
            url: "/hs/admin/order/riskJointDebtRecordDownload",
            method: "post",
            responseType: "blob",
            data: searchParam
        })
            .then(res => {
                hide && hide();
                console.log("export log");
                this.setState({btnDisabled: false});
                download(res, this.props.intl.formatMessage({id: "page.table.risk.joint.debt.model.data"}, {expDate: Date.now()}));
            })
            .catch(() => {
                hide && hide();
                this.setState({btnDisabled: false});
            });
    };

    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageSize, pageNum: current, ...this.searchParams});
    }


    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const {btnDisabled} = this.state;
        const pageInfo = {...pagination, pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500", "1000", "2000", "5000"], showSizeChanger: true}
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} initTime={this.state.time}
                            exportRecord={this.exportRecord}
                            btnDisable={btnDisabled}
                />
                <CommonTable
                    dataSource={data}
                    loading={loading}
                    pagination={pageInfo}
                    handlePageChange={this.handlePageChange}
                    columns={this.columns} bordered scroll={{x: '100%', y: 500}}
                    rowKey={record => record.id}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {operatorManageState: {riskJointDebtModelDataState}} = state;
    return {
        tableData: riskJointDebtModelDataState['tableData'],
        loading: riskJointDebtModelDataState['loading']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: riskJointDebtModelDataAction.rjmdGetTableData,
        setTableData: riskJointDebtModelDataAction.rjmdSetTableData
    }, dispatch);
}

RiskJointdebtModelData.propTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RiskJointdebtModelData));




