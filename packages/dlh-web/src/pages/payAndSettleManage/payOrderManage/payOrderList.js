import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Popconfirm, Icon, Tooltip, Modal, message} from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable,CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { payOrderListAction } from './index';
import styles from './payOrderList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios,convertMoneyFormat } from 'utils';
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const OrderStatus = {
    pending:<FormattedMessage id="page.table.unpaid" />,
    processing: <FormattedMessage id="page.table.processing" />,
    finish: <FormattedMessage id="page.table.finish" />,
    fail: <FormattedMessage id="page.table.fail" />
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

        this.searchParams =  {};
        this.pageSize = 10;
        this.pageNum = 1;
        const _this = this;
        this.columns = [
            {
                width: 70,
                title: this.props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    if (record.status == 'pending' || record.status == 'processing') {
                        return (
                            <div className={styles.recordWrapper}>
                                <Tooltip title={_this.props.intl.formatMessage({ id: "page.table.synchronize" })}>
                                    <span onClick={() => _this.optSync(record)}><Icon type="retweet" /></span>
                                </Tooltip>
                                <Tooltip title={_this.props.intl.formatMessage({ id: "page.table.manual.set.finish" })}>
                                    <Popconfirm title={_this.props.intl.formatMessage({ id: "page.table.set.finish.confirm" })} onConfirm={() => _this.optSuccess(record)}>
                                        <Icon type="check" />
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip title={_this.props.intl.formatMessage({ id: "page.table.manual.set.fail" })}>
                                    <Popconfirm title={_this.props.intl.formatMessage({ id: "page.table.set.fail.confirm" })} onConfirm={() => _this.optFailed(record)}>
                                        <Icon type="close" />
                                    </Popconfirm>
                                </Tooltip>
                            </div>
                        );
                    }
                    return (<div></div>);
                }
            }, {
                width: 200,
                title: this.props.intl.formatMessage({ id: "page.search.list.order.no" }),
                dataIndex: 'orderNo',
                key: 'orderNo',
                render(text) {
                    return <CopyText text={text} />
                }
            }, {
                width: 65,
                title: this.props.intl.formatMessage({ id: "page.search.list.platform.order.serial.no" }),
                dataIndex: 'platOrderId',
                key: 'platOrderId',
                render(text) {
                    return <CopyText text={text} isEllispsis={true} />
                }
            }, {
                width: 180,
                title: this.props.intl.formatMessage({ id: "page.table.user.name" }),
                dataIndex: 'userName',
                key: 'userName',
                render(text) {
                    return <CopyText text={text} isEllispsis={true} />
                }
            }, {
                width: 90,
                title: this.props.intl.formatMessage({ id: "windowPage.mobile" }),
                dataIndex: 'phoneNo',
                key: 'phoneNo',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width: 110,
                title: this.props.intl.formatMessage({ id: "page.search.list.product.name" }),
                dataIndex: 'productName',
                key: 'productName',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width: 110,
                title: this.props.intl.formatMessage({ id: "windowPage.payment.type" }),
                dataIndex: 'platClassName',
                key: 'platClassName',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width: 110,
                title: this.props.intl.formatMessage({ id: "page.search.list.repayement.platfrom" }),
                dataIndex: 'platName',
                key: 'platName',
                render(text,record) {
                  
                    // const platName = record.platName + '(' + record.platClassName + ')';
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width: 100,
                title: this.props.intl.formatMessage({ id: "page.search.list.payment.merchant" }),
                dataIndex: 'mchNo',
                key: 'mchNo',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={_this.props.intl.formatMessage({ id: "page.table.copy" })}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, 
            // {
            //     width:140,
            //     title: this.props.intl.formatMessage({ id: "page.search.list.business.no" }),
            //     dataIndex: 'mchNo',
            //     key: 'mchNo',
            //     render(text) {
            //         return (
            //             <CopyToClipboard text={text} onCopy={_this.onCopy}>
            //                 <Tooltip title={text}>
            //                     <span style={{ cursor: 'pointer' }}>{text}</span>
            //                 </Tooltip>
            //             </CopyToClipboard>
            //         );
            //     }
            // }, 
            {
                width: 65,
                title: this.props.intl.formatMessage({ id: "page.table.order.amount" }),
                dataIndex: 'orderAmount',
                key: 'orderAmount',
                render(text) {
                    var showStr = !isNaN(text) ? convertMoneyFormat(text / 100) : '';
                    return (
                        <CopyToClipboard text={showStr} onCopy={_this.onCopy}>
                            <Tooltip title={showStr}>
                                <span style={{ cursor: 'pointer' }}>{showStr}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width:65,
                title: this.props.intl.formatMessage({ id: "page.table.actual.payment.amount" }),
                dataIndex: 'payAmount',
                key: 'payAmount',
                render(text) {
                    var showStr = !isNaN(text) ? convertMoneyFormat(text / 100) : '';
                    return (
                        <CopyToClipboard text={showStr} onCopy={_this.onCopy}>
                            <Tooltip title={showStr}>
                                <span style={{ cursor: 'pointer' }}>{showStr}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width: 45,
                title: this.props.intl.formatMessage({ id: "page.search.list.status" }),
                dataIndex: 'status',
                key: 'status',
                className: styles.smallText,
                render(text) {
                    return (
                        <CopyToClipboard text={OrderStatus[text]} onCopy={_this.onCopy}>
                            <Tooltip title={OrderStatus[text]}>
                                <span style={{ cursor: 'pointer' }}>{OrderStatus[text]}</span>
                            </Tooltip>
                        </CopyToClipboard>
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
            , {
                width: 50,
                title: this.props.intl.formatMessage({ id: "page.table.last.response.content" }),
                dataIndex: 'lastResponseContent',
                key: 'lastResponseContent',
                className: styles.smallText,
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={!!text && text.length > 600 ? text.substring(0, 600) : text}>
                                <span style={{ cursor: 'pointer' }}>{!!text && text.length > 6 ? text.substring(0, 6) + '...' : text}</span>
                            </Tooltip>
                        </CopyToClipboard>

                    );
                }
            }, {
                width: 80,
                title: this.props.intl.formatMessage({ id: "page.table.finish.time" }),
                dataIndex: 'finishTime',
                key: 'finishTime',
                className: styles.smallText,
                render(text) {
                    let showStr = !!text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '';
                    return (
                        <CopyToClipboard text={showStr} onCopy={_this.onCopy}>
                            <Tooltip title={showStr}>
                                <span style={{ cursor: 'pointer' }}>{showStr}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }, {
                width: 80,
                title: this.props.intl.formatMessage({ id: "page.table.crete.time" }),
                dataIndex: 'createDate',
                key: 'createDate',
                className: styles.smallText,
                render(text) {
                    let showStr = !!text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '';
                    return (
                        <CopyToClipboard text={showStr} onCopy={_this.onCopy}>
                            <Tooltip title={showStr}>
                                <span style={{ cursor: 'pointer' }}>{showStr}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },
        ];
        this.searchParams = {};
    }
    onCopy = () => {
        message.success(this.props.intl.formatMessage({id : "page.table.copy.success"}), 2);
    }

    //导出支付订单
    exportPayOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const params = { ...this.searchParams, pageNum:1, pageSize:1000000 };
        axios({
            url: '/hs/payCenter/downLoadPayOrder',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.payment.list.export"}, {expDate : Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    optSync = (record) => {//同步订单状态
        let _this = this;
        let {orderNo} = record;
        axios({
            url: '/hs/payCenter/syncRefundOrder',
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
            title: this.props.intl.formatMessage({id : "page.table.confirm.operation"}),
            content: this.props.intl.formatMessage({id : "page.table.confirm.set.finish"}),
            onOk() {
                axios({
                    url: '/hs/payCenter/manualSetRefundOrderSuccess',
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
            title: this.props.intl.formatMessage({id : "page.table.confirm.operation"}),
            content: this.props.intl.formatMessage({id : "page.table.confirm.set.fail"}),
            onOk() {
                axios({
                    url: '/hs/payCenter/manualSetRefundOrderFail',
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
    refresh = () => {
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize:this.pageSize, pageNum: this.pageNum});
    }
    handleSearch = (obj) => {
        let { time,orderNo,platOrderId, platId, mchNo, mchId,status,userName,phoneNo,productName } = obj;
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

        const params = { orderNo, platOrderId, platId, mchNo, mchId, status, userName, phoneNo, startDate, endDate, productName, pageSize: 10, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.pageNum = current;
        this.pageSize = pageSize;
        getTableData({ ...this.searchParams, pageSize:this.pageSize, pageNum: this.pageNum});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ endDate: '', mchId: '', mchNo: '', orderNo: '', pageNum: 1, pageSize: 10,
            phoneNo: '', platId: '',platOrderId: '',productName: '', startDate: '', status: '', userName: ''
        });
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
        const { allPayPlatList,allPayTypeList,allPayMchList,btnDisabled } = this.state;
        return (
            <div>
                <SearchList allPayPlatList={allPayPlatList} allPayMchList={allPayMchList} OrderStatus={OrderStatus} handleSearch={this.handleSearch} />
                <Button type={'danger'} disabled={btnDisabled} onClick={this.exportPayOrder}><FormattedMessage id="page.table.export" /></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} bordered  />
                <EditModel visible={visible} allPayPlatList={allPayPlatList} allPayTypeList={allPayTypeList} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { payOrderListState } } = state;

    return {
        tableData: payOrderListState['data'],
        loading: payOrderListState['loading'],
        visible: payOrderListState['visible'],
        info: payOrderListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       payOrderListAction.payOrderGetTableData,
        changeModalVisible: payOrderListAction.payOrderChangeModalVisible,
        changeModalInfo:    payOrderListAction.payOrderChangeModalInfo,
        addModel:         payOrderListAction.payOrderAddTableData,
        updateModel:      payOrderListAction.payOrderUpdateTableData,
        deleteModel:        payOrderListAction.deleteModel
    },dispatch)
}

PayOrderList.PropTypes ={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PayOrderList));