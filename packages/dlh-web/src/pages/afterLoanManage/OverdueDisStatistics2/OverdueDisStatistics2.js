import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { overdueDisStatistics2Action } from './index';
import { CommonTable } from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


class OverdueDisStatistics2 extends Component {

    columns = [
        { title: <FormattedMessage id="page.table.assign.date" />, dataIndex: 'day', key: 'day' },
        { title: <FormattedMessage id="page.table.department" />, dataIndex: 'collector', width: '18%', key: 'collector' },
        { title: <FormattedMessage id="page.table.num.allocat.order" />, dataIndex: 'disCount', key: 'disCount' },
        {
            title: <FormattedMessage id="page.table.allocated.orders.amount" />,
            dataIndex: 'disOrderAmt',
            key: 'disOrderAmt',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        { title: <FormattedMessage id="page.table.num.repayment.order" />, dataIndex: 'repayCount', key: 'repayCount' },
        {
            title: <FormattedMessage id="page.table.repayment.order.amount" />,
            dataIndex: 'repaySumMoney',
            key: 'repaySumMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        { title: <FormattedMessage id="page.table.repayment.order.rate" />, dataIndex: 'repayCountRate', key: 'repayCountRate' },
        { title: <FormattedMessage id="page.table.repayment.amount.rate" />, dataIndex: 'repaySumMoneyRate', key: 'repaySumMoneyRate' }
    ];

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled:false
        };
        this.initTime = [
            moment().subtract(30, 'days'),
            moment()
        ];
        this.searchParams={...this.convertParams(), page: 0, size: 10 };
    }
    
    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/overdueCollectionDownLoad2",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.overdue.collect.statis2.export"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime, queryId = '',disId='' } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD'): '',
            endTime: isArr? time[1].format('YYYY-MM-DD') : '',
            queryId,
            disId
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
        getTableData({ ...this.searchParams, page: current - 1, size: pageSize });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        const params = this.convertParams();
        getTableData({ ...params, page: 0, size: 10 });
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
    const { afterLoanManageState: { overdueDisStatistics2State } } = state;
    return {
        tableData: overdueDisStatistics2State['tableData'],
        loading: overdueDisStatistics2State['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueDisStatistics2Action.dsdOscGetTableData,
        setTableData: overdueDisStatistics2Action.dsdOscSetTableData
    }, dispatch);
}

OverdueDisStatistics2.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueDisStatistics2));