import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loanRecordAction} from './index';
import {Button, Icon, message, Popconfirm, Tooltip} from 'antd';
import { CommonTable, CopyText } from 'components';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import styles from './LoanRecord.less';
import {DetailModal} from '../RepeatLoan';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import LoanToFailModal from './LoanToFailModal/LoanToFailModal';
import LoanToRejectModal from './LoanToRejectModal/LoanToRejectModal';
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const convertParams = (obj = {}) => {
    const {time = [], orderNo = '', userName = '', phoneNo = '', status = '', assetType = '', payTradeNo = '', merchantId = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        orderNo,
        phoneNo,
        userName,
        status,
        assetType,
        payTradeNo,
        merchantId,
    };
}


const loanStatus = {
    0: <FormattedMessage id="page.search.list.loaning"/>,
    1: <FormattedMessage id="page.search.list.success.loan"/>,
    4: <FormattedMessage id="page.search.list.fail.loan"/>,
    5: <FormattedMessage id="page.search.list.pending.order"/>
};

class LoanRecord extends Component {

    constructor(props) {
        console.log(props)
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            isSuperAdmin,
            allMerchants,
            btnDisabled: false,
            info: {},
            setFailModalVisible: false,
            setRejectModalVisible: false,
        };
        this.pageSize = 10;
        this.searchParams = convertParams();
        const _this = this;
        this.columns = [
            {
                title: props.intl.formatMessage({ id: "page.table.start.time" }), dataIndex: 'addTime', key: 'addTime', width: '8%',
                render(text) {
                    if (text === 0) {
                        return props.intl.formatMessage({ id: "page.table.none" });
                    } else {
                        return <Tooltip title={moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}>
                            {moment(Number(text) * 1000).format("MM-DD HH:mm:ss")}
                        </Tooltip>;
                    }
                }
            },
            { title: props.intl.formatMessage({ id: "page.search.list.paid.trans.order.no" }), dataIndex: 'payTradeNo', key: 'payTradeNo', width: '16%', render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({ id: "page.search.list.platform.name" }),
                dataIndex: 'paymentPlatform',
                key: 'paymentPlatform',
                width: '8%',
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.loan.time" }),
                dataIndex: 'loanTime',
                key: 'loanTime',
                width: '10%',
                render(text) {
                    if (text === 0) {
                        return props.intl.formatMessage({ id: "page.table.none" })
                    } else {
                        return <Tooltip title={moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}>
                            {moment(Number(text) * 1000).format("MM-DD HH:mm:ss")}
                        </Tooltip>;
                    }
                }
            },
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo',  width: '15%', render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({ id: "page.search.list.name" }),
                dataIndex: 'userName',
                key: 'userName',
                width: isSuperAdmin ? '8%' : '15%',
                render(text) { return <CopyText text={text} isEllispsis={true} /> }
            },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone',  width: '7%', },
            { title: props.intl.formatMessage({ id: "page.search.list.product.name" }), dataIndex: 'productName', key: 'productName',  width: '10%' },
            { title: props.intl.formatMessage({ id: "page.table.appName" }), dataIndex: 'appName', key: 'appName',  width: '10%' },
            {
                title: props.intl.formatMessage({ id: "page.search.list.funds.types" }),
                dataIndex: 'isLeng',
                key: 'isLeng',
                width: '5%',
                className: styles.smallText,
                render(text) {
                    if (text == 1) {
                        return props.intl.formatMessage({ id: "page.table.virtual" });
                    } else {
                        return props.intl.formatMessage({ id: "page.search.list.normal" });
                    }
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.loan.status" }),
                dataIndex: 'loanState',
                key: 'loanState',
                width: '5%',
                className: styles.smallText,
                render(text) {
                    return loanStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.paid.amount" }),
                dataIndex: 'loanMoney',
                key: 'loanMoney',
                width: '6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(Number(text))} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: '8%',
                render(text, record) {
                    const { loanState } = record;
                    let ele = (
                        <Popconfirm title={props.intl.formatMessage({ id: "page.table.manual.loan.confirm" })} onConfirm={() => _this.loanMoney(text)}>
                            <span><Icon type={'pay-circle-o'} /></span>
                        </Popconfirm>
                    );
                    if (Number(loanState) !== 3) {
                        ele = null;
                    }
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() => _this.lookDetail(record)}><Icon type={'file'} /></span>
                            {(loanState == 1) &&
                                <Tooltip title={props.intl.formatMessage({ id: "page.table.back.loan.fail" })}>
                                    <span onClick={() => _this.showSetFailModal(record)}><Icon type={'file-excel'} /></span>
                                </Tooltip>
                            }
                            {(loanState == 1) &&
                                <Tooltip title={props.intl.formatMessage({ id: "page.table.back.loan.reject" })}>
                                    <span onClick={() => _this.showSetRejectModal(record)}><Icon type={'stop'} /></span>
                                </Tooltip>
                            }
                            {ele}
                        </div>
                    );
                }
            }
        ];
        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName',
            width: '7%',
          })
        }
    }

    //导出放款记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/loan/loanListDownload',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.loan.list.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    loanMoney = (text) => {
        const {payMoney, getTableData, tableData: {pagination}} = this.props;

        payMoney({id: text}, () => {
            getTableData({pageSize: this.pageSize, pageNum: pagination['current'], ...this.searchParams});
        })
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


    lookDetail = (record) => {
        const {orderNo} = record;
        const {changeModalVisible, getModalData} = this.props;
        changeModalVisible(true);
        getModalData({orderNo});
    }


    afterClose = () => {
        const {setModalData, changeModalLoading} = this.props;
        setModalData({data: [], pagination: {}});
        changeModalLoading(false);
    }
    handleModalPageChange = (info) => {
        const {current, pageSize} = info;
        const {getModalData} = this.props;
        getModalData({pageSize, pageNum: current});
    }
    handleModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({data: [], pagination: {}});
    }


    setStatus2Fail = (record) => {

        console.log(record)
        try {
            axios({
                url: '/hs/admin/order/setDuplicateCallbackRecord2Fail',
                method: 'post',
                data: record
            }).then((res) => {
                if (res && res.code == '200') {
                    message.success(res.message);
                    this.setState({
                        setFailModalVisible: false
                    });
                    setTimeout(function () {
                        document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                    }, 1000);
                }


            });
        } catch (e) {
        }
    }


    setStatus2Reject = (record) => {

        console.log(record)
        try {
            axios({
                url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
                method: 'post',
                data: record
            }).then((res) => {
                if (res && res.code == '200') {
                    message.success(res.message);
                    this.setState({
                        setRejectModalVisible: false
                    });
                    setTimeout(function () {
                        document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                    }, 1000);
                }


            });
        } catch (e) {
        }
    }

    onSetFailModalChange = (changedFields) => {
        this.setState(({info}) => ({
            info: {...info, ...changedFields},
        }));
    }


    showSetFailModal = (record) => {
        const {orderNo} = record;
        // // const { changeModalVisible } = this.props;
        // this.selectOrderNo = orderNo;
        this.setState({
            info: record,
            setFailModalVisible: true
        });
    }


    handleSetFailModalOk = (obj) => {
        const deleteParams = {...obj};
        console.log(deleteParams)

        this.setStatus2Fail(deleteParams);


    }
    handleSetFailModalCancel = () => {
        this.setState({
            setFailModalVisible: false
        });
    }


    onSetRejectModalChange = (changedFields) => {
        this.setState(({info}) => ({
            info: {...info, ...changedFields},
        }));
    }


    showSetRejectModal = (record) => {
        const {orderNo} = record;
        this.setState({
            info: record,
            setRejectModalVisible: true
        });
    }


    handleSetRejectModalOk = (obj) => {
        const deleteParams = {...obj};
        console.log(deleteParams)

        this.setStatus2Reject(deleteParams);


    }
    handleSetRejectModalCancel = () => {
        this.setState({
            setRejectModalVisible: false
        });
    }


    render() {
        const {tableData: {data, pagination}, loading, modalLoading, modalData, visible} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                />
                <DetailModal
                    modalLoading={modalLoading}
                    visible={visible}
                    afterClose={this.afterClose}
                    modalData={modalData}
                    handleCancel={this.handleModalCancel}
                    handlePageChange={this.handleModalPageChange}
                />


                <LoanToFailModal
                    onChange={this.onSetFailModalChange}
                    handleOk={this.handleSetFailModalOk}
                    handleCancel={this.handleSetFailModalCancel}
                    info={this.state.info}
                    visible={this.state.setFailModalVisible}
                    modalLoading={modalLoading}/>

                <LoanToRejectModal
                    onChange={this.onSetRejectModalChange}
                    handleOk={this.handleSetRejectModalOk}
                    handleCancel={this.handleSetRejectModalCancel}
                    info={this.state.info}
                    visible={this.state.setRejectModalVisible}
                    modalLoading={modalLoading}/>

            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const {paymentManageState: {loanRecordState}} = state;
    return {
        tableData: loanRecordState['tableData'],
        loading: loanRecordState['loading'],
        visible: loanRecordState['visible'],
        modalData: loanRecordState['modalData'],
        modalLoading: loanRecordState['modalLoading']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: loanRecordAction.lrdGetTableData,
        setTableData: loanRecordAction.lrdSetTableData,
        payMoney: loanRecordAction.lrdPayMoney,
        getModalData: loanRecordAction.lrdGetModalData,
        setModalData: loanRecordAction.lrdSetModalData,
        changeModalVisible: loanRecordAction.lrdChangeModalVisible,
        changeModalLoading: loanRecordAction.lrdChangeModalLoading
    }, dispatch);
}

LoanRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoanRecord));
