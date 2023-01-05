import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable,CopyText } from 'components';
import { orderStatisticsAction } from './index';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import { Button,message } from 'antd';
import {axios,orderStatus,convertMoneyFormat} from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";
import {getIsSuperAdmin, getAllMerchants} from "utils";
const convertParams = (obj = {}) => {
    const { phoneNo = '', nameTrue = '',status='',merchantId='' } = obj;
    return {
        phoneNo,
        nameTrue,
        status,
        merchantId
    };
}

class OrderStatistics extends Component {
    

    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            btnDisabled: false,
            isSuperAdmin,
            allMerchants
        };
        this.searchParams = convertParams();
        this.columns = [
            {
                title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'nameTrue', key: 'nameTrue', width: '15%',
                render(text, record) {
                    return <CopyText text={text} />;
                }
            },
            {
                title: <FormattedMessage id="windowPage.mobile" />, dataIndex: 'phoneNo', key: 'phoneNo', 
                render(text, record) {
                    return <CopyText text={text} />;
                }
            },
            { title: <FormattedMessage id="page.table.number.loan" />, dataIndex: 'orderCount', key: 'orderCount' },
            {
                title: <FormattedMessage id="page.table.accumulated.contract.amount" />,
                dataIndex: 'sumOrderAmt',
                key: 'sumOrderAmt',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />
                }
            },
            {
                title: <FormattedMessage id="page.table.accumulated.repayment.amount" />,
                dataIndex: 'sumRepayAmt',
                key: 'sumRepayAmt',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />
                }
            },
            {
                title: <FormattedMessage id="page.table.recent.order.status" />, dataIndex: 'newStatus', key: 'newStatus', width: '12%',
                render(text) {
                    return orderStatus[text];
                }
            },
            {
                title: <FormattedMessage id="page.table.recent.order.loan.date" />, dataIndex: 'newLoanTime', width: '13%', key: 'newLoanTime',
                render(text) {
                    return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: <FormattedMessage id="page.table.recent.order.due.date" />, dataIndex: 'newExpireTime', width: '13%', key: 'newExpireTime',
                render(text) {
                    return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: <FormattedMessage id="page.table.longest.overdue.days" />, dataIndex: 'maxExpireDays', key: 'maxExpireDays'
                , render(text) {
                    return text ? text : 0;
                }
            }
        ];
        if (isSuperAdmin) {
            this.columns.unshift({
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'merchantName',
                key: 'merchantName'
            })
        }
       
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({  ...this.searchParams,pageSize, pageNum: current, });
    }

    handleSearch = (obj) => {
        const params = convertParams(obj);
        this.searchParams = params;
        const { getTableData } = this.props;
        getTableData({ ...params, pageSize: 10, pageNum: 1 });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        // getTableData({ pageSize: 10, pageNum: 1, ...this.searchParams });
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({ data: [], pagination: {} });
    }

    
    //导出记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/newStatistics/orderStatisticDownLoad',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.order.statistics.report.export"}, {expDate : Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }


    render() {
        const { tableData: { data, pagination }, loading ,isSuperAdmin} = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record" /></Button></div>
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
    const { businessStatisticsState: { orderStatisticsState } } = state;
    return {
        tableData: orderStatisticsState['tableData'],
        loading: orderStatisticsState['loading']
    };

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: orderStatisticsAction.orsGetTableData,
        setTableData: orderStatisticsAction.orsSetTableData
    }, dispatch);
}

OrderStatistics.PropTypes ={
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderStatistics));