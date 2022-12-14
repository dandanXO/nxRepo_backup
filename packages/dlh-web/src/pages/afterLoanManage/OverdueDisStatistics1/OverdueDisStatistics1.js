import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { overdueDisStatistics1Action } from './index';
import { CommonTable } from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";


class OverdueDisStatistics1 extends Component {

    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            isSuperAdmin,
            allMerchants,
            btnDisabled:false
        };
        this.initTime = [
            moment().subtract(30, 'days'),
            moment()
        ];
        this.searchParams={...this.convertParams(), page: 0, size: 10 };
        this.columns = [
          { title: <FormattedMessage id="page.table.assign.date" />, dataIndex: 'day', key: 'day' },
          { title: <FormattedMessage id="page.table.personnel" />, dataIndex: 'collector', width: '18%', key: 'collector' },
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

        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName'
          })
        }
    }

    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/overdueCollectionDownLoad1",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.overdue.collect.statis.export"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime, queryId = '',disId = '', merchantId = ''  } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD'): '',
            endTime: isArr? time[1].format('YYYY-MM-DD') : '',
            queryId,
            disId,
            merchantId,
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
        getTableData({ ...this.searchParams, page: current - 1, size: pageSize, });
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
                    isSuperAdmin={this.state.isSuperAdmin}
                    allMerchants={this.state.allMerchants}
                />
                <CommonTable
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    columns={this.columns}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const { afterLoanManageState: { overdueDisStatistics1State } } = state;
    return {
        tableData: overdueDisStatistics1State['tableData'],
        loading: overdueDisStatistics1State['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueDisStatistics1Action.dscOscGetTableData,
        setTableData: overdueDisStatistics1Action.dscOscSetTableData
    }, dispatch);
}

OverdueDisStatistics1.PropTypes ={
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueDisStatistics1));
