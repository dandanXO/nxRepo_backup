import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { CommonTable, CopyText } from 'components';
import {olRefundRecordAction} from './index';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import {Button, message} from 'antd';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const convertParams = (obj = {}) => {
    const {time = [], orderNo = '', userName = '', phoneNo = '', status = '', merchantId = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        orderNo,
        phoneNo,
        userName,
        status,
        merchantId,
    };
}

class OlRefundRecord extends Component {

    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            isSuperAdmin,
            allMerchants,
            btnDisabled: false
        };
        this.pageSize = 10;
        this.searchParams = convertParams();

        this.columns = [
          { title: this.props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', width: 200, render(text) { return <CopyText text={text} /> } },
          { title: this.props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName', width: 200, render(text) { return <CopyText text={text} /> } },
          { title: this.props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone', width: 130, render(text) { return <CopyText text={text} /> } },
          { title: this.props.intl.formatMessage({id :"page.search.list.product.name"}), dataIndex: 'productName', key: 'productName', width: 110 },
          { title: this.props.intl.formatMessage({id :"page.table.appName"}), dataIndex: 'appName', key: 'appName', width: 110 },
          {
            title: this.props.intl.formatMessage({ id: "page.table.loan" }),
            dataIndex: 'deviceMoney',
            key: 'deviceMoney',
            width: 100,
            render(text, record) {
              return <CopyText text={convertMoneyFormat(text)} />;
            }
          },
          { title: this.props.intl.formatMessage({ id: "page.table.loan.period" }), dataIndex: 'lendDays', key: 'lendDays', width: 110 },
          {
            title: this.props.intl.formatMessage({ id: "page.table.overdue.time" }),
            dataIndex: 'expireTime',
            key: 'expireTime',
            width: 170,
            render(text) {
              return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
          },
          { title: this.props.intl.formatMessage({ id: "page.table.days.overdue" }), dataIndex: 'expireDay', key: 'expireDay', width: 100, },
          {
            title: this.props.intl.formatMessage({ id: "page.table.reduce.amount" }),
            dataIndex: 'reductionMoney',
            key: 'reductionMoney',
            width: 100,
            render(text, record) {
              return <CopyText text={convertMoneyFormat(text)} />;
            }
          },
          {
            title: this.props.intl.formatMessage({ id: "windowPage.add.time" }),
            dataIndex: 'addTime',
            key: 'addTime',
            width: 170,
            render(text) {
              return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
          },
          { title: this.props.intl.formatMessage({ id: "page.table.operation.people" }), dataIndex: 'operatorName', key: 'operatorName', width: 70, render(text) { return <CopyText text={text} /> } }
        ];
        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName',
            width: 60
          })
        }

    }

    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageSize, pageNum: current, ...this.searchParams});
    }

    handleSearch = (obj) => {
        const params = convertParams(obj);
        this.searchParams = params;
        const {getTableData} = this.props;
        getTableData({...params, pageSize: this.pageSize, pageNum: 1});
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({data: [], pagination: {}});
    }


    //导出还款记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/order/downloadOnlineReliefList',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.late.fee.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }


    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    scroll={{x:'100%'}}
                />
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const {paymentManageState: {olRefundRecordState}} = state;
    return {
        tableData: olRefundRecordState['tableData'],
        loading: olRefundRecordState['loading']
    };

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: olRefundRecordAction.olRrdGetTableData,
        setTableData: olRefundRecordAction.olRrdSetTableData
    }, dispatch);
}

OlRefundRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OlRefundRecord));
