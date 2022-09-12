import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import { CommonTable, CopyText } from 'components';
import {todayBackRecordAction} from './index';
import SearchList from './SearchList/SearchList';
import { Button, message } from 'antd';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';
import styles from "./TodayBackRecord.less";

const convertParams = (obj) => {
    const { expiredTime, time, phoneNo, name, orderNo, payType, backType, pageSize, pageNum } = obj;
    //todo 核对参数
    return {
        startTime: Array.isArray(time) && time.length > 0 ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: Array.isArray(time) && time.length > 0 ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        expiredStartTime: Array.isArray(expiredTime) && expiredTime.length > 0 ? expiredTime[0].format('YYYY-MM-DD 00:00:00') : '',
        expiredEndTime: Array.isArray(expiredTime) && expiredTime.length > 0 ? expiredTime[1].format('YYYY-MM-DD 23:59:59') : '',
        userPhone: phoneNo,
        userTrueName: name,
        orderNo,
        payId: payType,
        state: backType,
        pageSize: pageSize,
        pageNum: pageNum
    }
}

const backTypeObj = {
    "1": <FormattedMessage id="windowPage.repayment"/>,
    // "2": "延长履约期",
    "3": <FormattedMessage id="page.search.list.normal.repayment"/>,
    "4": <FormattedMessage id="page.search.list.normal.partial.repayment"/>,
    "8": <FormattedMessage id="windowPage.extend.repayment"/>
};


class TodayBackRecord extends Component {
    //todo 核对字段
    columns = [
        {
            title: <FormattedMessage id="page.search.list.expiration.time"/>,
            dataIndex: 'expireTime',
            key: 'expireTime',
            width: '12%',
            render(text) {
                return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")
               
            }
        },
        {
            title: <FormattedMessage id="page.search.list.repaid.time"/>,
            dataIndex: 'payTime',
            key: 'payTime',
            width: '12%',
            render(text) {
                return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        {
            title: <FormattedMessage id="page.search.list.order.no" />, dataIndex: 'orderNo', key: 'orderNo', 
            render(text) {
                return <CopyText text={text} />
            }
        },
        {
            title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'userName', key: 'userName',  width: '17%',
            render(text) {
                return <CopyText text={text} isEllispsis={true} />
            }
        },
        {
            title: <FormattedMessage id="page.search.list.mobile" />, dataIndex: 'phoneNo', key: 'phoneNo',  width: '8%',
            render(text) {
                return <CopyText text={text} />
            }
        },
        {
            title: <FormattedMessage id="windowPage.payment.method" />, dataIndex: 'payName', key: 'payName',  width: '8%',
            render(text) {
                return <CopyText text={text} />
            }
        },
        {
            title: <FormattedMessage id="windowPage.repayment.type" />,
            dataIndex: 'state',
            key: 'state',
            width: '6%',
            render(text) {
                return backTypeObj[text] || '';
            }
        },
        {
            title: <FormattedMessage id="windowPage.repayment.amount" />,
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            width: '6%',
            render(text, record) {
                return <CopyText text={convertMoneyFormat(text)} />
            }
        },
        // { title: '还款状态', dataIndex: 'state', key: 'state' },
        {
            title: <FormattedMessage id="page.search.list.trans.serial.no" />, dataIndex: 'payTradeNo', key: 'payTradeNo',  width: '7%',
            render(text) {
                return <CopyText text={text} isEllispsis={true}/>
            }
        },
        // { title: '入账时间', dataIndex: 'billTime', key: 'billTime' },
        { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collectorName', key: 'collectorName',  width: '8%',}
    ];

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.searchParams = {};
        this.initSearchParams = {
            time: [ moment(0, 'HH'), moment({ hour: 23, minute: 59, seconds: 59 }) ],
            expiredTime: [ moment(0, 'HH'), moment({ hour: 23, minute: 59, seconds: 59 }).add(1, 'd') ],
            pageSize: 10,
            pageNum: 1
        };
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
        const { getTableData } = this.props;
        const { pageNum, pageSize } = this.searchParams;
        const params = convertParams({ ...obj, pageNum, pageSize });
        getTableData(params);
        this.searchParams = params;
    }

    //导出记录
    exportOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/orderToday/todayPayOrderDownLoad',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
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
        this.searchParams =  convertParams(this.initSearchParams);
        getTableData(this.searchParams);
    }

    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <SearchList handleSubmit={this.handleSearch} initSearchParams={this.initSearchParams} />
                <div className={styles.wrapper}>
                    <Button type={'danger'} disabled={btnDisabled} onClick={this.exportOrder}><FormattedMessage id="page.table.export.record"/></Button>
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
    const {todayLoanManageState: {todayBackRecordState}} = state;
    return {
        tableData: todayBackRecordState['data'],
        loading: todayBackRecordState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: todayBackRecordAction.tobrGetTableData
    }, dispatch);
}

TodayBackRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TodayBackRecord));