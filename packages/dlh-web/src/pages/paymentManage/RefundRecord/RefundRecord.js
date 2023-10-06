import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { CommonTable, CopyText } from 'components';
import {refundRecordAction} from './index';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import { Button, message } from 'antd';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';
import styles from "./RefundRecord.less"
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const convertParams = (obj = {}) => {
    const {time = [], orderNo = '', userName = '', phoneNo = '', status = '', payTradeNo, assetType = '0', payName = '', merchantId = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        orderNo,
        phoneNo,
        userName,
        status,
        payTradeNo,
        assetType,
        payName,
        merchantId
    };
}

const payStatus = {
    0: <FormattedMessage id="page.search.list.paying"/>,
    1: <FormattedMessage id="page.search.list.paid.success"/>,
    2: <FormattedMessage id="page.search.list.paid.fail"/>
};

class RefundRecord extends Component {



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
        {
          title: this.props.intl.formatMessage({ id: "page.search.list.repaid.time" }),
          dataIndex: 'payTime',
          key: 'payTime',
          width: isSuperAdmin ? '7%' : '13%',
          render(text) {
            return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")
          }
        },
        { title: this.props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', width: '15%',  render(text) { return <CopyText text={text} /> } },
        { title: this.props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userName', key: 'userName', width: '15%', render(text) { return <CopyText text={text} isEllispsis={true} /> } },
        { title: this.props.intl.formatMessage({ id: "page.search.list.product.name" }), dataIndex: 'productName', key: 'productName', width: '9%' },
        { title: this.props.intl.formatMessage({ id: "page.table.appName" }), dataIndex: 'appName', key: 'appName', width: '9%' },
        { title: this.props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'phoneNo', key: 'phoneNo',  width: '9%'},
        {
          title: this.props.intl.formatMessage({ id: "page.table.total.repaid" }),
          dataIndex: 'totalMoney',
          key: 'totalMoney',
          width: '7%',
          render(text, record) {
            return <CopyText text={convertMoneyFormat(text)} />;
          }
        },
        { title: this.props.intl.formatMessage({ id: "page.table.coupon.usage.amount" }), dataIndex: 'couponUsageAmount', key: 'couponUsageAmount',  width: '9%'},
        {

          title: this.props.intl.formatMessage({ id: "page.search.list.funds.types" }),
          dataIndex: 'isLeng',
          key: 'isLeng',
          width: '6%',
          render(text) {
            if (text == 1) {
              return <FormattedMessage id="page.table.virtual" />;
            } else {
              return <FormattedMessage id="page.search.list.normal" />;
            }
          }
        },
        {
          title: this.props.intl.formatMessage({ id: "page.search.list.platform" }),
          dataIndex: 'payName',
          key: 'payName',
          width: '10%',
          render(text) { return <CopyText text={text} /> }
        },
        {
          title: this.props.intl.formatMessage({ id: "page.table.repaid.status" }),
          dataIndex: 'payStatus',
          key: 'payStatus',
          width: '6%',
          render(text) {
            return payStatus[text];
          }
        },
        { title: this.props.intl.formatMessage({ id: "page.search.list.trans.serial.no" }), dataIndex: 'payTradeNo', key: 'payTradeNo', width: '8%' ,  render(text) { return <CopyText text={text} isEllispsis={true} /> } },
      ];

        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName',
            width: '6%',
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
            url: '/hs/admin/loan/repaymentistDownload',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.repaid.list"}, {expDate: Date.now()}));
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
            <div className={styles.wrapper}>
              <Button type={"danger"} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record" /></Button>
              <div>
                <span>*</span><FormattedMessage id="page.search.list.partial.repaid" />
              </div>
            </div>
            <CommonTable
              columns={this.columns}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              handlePageChange={this.handlePageChange}
              rowClassName={(row, index) => (row.highlightPartialRepay ? "partialRepayment" : "")}
            />
          </div>
        );
    }


}

const mapStateToProps = (state) => {
    const {paymentManageState: {refundRecordState}} = state;
    return {
        tableData: refundRecordState['tableData'],
        loading: refundRecordState['loading']
    };

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: refundRecordAction.rrdGetTableData,
        setTableData: refundRecordAction.rrdSetTableData
    }, dispatch);
}

RefundRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RefundRecord));
