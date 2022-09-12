import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loanRecycleStatisticsAction } from './index';
import { CommonTable, CopyText } from 'components';
import SearchList from './SearchList/SearchList';
import moment from "moment/moment";
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const convertParams = (time) => {
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : ''
    };
}

class LoanRecycleStatistics extends Component{
    columns = [
        { title: <FormattedMessage id="page.table.loan.time" />, dataIndex: 'day', key: 'day' },
        { title: <FormattedMessage id="page.table.num.loan" />, dataIndex: 'loanNum', key: 'loanNum' },
        {
            title: <FormattedMessage id="page.table.loan.principal" />,
            dataIndex: 'lendMoney',
            key: 'lendMoney',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.loan.contract.amount" />,
            dataIndex: 'deviceMoney',
            key: 'deviceMoney',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.normal.repayment" />,
            dataIndex: 'normalRepayment',
            key: 'normalRepayment',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        // { title: '正常展期费用', dataIndex: 'normalLeng', key: 'normalLeng' },
        {
            title: <FormattedMessage id="page.table.overdue.repayment" />,
            dataIndex: 'overdueRepayment',
            key: 'overdueRepayment',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        // { title: '逾期展期费用', dataIndex: 'overdueLeng', key: 'overdueLeng' },
        {
            title: <FormattedMessage id="page.table.overdue.late.fee" />,
            dataIndex: 'overMoney',
            key: 'overMoney',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        // { title: '在贷金额', dataIndex: 'ingLoan', key: 'ingLoan' },
        {
            title: <FormattedMessage id="page.table.normal.loan.amount" />,
            dataIndex: 'ingLoanNormal',
            key: 'ingLoanNormal',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.overdue.loan.amount" />,
            dataIndex: 'ingLoanDue',
            key: 'ingLoanDue',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.total.repayment" />,
            dataIndex: 'totalRepayment',
            key: 'totalRepayment',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.first.overdue.rate" />,
            dataIndex: 'firstDueLoanRate',
            key: 'firstDueLoanRate',
            render(text) {
                const str = Number(text) * 100;
                return <CopyText text={Number.isInteger(str) ? `${str}%` : `${str.toFixed(2)}%`}/>;
            }
        },
        {
            title: <FormattedMessage id="page.table.principal.recovery.rate" />,
            dataIndex: 'rate',
            key: 'rate',
            render(text) {
                const str = Number(text) * 100;
                return <CopyText text={Number.isInteger(str) ? `${str}%` : `${str.toFixed(2)}%`}/>;
            }
        },
    ];
    constructor(props) {
        super(props);
        this.state = {
            time: [moment().subtract(9, 'days'), moment()],
            btnDisabled:false
        };
    }

    componentDidMount() {
        const { getTableData } = this.props;
        const params = convertParams(this.state.time);
        getTableData({ ...params });
    }

    handleSearch = (obj) => {
        const { time = [] } = obj;
        const { getTableData } = this.props;
        const params = convertParams(time);
        getTableData({ ...params });
    }

    //导出记录
    exportRecord = (obj) => {
        const { time = [] } = obj;
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = convertParams(time);
        axios({
        url: "/hs/admin/statistics/s1Download",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.repayment.statis.export"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    render() {
        const { tableData: { data }, loading } = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} initTime={this.state.time}
                		  exportRecord={this.exportRecord}
                          btnDisable={btnDisabled}
                          />
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    loading={loading}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { loanRecycleStatisticsState } } = state;
    return {
        tableData: loanRecycleStatisticsState['tableData'],
        loading: loanRecycleStatisticsState['loading']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: loanRecycleStatisticsAction.lrsGetTableData,
        setTableData: loanRecycleStatisticsAction.lrsSetTableData
    }, dispatch);
}

LoanRecycleStatistics.PropTypes= {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoanRecycleStatistics));