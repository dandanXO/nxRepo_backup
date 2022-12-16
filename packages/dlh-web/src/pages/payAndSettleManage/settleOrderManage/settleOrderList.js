import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, message, Modal, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable, CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { settleOrderListAction } from './index';
import styles from './settleOrderList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios, convertMoneyFormat, getAllMerchants, getIsSuperAdmin } from 'utils';
import download from "downloadjs";
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";

const OrderStatus = {
    pending: <FormattedMessage id="page.table.unpaid" />,
    processing:<FormattedMessage id="page.table.processing" />,
    finish:<FormattedMessage id="page.table.finish" />,
    fail: <FormattedMessage id="page.table.fail" />
}


class SettleOrderList extends Component {
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            modelId: null,
            allSettlePlatList:[],
            allSettleTypeList:[],
            allSettleMchList:[],
            btnDisabled: false,
            isSuperAdmin,
            allMerchants
        };
        this.searchParams = {
            endDate: '', mchId: '', mchNo: '', orderNo: '', pageNum: 1, pageSize: 10, phoneNo: '',
            platId: '', platOrderId: '', productName: '', startDate: '', status: '', userName: '', merchantId: ''
        };
        this.pageSize = 10;
        this.pageNum = 1;
        const _this = this;
        this.columns =[
            {
                width:70,
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    if(record.status == 'pending' || record.status == 'processing'){
                        return (
                            <div className={styles.recordWrapper}>
                                <Tooltip title={_this.props.intl.formatMessage({id : "page.table.synchronize"})}>
                                    <span onClick={() => _this.optSync(record)}><Icon type="retweet" /></span>
                                </Tooltip>
                                <Tooltip title={_this.props.intl.formatMessage({id : "page.table.manual.set.finish"})}>
                                    <Popconfirm title={_this.props.intl.formatMessage({id : "page.table.set.finish.confirm"})} onConfirm={() => _this.optSuccess(record)}>
                                        <Icon type="check" />
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip title={_this.props.intl.formatMessage({id : "page.table.manual.set.fail"})}>
                                    <Popconfirm title={_this.props.intl.formatMessage({id : "page.table.set.fail.confirm"})} onConfirm={() => _this.optFailed(record)}>
                                        <Icon type="close" />
                                    </Popconfirm>
                                </Tooltip>
                            </div>
                        );
                    }
                    return  (<div></div>);
                }
            },{
                width:200,
                title: props.intl.formatMessage({id : "page.search.list.order.no"}),
                dataIndex: 'orderNo',
                key: 'orderNo',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={_this.props.intl.formatMessage({id : "page.table.copy"})}>
                                <span style={{cursor: 'pointer'}}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width:65,
                title: props.intl.formatMessage({id : "page.search.list.platform.order.serial.no"}),
                dataIndex: 'platOrderId',
                key: 'platOrderId',
                render(text) {
                    return <CopyText text={text} isEllispsis={true} />
                }
            },{
                width: 170,
                title: props.intl.formatMessage({id : "page.table.user.name"}),
                dataIndex: 'userName',
                key: 'userName',
                render(text) {
                    return <CopyText text={text} isEllispsis={true} />
                }
            },{
                width: 90,
                title: props.intl.formatMessage({id : "windowPage.mobile"}),
                dataIndex: 'phoneNo',
                key: 'phoneNo',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{cursor: 'pointer'}}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
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
            },{
                width: 110,
                title: this.props.intl.formatMessage({ id: "windowPage.email" }),
                dataIndex: 'email',
                key: 'email',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width: 110,
                title: this.props.intl.formatMessage({ id: "bankCardNo" }),
                dataIndex: 'bankCardNo',
                key: 'bankCardNo',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width: 110,
                title: this.props.intl.formatMessage({ id: "windowPage.bank" }),
                dataIndex: 'bankName',
                key: 'bankName',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{ cursor: 'pointer' }}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }
            ,{
                width: 110,
                title: props.intl.formatMessage({id : "page.search.list.repayement.platfrom"}),
                dataIndex: 'platName',
                key: 'platName',
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{cursor: 'pointer'}}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    )
                }
            },{
                width: 110,
                title: props.intl.formatMessage({id : "page.search.list.payment.merchant"}),
                dataIndex: 'mchNo',
                key: 'mchNo',
                render(text) {

                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{cursor: 'pointer'}}>{text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    )
                }
            },
            // {
            //     width: 130,
            //     title: props.intl.formatMessage({id : "page.search.list.business.no"}),
            //     dataIndex: 'mchNo',
            //     key: 'mchNo',
            //     render(text) {
            //         return (
            //             <CopyToClipboard text={text} onCopy={_this.onCopy}>
            //                 <Tooltip title={text}>
            //                     <span style={{cursor: 'pointer'}}>{text}</span>
            //                 </Tooltip>
            //             </CopyToClipboard>
            //         );
            //     }
            // },
            {
                width: 65,
                title: props.intl.formatMessage({id : "page.table.order.amount"}),
                dataIndex: 'orderAmount',
                key: 'orderAmount',
                render(text) {
                    var showStr = !isNaN(text) ? convertMoneyFormat(text/100) : '';
                    return (
                        <CopyToClipboard text={showStr} onCopy={_this.onCopy}>
                            <Tooltip title={showStr}>
                                <span style={{cursor: 'pointer'}}>{showStr}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width: 65,
                title: props.intl.formatMessage({id : "page.table.actual.payment.amount"}),
                dataIndex: 'payAmount',
                key: 'payAmount',
                render(text) {
                    var showStr = !isNaN(text) ? convertMoneyFormat(text/100) : '';
                    return (
                        <CopyToClipboard text={showStr} onCopy={_this.onCopy}>
                            <Tooltip title={showStr}>
                                <span style={{cursor: 'pointer'}}>{showStr}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width: 45,
                title: props.intl.formatMessage({id : "page.search.list.status"}),
                dataIndex: 'status',
                key: 'status',
                className: styles.smallText,
                render(text){
                    return (
                        <CopyToClipboard text={OrderStatus[text]} onCopy={_this.onCopy}>
                            <Tooltip title={OrderStatus[text]}>
                                <span style={{cursor: 'pointer'}}>{OrderStatus[text]}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            }
            // ,{
            //     title: '下单IP',
            //     dataIndex: 'orderCreateIp',
            //     key: 'orderCreateIp'
            // }
            ,{
                width: 65,
                title: props.intl.formatMessage({id : "page.table.error.message"}),
                dataIndex: 'errorMsg',
                key: 'errorMsg',
                className: styles.smallText,
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={text}>
                                <span style={{cursor: 'pointer'}}>{!!text && text.length>6 ? text.substring(0,5)+'...' : text}</span>
                            </Tooltip>
                        </CopyToClipboard>
                    );
                }
            },{
                width: 65,
                title: props.intl.formatMessage({id : "page.table.last.response.content"}),
                dataIndex: 'lastResponse',
                key: 'lastResponse',
                className: styles.smallText,
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={_this.onCopy}>
                            <Tooltip title={!!text && text.length > 600 ? text.substring(0,600) : text}>
                                <span style={{cursor: 'pointer'}}>{!!text && text.length>6 ? text.substring(0,6)+'...' : text}</span>
                            </Tooltip>
                        </CopyToClipboard>

                    );
                }
            },{
                width: 80,
                title: props.intl.formatMessage({id : "page.table.order.finish.time"}),
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
            },{
                width: 80,
                title: props.intl.formatMessage({id : "page.table.crete.time"}),
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

        if (isSuperAdmin) {
            this.columns.unshift({
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'dlhMerchantName',
                key: 'dlhMerchantName',
                width:90
            })
        }


    }

    onCopy = () => {
        message.success(this.props.intl.formatMessage({id : "page.table.copy.success"}), 2);
    }

    //导出代付订单
    exportSettleOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const params = { ...this.searchParams, pageNum:1, pageSize:1000000 };
        axios({
            url: '/hs/payCenter/downLoadSettleOrder',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.substitute.order.list"}, {expDate : Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    optSync = (record) => {//同步订单状态
        let {orderNo} = record;
        let _this = this;
        axios({
            url: '/hs/payCenter/syncSettleOrder',
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
            title: _this.props.intl.formatMessage({id : "page.table.confirm.operation"}),
            content: _this.props.intl.formatMessage({id : "page.table.confirm.set.finish"}),
            onOk() {
                axios({
                    url: '/hs/payCenter/manualSetSettleOrderSuccess',
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
            title: _this.props.intl.formatMessage({id : "page.table.confirm.operation"}),
            content: _this.props.intl.formatMessage({id : "page.table.confirm.set.fail"}),
            onOk() {
                axios({
                    url: '/hs/payCenter/manualSetSettleOrderFail',
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
        let { time, orderNo, platOrderId, platId, mchNo, mchId, status, userName, phoneNo, productName, finishTime, dlhMerchantId = '' } = obj;
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

        let startFinishDate = '', endFinishDate = '';
        if(Array.isArray(finishTime)) {
            [startFinishDate, endFinishDate] = finishTime.map(item => item.format('YYYY-MM-DD'));
            if(!!startFinishDate){
                startFinishDate += ' 00:00:00';
            }
            if(!!endFinishDate){
                endFinishDate += ' 23:59:59';
            }
        }

        const params = { orderNo, platOrderId, platId, mchNo, mchId, status, userName, phoneNo, startDate, endDate, productName, startFinishDate, endFinishDate, dlhMerchantId, pageSize: 10, pageNum: 1 };
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
        getTableData(this.searchParams);

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
                <SearchList allSettlePlatList={allSettlePlatList} allSettleMchList={allSettleMchList} OrderStatus={OrderStatus} handleSearch={this.handleSearch} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <Button type={'danger'} disabled={btnDisabled} onClick={this.exportSettleOrder}><FormattedMessage id="page.table.export" /></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <EditModel visible={visible} allSettlePlatList={allSettlePlatList} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { settleOrderListState } } = state;

    return {
        tableData: settleOrderListState['data'],
        loading: settleOrderListState['loading'],
        visible: settleOrderListState['visible'],
        info: settleOrderListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       settleOrderListAction.settleOrderGetTableData,
        changeModalVisible: settleOrderListAction.settleOrderChangeModalVisible,
        changeModalInfo:    settleOrderListAction.settleOrderChangeModalInfo,
        addModel:         settleOrderListAction.settleOrderAddTableData,
        updateModel:      settleOrderListAction.settleOrderUpdateTableData,
        deleteModel:        settleOrderListAction.deleteModel
    },dispatch)
}

SettleOrderList.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettleOrderList));
