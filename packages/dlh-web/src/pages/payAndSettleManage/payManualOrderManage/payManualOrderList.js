import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Popconfirm, Icon, Tooltip, Modal, message} from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { payManualOrderListAction } from './index';
import styles from './payManualOrderList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios } from 'utils';
import download from "downloadjs";

const OrderStatus = {
    pending:'未支付',
    processing:'处理中',
    finish:'成功',
    fail:'失败'
}


class PayOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelId: null,
            allPayPlatList:[],
            allPayTypeList:[],
            allPayMchList:[],
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
                dataIndex: 'username',
                key: 'username'
            },{
                width:200,
                title: '手机号码',
                dataIndex: 'phoneNo',
                key: 'phoneNo'
            },{
                title: '支付类型',
                dataIndex: 'payType',
                key: 'payType'
            },{
                title: '支付平台',
                dataIndex: 'platId',
                key: 'platId',
                render(text) {
                    let showStr = '';
                    if(!!text){
                        let {allPayPlatList} = _this.state;
                        let payPlat = allPayPlatList.find(item => item.id == text);
                        if(!!payPlat){
                            showStr = payPlat.platName+'('+payPlat.platClass+')';
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
                        let {allPayMchList} = _this.state;
                        let payMch = allPayMchList.find(item => item.id == text);
                        if(!!payMch){
                            showStr = payMch.mchName;
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
            // },{
            //     title: '错误信息',
            //     dataIndex: 'errorMsg',
            //     key: 'errorMsg',
            //     render(text) {
            //         return (<Tooltip title={text}>{!!text && text.length>6 ? text.substring(0,5)+'...' : text}</Tooltip>);
            //     }
            // }
            ,{
                title: '最后响应内容',
                dataIndex: 'lastResponseContent',
                key: 'lastResponseContent',
                render(text) {
                    return (<Tooltip title={text}>{!!text && text.length>6 ? text.substring(0,5)+'...' : text}</Tooltip>);
                }
            },{
                title: '完成时间',
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
        this.searchParams = {};
    }


    //导出支付订单
    exportManualPayOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading('正在导出', 0);
        const params = { ...this.searchParams, orderType: this.orderType, pageNum:1, pageSize:1000000 };
        axios({
            url: '/hs/payCenter/downLoadPayOrder',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, `手动支付订单${Date.now()}.xlsx`);
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }


    optSync = (record) => {//同步订单状态
        let _this = this;
        let {orderNo} = record;
        axios({
            url: '/hs/payCenterPayManual/syncManualPayOrder',
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
        let _this = this;
        const { changeModalVisible } = this.props;
        const confirm = Modal.confirm;
        const { orderNo } = record;
        confirm({
            title: '确认操作',
            content: '确定要设置改记录为成功么？',
            onOk() {
                axios({
                    url: '/hs/payCenterPayManual/manualSetManualPayOrderSuccess',
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
        let _this = this;
        const { changeModalVisible } = this.props;
        const confirm = Modal.confirm;
        const { orderNo } = record;
        confirm({
            title: '确认操作',
            content: '确定要设置该记录为失败么？',
            onOk() {
                axios({
                    url: '/hs/payCenterPayManual/manualSetManualPayOrderFail',
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
        changeModalInfo({ amount:1});
    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const { addModel} = this.props;
        addModel({ ...obj, orderType: this.orderType });
    }

    refresh = () => {
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, orderType: this.orderType, pageSize:this.pageSize, pageNum: this.pageNum});
    }
    handleSearch = (obj) => {
        let { time,orderNo,platOrderId, platId, mchNo, mchId,status,username,phoneNo } = obj;
        const { getTableData } = this.props;
        let startDate = '', endDate = '';
        if(Array.isArray(time)) {
            [startDate, endDate] = time.map(item => item.format('YYYY-MM-DD'));
            if(!!startDate){
                startDate += ' 00:00:00';
            }
            if(!!endDate){
                endDate += ' 23:59:59';
            }
        }

        const params = {  orderNo,platOrderId, platId, mchNo, mchId,status,username,phoneNo, startDate, endDate, orderType: this.orderType, pageSize: 10, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.pageNum = current;
        this.pageSize = pageSize;
        getTableData({ ...this.searchParams, orderType: this.orderType, pageSize:this.pageSize, pageNum: this.pageNum});
    }

    componentDidMount() {
        const { getTableData } = this.props;

        getTableData({ ...this.searchParams, orderType: this.orderType, pageSize: 10, pageNum: 1 });
        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayType/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    content = content.map(item => ({ id: item.id, pId: 0, value: item.id + '', label: item.typeName+'('+item.typeAlias+')' }));
                    _this.setState({
                        allPayTypeList: content || []
                    });
                }
            });
        } catch (e) {
        }
        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayPlat/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    _this.setState({
                        allPayPlatList: content || []
                    });
                }
            });
        } catch (e) {
        }
        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayMch/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    _this.setState({
                        allPayMchList: content || []
                    });
                }
            });
        } catch (e) {
        }

    }

    render() {
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        const { allPayPlatList,allPayTypeList,allPayMchList,btnDisabled  } = this.state;
        return (
            <div>
                <SearchList allPayPlatList={allPayPlatList} allPayMchList={allPayMchList} OrderStatus={OrderStatus} handleSearch={this.handleSearch} />
                <Button type={'primary'} onClick={this.handleAddModel}>手动充值</Button>
                <Button type={'danger'} className={styles.btnFloat} disabled={btnDisabled} onClick={this.exportManualPayOrder}>导出</Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} bordered scroll={{ x: '100%' }} />
                <EditModel visible={visible} allPayPlatList={allPayPlatList} allPayTypeList={allPayTypeList} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { payManualOrderListState } } = state;

    return {
        tableData: payManualOrderListState['data'],
        loading: payManualOrderListState['loading'],
        visible: payManualOrderListState['visible'],
        info: payManualOrderListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       payManualOrderListAction.payManualOrderGetTableData,
        changeModalVisible: payManualOrderListAction.payManualOrderChangeModalVisible,
        changeModalInfo:    payManualOrderListAction.payManualOrderChangeModalInfo,
        addModel:         payManualOrderListAction.payManualOrderAddTableData,
        updateModel:      payManualOrderListAction.payManualOrderUpdateTableData,
        deleteModel:        payManualOrderListAction.deleteModel
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PayOrderList);