import React, {Component} from 'react';
import {connect} from 'react-redux';
import { CommonTable, CopyText } from 'components';
import {bindActionCreators} from 'redux';
import {Button, Icon, message} from 'antd';
import {phoneUrgeListAction} from './index';
import SearchList from './SearchList/SearchList';
import styles from './PhoneUrgeList.less';
import moment from "moment/moment";
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';

const convertParams = (obj = {}) => {
    const {time = [], orderStatus = '', phoneNo = '', name = '', orderNo = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        fstartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        fendTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        status: orderStatus,
        userPhone: phoneNo,
        userTrueName: name,
        orderNo,
        isDc: true
    };
}
const statusObj = {
    "0": <FormattedMessage id="status.obj.zero"/>,
    "1": <FormattedMessage id="status.obj.one"/>,
    "2": <FormattedMessage id="status.obj.two"/>
}

class PhoneUrgeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        const _this = this;
        this.searchStatus = {};
        this.columns = [
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: 90,
                render(text, record) {
                    const { userId } = record;
                    return (
                        <div onClick={() => _this.handleLookDetail(text, userId)} className={styles.operatorWrapper}>
                            <Icon type="exception" />
                        </div>
                    );
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.distribute.time" }),
                dataIndex: 'distributionTime',
                key: 'distributionTime',
                width: 170,
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', width: 200, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName', width: 200, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone', width: 120, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.table.days.overdue" }), dataIndex: 'expireDays', key: 'expireDays', width: 100 },
            {
                title: props.intl.formatMessage({ id: "page.table.overdue.time" }),
                dataIndex: 'expireTime',
                key: 'expireTime',
                width: 170,
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.loan2" }),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                width: 100,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.order.status" }),
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render(text) {
                    return statusObj[text] || '';
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.amount.paid" }),
                dataIndex: 'repaidAmt',
                key: 'repaidAmt',
                width: 100,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "windowPage.reduce.amount" }),
                dataIndex: 'reductionAmt',
                key: 'reductionAmt',
                width: 100,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.amount.due" }),
                dataIndex: 'payable',
                key: 'payable',
                width: 100,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.repaid.time" }),
                dataIndex: 'payTime',
                key: 'payTime',
                width: '10%',
                width: 170,
                render(text) {
                    return text ? moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
                }
            }
            // { title: '跟进记录', dataIndex: 'record', key: 'record' },
            // { title: '最后跟进时间', dataIndex: 'lastRecordTime', key: 'lastRecordTime' },

        ];
    }

    //导出记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/orderOverdue/dcListDownload',
            method: 'post',
            responseType: 'blob',
            data: _this.searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.phone.list.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    //查看详情
    handleLookDetail = (id, userId) => {
        const {history: {push}} = this.props;
        push(`/phoneUrgeList/${id}`, {userId});
    }

    //搜索
    handleSubmit = (obj) => {
        const {setSearchParams, getTableData} = this.props;
        setSearchParams(obj);
        const params = convertParams(obj);
        getTableData({...params, pageNum: 1, pageSize: 10});
        this.searchStatus = params;
    }
    //分页
    handlePageChange = (info) => {
        const {pageSize, current} = info;
        const {getTableData, searchParams} = this.props;
        const params = convertParams(searchParams);
        getTableData({...params, pageSize, pageNum: current});
    }

    componentDidMount() {
        const {getTableData, tableData: {pagination}, searchParams} = this.props;
        let params = convertParams(searchParams);
        params = {...params, pageSize: pagination['pageSize'] || 10, pageNum: pagination['current'] || 1};
        getTableData(params);

    }

    render() {
        const {tableData: {data, pagination}, loading, searchParams} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <SearchList handleSubmit={this.handleSubmit} params={searchParams}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    handlePageChange={this.handlePageChange}
                    loading={loading}
                    scroll={{x:'100%'}}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {afterLoanManageState: {phoneUrgeListState}} = state;
    return {
        tableData: phoneUrgeListState['tableData'],
        loading: phoneUrgeListState['loading'],
        searchParams: phoneUrgeListState['params']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: phoneUrgeListAction.pulGetTableData,
        setTableData: phoneUrgeListAction.pulSetTableData,
        setSearchParams: phoneUrgeListAction.pulChangeSearchParams
    }, dispatch);
}

PhoneUrgeList.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PhoneUrgeList));