import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {Button, Card, Icon, message, Modal, Tooltip} from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {connect} from "react-redux";
import SearchList from "./SearchList/SearchList";
import DetailModal from './DetailModal/DetailModal';
import AuthModal from './AuthModal/AuthModal';
import { CommonTable, CopyText } from "components";
import {axios, convertMoneyFormat, orderStatus} from "utils";
import {orderListAction} from "./index";
import moment from "moment/moment";
import download from 'downloadjs';
import styles from './OrderList.less';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";


class OrderList extends Component {
    modalTableColumns = [
        {
            title: this.props.intl.formatMessage({id: "page.table.score"}),
            dataIndex: "score",
            key: "score"
        },
        {
            title: this.props.intl.formatMessage({id: "page.table.decision"}),
            dataIndex: "decision",
            key: "decision"
        },
        {
            title: this.props.intl.formatMessage({id: "page.table.risk.name"}),
            dataIndex: "risk_name",
            key: "risk_name"
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalData: null,
            detailVisible: false,
            btnDisabled: false
        };
        this.pageSize = 10;
        this.searchStatus = {};
        //判断是否点击手动机审按钮
        this.isHasClick = false;
        const _this = this;
        //当前的记录
        this.currentRecord = null;

        this.columns = [
            {
                title: props.intl.formatMessage({id: "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width:70,
                render(text, record) {
                    let {status} = record;
                    status = Number(status);
                    let ele = [];
                    // if (status === 4 || status === 7) {
                        ele.push(
                            <Tooltip key={1} title={props.intl.formatMessage({id: "page.table.view.rejection.reason"})}>
                                <div className={styles.item} onClick={() => _this.handleClickDetail(record)}><Icon
                                    type={"file"}/></div>
                            </Tooltip>
                        );
                    // }
                    // if (status === 1) {
                        ele.push(
                            <Tooltip key={2} title={props.intl.formatMessage({id: "page.table.view.auth.info"})}>
                                <div className={styles.item} onClick={() => _this.lookAuthInfo(record)}><Icon
                                    type="exclamation-circle-o"/></div>
                            </Tooltip>
                        )
                    // }

                    return (
                        <div className={styles.operatorWrapper}>
                            {
                                <Tooltip key={3} title={props.intl.formatMessage({id: "page.table.view.order.details"})}>
                                    <div onClick={() => _this.showDetailModal(record)} className={styles.item}><Icon
                                        type={"user"}/></div>
                                </Tooltip>
                            }
                            {ele}
                            {/* {
                            <Tooltip key={4} title={'测试按钮'}>
                                <div onClick={() => _this.showApprovalFlow(record)} className={styles.item}><Icon type={'file'}/></div>
                            </Tooltip>
                        } */}
                        </div>

                    );


                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.order.no"}),
                dataIndex: "orderNo",
                key: "orderNo",
                width: 170,
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.name" }),
                dataIndex: "userTrueName",
                key: "userTrueName",
                width: 180,
                render(text) { return <CopyText text={text} isEllispsis={true} /> }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.mobile"}),
                dataIndex: "userPhone",
                key: "userPhone",
                width: 90,
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({id: "page.table.old.user"}),
                dataIndex: "isOlduser",
                key: "isOlduser",
                width:50,
                render(text) {
                    return Number(text) === 0 ? props.intl.formatMessage({id: "page.table.no"}) : props.intl.formatMessage({id: "page.table.yes"});
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.application.amount"}),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                width:70,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.loan.amount"}),
                dataIndex: "lendMoney",
                key: "lendMoney",
                width:70,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {title: props.intl.formatMessage({id: "page.table.loan.period"}), dataIndex: "lendDays", key: "lendDays", width:50,},
            // {
            //     title: props.intl.formatMessage({id: "page.table.handling.fee"}),
            //     dataIndex: "serviceMoney",
            //     key: "serviceMoney",
             
            //     render(text, record) {
            //         const {deviceMoney, lendMoney} = record;
            //         const res = Number(deviceMoney - lendMoney);
            //         return <CopyText text={convertMoneyFormat(text)}/>;
            //     }
            // },
            {
                title: props.intl.formatMessage({ id: "page.search.list.appication.time" }),
                dataIndex: "applyTime",
                key: "applyTime",
                width:65,
                className:styles.smallText,
                render(text) {
                    return <Tooltip title={moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}>
                        {moment(Number(text) * 1000).format("MM-DD HH:mm:ss")}
                    </Tooltip>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.loan.time" }),
                dataIndex: 'loanTime',
                key: 'loanTime',
                width:65,
                className:styles.smallText,
                render(text) {
                    const time = Number(text);
                    if (!time) {
                        return props.intl.formatMessage({ id: "page.table.none" });
                    }
                    return <Tooltip title={moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}>
                        {moment(Number(text) * 1000).format("MM-DD HH:mm:ss")}
                    </Tooltip>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.expiration.time" }),
                dataIndex: 'expireTime',
                key: 'expireTime',
                width:65,
                className:styles.smallText,
                render(text) {
                    const time = Number(text);
                    if (!time) {
                        return props.intl.formatMessage({ id: "page.table.none" });
                    }
                    return <Tooltip title={moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}>
                        {moment(Number(text) * 1000).format("MM-DD HH:mm:ss")}
                    </Tooltip>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.appName" }), 
                dataIndex: "appName", 
                key: "appName", 
                width: 80,
                className:styles.smallText,
                render(text, record) {
                    return <CopyText text={text} isEllispsis={true}/>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.channel.source" }), 
                dataIndex: "channelName", 
                key: "channelName", 
                width: 70,
                className:styles.smallText,
                render(text, record) {
                    return <CopyText text={text} isEllispsis={true}/>;
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.examiner"}),
                dataIndex: "examiner2Name",
                key: "examiner2Name",
                width: 90,
                className:styles.smallText,
                render(text, record) {
                    const {examiner3Name} = record;
                    let ele = [];
                    if (text) {
                        ele.push(<div key={1}>{props.intl.formatMessage({id: "page.table.re-examine"})}：{text}</div>);
                    }
                    if (examiner3Name) {
                        ele.push(<div>{props.intl.formatMessage({id: "page.table.final.examine"})}：{examiner3Name}</div>);
                    }
                    return (
                        <div className={styles.smallText}>
                            {ele}
                        </div>
                    );
                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.status"}),
                dataIndex: "status",
                key: "status",
                width: 55,
                className:styles.smallText,
                render(text) {
                    return <div className={styles.smallText}>{orderStatus[text]}</div>
                }
            },
            
        ];
    }

    onCopy = () => {
        message.success(this.props.intl.formatMessage({id: "page.table.operation.success"}), 2);
    }

    //查看认证信息
    lookAuthInfo = (record) => {
        this.currentRecord = record;
        const {orderNo} = record;
        const {getAuthData} = this.props;
        getAuthData({orderNo});
    }
    handleClickDetail = record => {
        const {id} = record;
        const _this = this;
        this.setState({visible: true});
        axios
            .post("/hs/admin/orderReview/getOrderInfo", {orderId: id})
            .then(res => {
                if (Number(res.code) === 200) {
                    const {data: {refundReason}} = res;
                    let item;
                    if (refundReason) {
                        try {
                            //同盾被拒
                            const obj = JSON.parse(refundReason)
                            item = obj['risk_items'];
                        } catch (e) {
                            //运营商被拒或者审核时被拒
                            item = refundReason;
                        }
                    }
                    _this.setState({modalData: item});
                }
            });
    };

    //todo 手动机审
    manualCheck = () => {
        const {id} = this.currentRecord;
        const {getTableData, tableData: {pagination = {current: 1}}, changeAuthModal, intl} = this.props;
        const _this = this;
        let hide = null;
        if (!this.isHasClick) {
            this.isHasClick = true;
            hide = message.loading(intl.formatMessage({id: "page.table.examine.progress.comment"}), 0);
            axios
                .post('/hs/admin/orderReview/submitMachineReview', {orderId: id})
                .then(res => {
                    hide && hide();
                    //关闭弹框
                    changeAuthModal(false);
                    if (Number(res.code) === 200) {
                        message.success(intl.formatMessage({id: "page.table.operation.success"}));
                        //刷新数据
                        const params = {
                            // status: this.searchStatus,
                            ...this.searchStatus,
                            pageNum: pagination["current"],
                            pageSize: this.pageSize
                        };
                        getTableData(params);
                    }
                    _this.isHasClick = false;
                })
                .catch(() => {
                    hide && hide();
                    _this.isHasClick = false;
                })
        }

    }

    handlePageChange = info => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchStatus});
    };

    handleOk = () => {
        this.setState({visible: false, modalData: []});
    };
    handleCancel = () => {
        this.setState({visible: false}, () => {
            this.setState({
                modalData: null
            })
        });
    };

    handleSearch = obj => {
        const {getTableData} = this.props;
        const {time, apyTime} = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const isArr2 = Array.isArray(apyTime) && apyTime.length > 0;
        const params = {
            ...obj,
            yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
            aStartTime: isArr2 ? apyTime [0].format('YYYY-MM-DD 00:00:00') : '',
            aEndTime: isArr2 ? apyTime[1].format('YYYY-MM-DD 23:59:59') : '',
        };
        delete params['apyTime'];
        delete params['time'];
        this.searchStatus = params;
        getTableData({...params, pageNum: 1, pageSize: this.pageSize});
    };
    renderModalData = () => {
        const {modalData} = this.state;
        let ele;
        if (!modalData) {
            ele = null;
        }
        if (typeof modalData === 'string') {
            ele = (
                <Card title={''}>
                    <div>
                        {this.props.intl.formatMessage({id: "page.table.view.rejection.reason"})}: {modalData}
                    </div>
                </Card>
            );

        } else {
            ele = (
                <Card title={''}>
                    <div>
                        {this.props.intl.formatMessage({id: "page.table.view.rejection.reason"})}: {this.props.intl.formatMessage({id: "page.table.not.filled"})}
                    </div>
                </Card>
            );
            // ele = <CommonTable
            //     title={() => <div>被拒类型:同盾</div>}
            //     columns={this.modalTableColumns}
            //     dataSource={modalData}
            // />;
        }
        return (
            <div className={styles.modalWrapper}>{ele}</div>
        );

    }

    //关闭详情modal
    detailModalCancel = () => {
        const {changeDetailModal} = this.props;
        changeDetailModal(false);
    }
    showDetailModal = (record) => {
        const {getOrderDetailData} = this.props;
        const {id} = record;
        getOrderDetailData({orderId: id});
    }
    //导出订单
    exportOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/order/download',
            method: 'post',
            responseType: 'blob',
            data: _this.searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.exporting.download.userlist"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }


    authModalCancel = () => {
        const {changeAuthModal} = this.props;
        changeAuthModal(false);
    }
    authAfterClose = () => {
        this.currentRecord = null;
    }
    handleReset = () => {
        const {userId} = this.currentRecord;
        const {resetOperator} = this.props;
        resetOperator({userId});
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageNum: 1, pageSize: this.pageSize, ...this.searchStatus});
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({
            data: [],
            pagination: {}
        });
    }

    render() {
        const {tableData: {data, pagination}, loading, info, detailVisible, authVisible, authData, intl} = this.props;
        const {visible, btnDisabled} = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportOrder}>{intl.formatMessage({id: "page.table.export.list"})}</Button></div>
                { /* 获取不到数据展示模板 */}
                <CommonTable
                    loading={loading}
                    dataSource={data}
                    pagination={pagination}
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                />
                <Modal
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                    footer={null}
                    visible={visible}
                    title={intl.formatMessage({id: "page.table.details"})}
                >
                    {this.renderModalData()}
                </Modal>
                <DetailModal visible={detailVisible} info={info} handleCancel={this.detailModalCancel}/>
                <AuthModal
                    handleCancel={this.authModalCancel}
                    modalData={authData}
                    afterClose={this.authAfterClose}
                    visible={authVisible}
                    handleCheck={this.manualCheck}
                    handleReset={this.handleReset}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {windControlCheckState: {orderListState}} = state;
    return {
        tableData: orderListState["data"],
        loading: orderListState["loading"],
        detailVisible: orderListState['detailVisible'],
        info: orderListState['info'],
        authData: orderListState['authData'],
        authVisible: orderListState['authVisible']
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTableData: orderListAction.orlGetTableData,
            setTableData: orderListAction.orlSetTableData,
            getOrderDetailData: orderListAction.orlGetOrderDetail,
            changeDetailModal: orderListAction.orlChangeDetailModal,
            getAuthData: orderListAction.orlGetAuthData,
            changeAuthModal: orderListAction.orlChangeAuthModal,
            resetOperator: orderListAction.orlResetOperator
        },
        dispatch
    );
};

OrderList.PropTypes = {
    intl: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderList));
