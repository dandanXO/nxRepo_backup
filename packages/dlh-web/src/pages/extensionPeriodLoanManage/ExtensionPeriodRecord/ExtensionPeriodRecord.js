import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { CommonTable, CopyText } from 'components';
import {epRecordAction} from './index';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import {Button, Icon, message} from 'antd';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import DetailModal from "./DetailModal/DetailModal";
import styles from "./ExtensionPeriodRecord.less";
import DeleteLengOrderModal from './DeleteLengOrderModal/DeleteLengOrderModal';
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';
import {getIsSuperAdmin, getAllMerchants} from "utils";

const convertParams = (obj = {}) => {
    const { time = [], lengTime = [], orderNo = '', userName = '', phoneNo = '', status = '', merchantId = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    const isArr2 = Array.isArray(lengTime) && lengTime.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        startLengTime: isArr2 ? lengTime[0].format('YYYY-MM-DD 00:00:00') : '',
        endLengTime: isArr2 ? lengTime[1].format('YYYY-MM-DD 23:59:59') : '',
        orderNo,
        phoneNo,
        userName,
        status,
        merchantId
    };
}

class ExtensionPeriodRecord extends Component {


    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            btnDisabled: false,
            info: {},
            delelteModalInfo: {},
            currentDetailId: "",
            currentDetailPage: "",
            delelteModalVisible: false,
            isSuperAdmin,
            allMerchants
        };
        this.INIT = {
            time: [moment(0, 'HH'), moment({hour: 23, minute: 59, seconds: 59})]
        };
        const _this = this;
        this.pageSize = 10;
        this.searchParams = convertParams(this.init);
        this.columns = [
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', width: 200, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName', width: 200, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone', width: 120, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id :"page.search.list.product.name"}), dataIndex: 'productName', key: 'productName' , width: 110},
            { title: props.intl.formatMessage({id :"page.table.appName"}), dataIndex: 'appName', key: 'appName' , width: 110 },
            {
                title: props.intl.formatMessage({ id: "page.table.loan" }),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                width: 100,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            { title: props.intl.formatMessage({ id: "page.table.loan.period" }), dataIndex: 'lendDays', key: 'lendDays', width: 110 },
            {
                title: props.intl.formatMessage({ id: "page.search.list.expiration.time" }),
                dataIndex: 'expireTime',
                key: 'expireTime',
                width: 170,
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.reduce.amount" }),
                dataIndex: 'reductionMoney',
                key: 'reductionMoney',
                width: 100,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.extend.num.period" }),
                dataIndex: 'lengPeriod',
                key: 'lengPeriod',
                width: 100,
                render(text, record) {
                    return isNaN(text) ? "-" : text + 1;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.extend.fee.curreny" }),
                dataIndex: 'hadPaidLengMoney',
                key: 'hadPaidLengMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.appication.time" }),
                dataIndex: 'addTime',
                key: 'addTime',
                width: 170,
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.extend.time" }),
                dataIndex: 'lengTime',
                key: 'lengTime',
                width: 170,
                render(text) {
                    return text == null || text == undefined ? '-' : moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({ id: "page.table.operation.people" }), dataIndex: 'operatorName', key: 'operatorName', width: 120 },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: 100,
                render(text, record) {
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() => _this.lookDetail(record)}><Icon type={'file'} /></span>
                        </div>
                    );
                }
            }
        ];
        if (isSuperAdmin) {
            this.columns.unshift({
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'merchantName',
                key: 'merchantName',
                width: 90
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

    lookDetail = (record) => {
        const {id} = record;
        const {changeModalVisible, getModalData} = this.props;
        this.setState({currentDetailId: id})
        this.setState({currentDetailPage: 1})
        changeModalVisible(true);
        getModalData({id});
    }
    afterClose = () => {
        const {setModalData, changeModalLoading} = this.props;
        setModalData({data: [], pagination: {}});
        changeModalLoading(false);
    }
    handleModalPageChange = (info) => {

        const id = this.state.currentDetailId;
        const {current, pageSize} = info;
        const {getModalData} = this.props;
        this.setState({currentDetailPage: current})

        this.props.modalData.current = current;

        getModalData({id, pageSize, pageNum: current});
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


    //导出还款记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/order/downloadExtendOrderRecordList',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.extend.list.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    onDeleteModalChange = (changedFields) => {
        this.setState(({delelteModalInfo}) => ({
            delelteModalInfo: {...delelteModalInfo, ...changedFields},
        }));
    }


    showDeleteModal = (record) => {
        const {orderNo} = record;
        // // const { changeModalVisible } = this.props;
        // this.selectOrderNo = orderNo;
        this.setState({
            info: record,
            delelteModalVisible: true
        });
    }


    handleDeleteModalOk = (obj) => {
        const deleteParams = {...obj};
        console.log(deleteParams)

        axios({
            url: '/hs/admin/order/deleteLengRecord',
            method: 'post',
            data: deleteParams
        }).then((res) => {
            if (res && res.code == '200') {
                message.success(res.data);
                document.getElementsByClassName("ant-modal-close-x")[0].click();
                this.setState({
                    delelteModalVisible: false
                });
                setTimeout(function () {
                    document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                }, 1000);
            }


        });


    }
    handleDeleteModalCancel = () => {
        this.setState({
            delelteModalVisible: false
        });
    }

    render() {
        const {tableData: {data, pagination}, loading, modalLoading, modalData, visible} = this.props;
        const {btnDisabled, currentDetailPage} = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch} init={this.init} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    scroll={{x:'100%'}}
                />
                <DetailModal
                    modalLoading={modalLoading}
                    visible={visible}
                    afterClose={this.afterClose}
                    modalData={modalData}
                    handleCancel={this.handleModalCancel}
                    handlePageChange={this.handleModalPageChange}
                    handleDeleteModel={this.showDeleteModal}
                    currentDetailPage={currentDetailPage}
                />

                <DeleteLengOrderModal
                    onChange={this.onDeleteModalChange}
                    handleOk={this.handleDeleteModalOk}
                    handleCancel={this.handleDeleteModalCancel}
                    info={this.state.info}
                    visible={this.state.delelteModalVisible}
                    modalLoading={modalLoading}/>

            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const {extensionPeriodLoanManageState: {epRecordState}} = state;
    return {
        tableData: epRecordState['tableData'],
        loading: epRecordState['loading'],
        visible: epRecordState['visible'],
        modalData: epRecordState['modalData'],
        modalLoading: epRecordState['modalLoading']
    };

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: epRecordAction.epRedGetTableData,
        setTableData: epRecordAction.epRedSetTableData,
        getModalData: epRecordAction.epRedGetModalData,
        setModalData: epRecordAction.epRedSetModalData,
        changeModalVisible: epRecordAction.epRedChangeModalVisible,
        changeModalLoading: epRecordAction.epRedChangeModalLoading
    }, dispatch);
}

ExtensionPeriodRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExtensionPeriodRecord));
