import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {CommonTable,CopyText} from 'components';
import {overdueBackRecordAction} from './index';
import SearchList from './SearchList/SearchList';
import {Button, message,Tooltip} from 'antd';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';
import styles from "./OverdueBackRecord.less"

const convertParams = (obj) => {
    const {time, phoneNo, name, orderNo, payType, backType} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    //todo 核对参数
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        userPhone: phoneNo,
        userTrueName: name,
        orderNo,
        payId: payType,
        state: backType
    }
}

const backTypeObj = {
    // "1": "还款",
    // "2": "延长履约期",
    // "3": "正常全款",
    // "4": "正常部分",
    "5": <FormattedMessage id="windowPage.full.repayment.overdue"/>,
    "6": <FormattedMessage id="windowPage.part.repayment.overdue"/>,
    "7": <FormattedMessage id="windowPage.reduce.repayment"/>,
    "8": <FormattedMessage id="windowPage.extend.repayment"/>
};


class OverdueBackRecord extends Component {
    //todo 核对字段
    columns = [
        {
            title: <FormattedMessage id="page.table.overdue.time" />,
            dataIndex: 'expireTime',
            key: 'expireTime',
            width: '8%',
            render(text) {
                return text ? moment(Number(text) * 1000).format('YYYY-MM-DD') : '';
            }
        },
        {
            title: <FormattedMessage id="page.search.list.repaid.time" />,
            dataIndex: 'payTime',
            key: 'payTime',
            width: '10%',
            render(text) {
                return <Tooltip title={moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}>
                    {moment(Number(text) * 1000).format("MM-DD HH:mm:ss")}
                </Tooltip>;
            }
        },
        { title: <FormattedMessage id="page.search.list.order.no" />, dataIndex: 'orderNo', key: 'orderNo', render(text) { return <CopyText text={text} /> } },
        {
            title: <FormattedMessage id="page.search.list.product.name" />,
            dataIndex: "productName",
            key: "productName",
            width:'8%',
            render(text) { return <CopyText text={text} isEllispsis={true} /> }
        },
        { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'userName', key: 'userName', render(text) { return <CopyText text={text} isEllispsis={true} /> } },
        { title: <FormattedMessage id="page.search.list.mobile" />, dataIndex: 'phoneNo', key: 'phoneNo', width: '10%', render(text) { return <CopyText text={text} /> } },
        { title: <FormattedMessage id="windowPage.payment.method" />, dataIndex: 'payName', key: 'payName',  width: '8%', render(text) { return <CopyText text={text} /> } },
        {
            title: <FormattedMessage id="windowPage.repayment.type" />,
            dataIndex: 'state',
            key: 'state',
            width: '7%',
            render(text) {
                return backTypeObj[text] || '';
            }
        },
        {
            title: <FormattedMessage id="windowPage.repayment.amount" />,
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            width: '7%',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)} />;
            }
        },
        // { title: '还款状态', dataIndex: 'state', key: 'state' },
        { title: <FormattedMessage id="page.search.list.trans.serial.no" />, dataIndex: 'payTradeNo', key: 'payTradeNo',  width: '7%',render(text) { return <CopyText text={text} isEllispsis={true} /> } },
        // { title: '入账时间', dataIndex: 'billTime', key: 'billTime' },
        { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collectorName', key: 'collectorName', width: '10%', }
    ];

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.searchParams = {};
        this.searchStatus = {};
    }

    //分页
    handlePageChange = (info) => {
        //todo 分页测试
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({...this.searchParams, pageNum: current, pageSize});
    }

    //搜索
    handleSearch = (obj) => {
        const {getTableData} = this.props;
        const params = convertParams(obj);
        getTableData({...params, pageSize: 10, pageNum: 1});
        this.searchParams = params;
        this.searchStatus = params;
    }

    //导出记录
    exportOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/orderOverdue/overduePayOrderDownload',
            method: 'post',
            responseType: 'blob',
            data: _this.searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.record.export"}, {expDate: Date.now()}));

        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: 10, pageNum: 1});
    }

    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <SearchList handleSubmit={this.handleSearch}/>
                <div className={styles.wrapper}>
                    <Button type={'danger'} disabled={btnDisabled} onClick={this.exportOrder}><FormattedMessage id="page.table.export.record" /></Button>
                    <div>
                        <span>*</span><FormattedMessage id="page.search.list.partial.repaid" />
                    </div>
                </div>
                <CommonTable
                    loading={loading}
                    pagination={pagination}
                    dataSource={data}
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                    rowClassName={(row, index) => row.highlightPartialRepay ? 'partialRepayment' : ''}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {afterLoanManageState: {overdueBackRecordState}} = state;
    return {
        tableData: overdueBackRecordState['data'],
        loading: overdueBackRecordState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueBackRecordAction.obrGetTableData
    }, dispatch);

}

OverdueBackRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueBackRecord));