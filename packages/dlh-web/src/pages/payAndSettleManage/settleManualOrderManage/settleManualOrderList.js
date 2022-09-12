import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Popconfirm, Icon, Tooltip, Modal, message} from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { settleManualOrderListAction } from './index';
import styles from './settleManualOrderList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios } from 'utils';
import download from "downloadjs";

const OrderStatus = {
    pending:'未支付',
    processing:'处理中',
    finish:'成功',
    fail:'失败'
}


class SettleManualOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelId: null,
            allSettlePlatList:[],
            allSettleMchList:[],
            btnDisabled: false,
        };
        this.searchParams = {};
        this.orderType = 'S';
        this.pageSize = 10;
        this.pageNum = 1;
        const _this = this;
        this.columns =[
            {
                width:200,
                title: '订单号',
                dataIndex: 'orderNo',
                key: 'orderNo',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={'点击复制'}>
                                <span>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width:200,
                title: '平台订单流水号',
                dataIndex: 'platOrderId',
                key: 'platOrderId',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={'点击复制'}>
                                <span>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                title: '用户姓名',
                dataIndex: 'bankAccountName',
                key: 'bankAccountName'
            },{
                width:200,
                title: '手机号码',
                dataIndex: 'phoneNo',
                key: 'phoneNo'
            },{
                title: '支付平台',
                dataIndex: 'platId',
                key: 'platId',
                render(text) {
                    let showStr = '';
                    if(!!text){
                        let {allSettlePlatList} = _this.state;
                        let settlePlat = allSettlePlatList.find(item => item.id == text);
                        if(!!settlePlat){
                            showStr = settlePlat.platName+'('+settlePlat.platClass+')';
                        }
                    }
                    return (
                        <span>{showStr}</span>
                    )
                }
            },{
                title: '支付商户',
                dataIndex: 'mchId',
                key: 'mchId',
                render(text) {
                    let showStr = '';
                    if(!!text){
                        let {allSettleMchList} = _this.state;
                        let settleMch = allSettleMchList.find(item => item.id == text);
                        if(!!settleMch){
                            showStr = settleMch.mchName;
                        }
                    }
                    return (
                        <span>{showStr}</span>
                    )
                }
            },{
                width:200,
                title: '商户号',
                dataIndex: 'mchNo',
                key: 'mchNo'
            },{
                title: '订单金额',
                dataIndex: 'orderAmount',
                key: 'orderAmount',
                render(text) {
                    var showStr = !isNaN(text) ? (text/100).toFixed(2) : '';
                    return (
                        <span>{showStr}</span>
                    );
                }
            },{
                title: '实际支付金额',
                dataIndex: 'payAmount',
                key: 'payAmount',
                render(text) {
                    var showStr = !isNaN(text) ? (text/100).toFixed(2) : '';
                    return (
                        <div>
                            <span>{showStr}</span>
                        </div>

                    );
                }
            },{
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render(text){
                    return (
                        <span>{OrderStatus[text]}</span>
                    );
                }
            }
            // ,{
            //     title: '下单IP',
            //     dataIndex: 'orderCreateIp',
            //     key: 'orderCreateIp'
            // }
            ,{
                title: '错误信息',
                dataIndex: 'errorMsg',
                key: 'errorMsg',
                render(text) {
                    return (<Tooltip title={text}>{!!text && text.length>6 ? text.substring(0,5)+'...' : text}</Tooltip>);
                }
            },{
                title: '最后响应内容',
                dataIndex: 'lastResponse',
                key: 'lastResponse',
                render(text) {
                    return (<Tooltip title={text}>{!!text && text.length>6 ? text.substring(0,5)+'...' : text}</Tooltip>);
                }
            },{
                title: '订单完成时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
                render(text) {
                    return !!text ? moment(Number(text)).format('YYYY-MM-DD HH:mm:ss') : '';
                }
            },{
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate',
                render(text) {
                    return !!text ? moment(Number(text)).format('YYYY-MM-DD HH:mm:ss') : '';
                }
            },{
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    if(record.status == 'pending' || record.status == 'processing'){
                        return (
                            <div className={styles.recordWrapper}>
                                <Tooltip title={"同步"}>
                                    <span onClick={() => _this.optSync(record)}><Icon type="retweet" /></span>
                                </Tooltip>
                                <Tooltip title={"人工设为成功"}>
                                    <Popconfirm title={'确认要设为成功吗？'} onConfirm={() => _this.optSuccess(record)}>
                                        <Icon type="check" />
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip title={"人工设为失败"}>
                                    <Popconfirm title={'确认要设为失败吗？'} onConfirm={() => _this.optFailed(record)}>
                                        <Icon type="close" />
                                    </Popconfirm>
                                </Tooltip>
                            </div>
                        );
                    }
                    return  (<div></div>);
                }
            },
        ];
    }

    refresh = () => {
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, orderType:this.orderType, pageSize:this.pageSize, pageNum: this.pageNum});
    }

    //导出代付订单
    exportManualSettleOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading('正在导出', 0);
        const params = { ...this.searchParams, orderType: this.orderType, pageNum:1, pageSize:1000000 };
        axios({
            url: '/hs/payCenter/downLoadSettleOrder',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, `手动代付订单${Date.now()}.xlsx`);
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    optSync = (record) => {//同步订单状态
        let _this = this;
        let {orderNo} = record;
        axios({
            url: '/hs/payCenterSettleManual/syncSettleManualOrder',
            method: 'post',
            data : {orderNo}
        }).then((res) => {
            if(res && res.code == '200') {
            }else {
            }
            _this.refresh();
        });

    }

    optSuccess = (record) => {
        const confirm = Modal.confirm;
        const { orderNo } = record;
        let _this = this;
        confirm({
            title: '确认操作',
            content: '确定要设置改记录为成功么？',
            onOk() {
                axios({
                    url: '/hs/payCenterSettleManual/manualSetSettleManualOrderSuccess',
                    method: 'post',
                    data : {orderNo}
                }).then((res) => {
                    if(res && res.code == '200') {
                    }else {
                    }
                    _this.refresh();
                });
            },
            onCancel() {},
        });

    }

    optFailed = (record) => {
        const confirm = Modal.confirm;
        const { orderNo } = record;
        let _this = this;
        confirm({
            title: '确认操作',
            content: '确定要设置该记录为失败么？',
            onOk() {
                axios({
                    url: '/hs/payCenterSettleManual/manualSetSettleManualOrderFail',
                    method: 'post',
                    data : {orderNo}
                }).then((res) => {
                    if(res && res.code == '200') {
                    }else {
                    }
                    _this.refresh();
                });
            },
            onCancel() {},
        });

    }

    //添加
    handleAddModel = () => {
        const { changeModalVisible, changeModalInfo, info } = this.props;
        changeModalVisible(true);
        changeModalInfo({ loanMoney:1});
    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const { addModel} = this.props;
        addModel({ ...obj, orderType: this.orderType });
    }



    handleSearch = (obj) => {
        let { time,orderNo,platOrderId, platId, mchNo, mchId,status,bankAccountName,phoneNo } = obj;
        const { getTableData } = this.props;
        let startDate = '', endDate = '';
        if(Array.isArray(time)) {
            [startDate, endDate] = time.map(item => item.format('YYYY-MM-DD'));
            if(!!startDate){
                startDate += ' 00:00:00.0';
            }
            if(!!endDate){
                endDate += ' 23:59:59.999';
            }
        }

        const params = {  orderNo,platOrderId, platId, mchNo, mchId,status,bankAccountName,phoneNo, startDate, endDate,orderType:this.orderType, pageSize: 10, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.pageNum = current;
        this.pageSize = pageSize;
        getTableData({ ...this.searchParams, orderType:this.orderType, pageSize:this.pageSize, pageNum: this.pageNum});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({orderType:this.orderType, pageSize: 10, pageNum: 1 });

        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettlePlat/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    _this.setState({
                        allSettlePlatList: content || []
                    });
                }
            });
        } catch (e) {
        }
        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    _this.setState({
                        allSettleMchList: content || []
                    });
                }
            });
        } catch (e) {
        }

    }

    render() {
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        const { allSettlePlatList,allSettleMchList,btnDisabled  } = this.state;
        return (
            <div>
                <SearchList allSettlePlatList={allSettlePlatList} allSettleMchList={allSettleMchList} OrderStatus={OrderStatus} handleSearch={this.handleSearch} />
                <Button type={'primary'} onClick={this.handleAddModel}>手动打款</Button>
                <Button type={'danger'} className={styles.btnFloat} disabled={btnDisabled} onClick={this.exportManualSettleOrder}>导出</Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <EditModel visible={visible} allSettlePlatList={allSettlePlatList} allSettleMchList={allSettleMchList} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { settleManualOrderListState } } = state;

    return {
        tableData: settleManualOrderListState['data'],
        loading: settleManualOrderListState['loading'],
        visible: settleManualOrderListState['visible'],
        info: settleManualOrderListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       settleManualOrderListAction.settleManualOrderGetTableData,
        changeModalVisible: settleManualOrderListAction.settleManualOrderChangeModalVisible,
        changeModalInfo:    settleManualOrderListAction.settleManualOrderChangeModalInfo,
        addModel:         settleManualOrderListAction.settleManualOrderAddTableData,
        updateModel:      settleManualOrderListAction.settleManualOrderUpdateTableData,
        deleteModel:        settleManualOrderListAction.deleteModel
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettleManualOrderList);