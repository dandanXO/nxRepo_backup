import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { overdueStatisticsAction } from './index';
import { CommonTable, CopyText } from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';
import {getIsSuperAdmin, getAllMerchants} from "utils";

class OverdueStatistics extends Component {



    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            btnDisabled:false,
            isSuperAdmin,
            allMerchants
        };
        this.initTime = [
            moment().subtract(9, 'days'),
            moment()
        ];
        this.searchParams = this.convertParams();
        this.    columns = [
            { title: <FormattedMessage id="page.table.overdue.time" />, dataIndex: 'day', key: 'day' },
            { title: <FormattedMessage id="page.table.num.overdue.order" />, dataIndex: 'num', key: 'num' },
            {
                title: <FormattedMessage id="page.table.overdue.contract.amount" />,
                dataIndex: 'amount',
                key: 'amount',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: <FormattedMessage id="page.table.num.collect.order" />, dataIndex: 'ingNum', key: 'ingNum' },
            {
                title: <FormattedMessage id="page.table.collect.amount" />,
                dataIndex: 'ingMoney',
                key: 'ingMoney',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: <FormattedMessage id="page.table.recover.contract.amount" />,
                dataIndex: 'backMoney',
                key: 'backMoney',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            // { title: '催回展期费用', dataIndex: 'lengMoney', key: 'lengMoney' },
            {
                title: <FormattedMessage id="page.table.recover.late.fee" />,
                dataIndex: 'overMoney',
                key: 'overMoney',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: <FormattedMessage id="page.table.total.repayment" />,
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: <FormattedMessage id="page.table.back.order.rate" />,
                dataIndex: 'backRate',
                key: 'backRate',
                render(text) {
                    const data = Number(text) * 100;
                    return <CopyText text={`${data.toFixed(2)}%`}/>;
                }
            },
            {
                title: <FormattedMessage id="page.table.repayment.rate" />,
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    const { amount, totalAmount } = record;
                    const result = Number(totalAmount) / Number(amount) * 100;
                    return  <CopyText text={Number.isInteger(result) ? `${result}%` : `${result.toFixed(2)}%`}/>;
                }
            }
        ];
    }
    
    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/statistics/overdueStatisticDownLoad",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id :"page.table.overdue.statistics.export"},{expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime, days = '', merchantId = '' } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
            days,
            merchantId
        };
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams(obj);
        getTableData({ ...this.searchParams, page: 0, size: 10 });
    }
    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ page: current - 1, size: pageSize, ...this.searchParams });
    }
    componentDidMount () {
        const { getTableData } = this.props;
        getTableData({ ...this.convertParams(), page: 0, size: 10 });
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData([]);
    }


    render () {
        const { tableData: { data, pagination }, loading } = this.props;
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
              dataSource={data}
              loading={loading}
              columns={this.columns}
              pagination={pagination}
              handlePageChange={this.handlePageChange}
            />
          </div>
        );
    }


}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { overdueStatisticsState } } = state;
    return {
        tableData: overdueStatisticsState['tableData'],
        loading: overdueStatisticsState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueStatisticsAction.oscGetTableData,
        setTableData: overdueStatisticsAction.oscSetTableData
    }, dispatch);
}

OverdueStatistics.PropTypes={
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueStatistics));