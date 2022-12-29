/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { CommonTable, CopyText } from 'components';
import { repeatLoanAction } from './index';
import SearchList from './SearchList/SearchList';
import { Popconfirm, Icon, Button, message, Row, Col } from 'antd';
import DetailModal from './DetailModal/DetailModal';
import styles from './RepeatLoan.less';
import { orderStatus, convertMoneyFormat } from 'utils';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const convertParams = (obj) => {
    const { orderNo = '', userTrueName = '', userPhone = '', merchantId = '' } = obj;
    return {
        orderNo,
        userTrueName,
        userPhone,
        merchantId,
    };
}


class RepeatLoan extends Component {
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
          isSuperAdmin,
          allMerchants,
          batchReloanBtnDisabled: false,
          batchLoanRefuseDisabled: false,
        };
        const _this = this;
        this.searchParams = convertParams({});
        this.pageSize = 10;
        this.columns = [
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo',width:'15%' , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName',width:'20%' , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone' , render(text) { return <CopyText text={text} /> } },
            { title: this.props.intl.formatMessage({id :"page.search.list.product.name"}), dataIndex: 'productName', key: 'productName', width: '10%' },
            { title: this.props.intl.formatMessage({id :"page.table.appName"}), dataIndex: 'appName', key: 'appName', width: '10%' },
            {
                title: props.intl.formatMessage({ id: "page.table.application.amount" }),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.loan.amount" }),
                dataIndex: 'lendMoney',
                key: 'lendMoney',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.appication.time" }),
                dataIndex: 'addTime',
                key: 'addTime',
                width:'13%',
                render(text) {
                    if (!text) {
                        return '';
                    }
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.order.status" }),
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return orderStatus[text]
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width:'8%',
                render(text, record) {
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() => _this.lookDetail(record)}><Icon type={'file'}/></span>
                            <Popconfirm title={_this.props.intl.formatMessage({ id: "page.table.loan.again" })} onConfirm={() => _this.payLoan(record)}>
                                <span><Icon type="pay-circle-o"/></span>
                            </Popconfirm>
                        </div>
                    );
                }
            },
        ];
        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName'
          })
        }
    }

    lookDetail = (record) => {
        const { orderNo } = record;
        const { changeModalVisible, getModalData } = this.props;
        changeModalVisible(true);
        getModalData({ orderNo });
    }
    payLoan = (record) => {
        const { orderNo } = record;
        const { repeatPay, getTableData } = this.props;
        repeatPay({ orderNo }, () => {
            getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
        });
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ pageSize, pageNum: current, ...this.searchParams });
    }

    submit = (obj) => {
        const { getTableData } = this.props;
        const params = convertParams(obj);
        this.searchParams = params;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...params });
    }

    //modal
    handleModalChange = (info) => {
        const { current, pageSize } = info;
        const { getModalData } = this.props;
        getModalData({ pageSize, pageNum: current });
    }
    afterClose = () => {
        const { setModalData, changeModalLoading } = this.props;
        setModalData({ data: [], pagination: {} });
        changeModalLoading(false);
    }

    handleCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    componentDidMount() {
        const { getTableData } = this.props;
        const _this = this;
        getTableData({ pageSize: _this.pageSize, pageNum: 1, ..._this.searchParams });
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({ data: [], pagination: {} });
    }

    onClickBatchReLoan = () => {
        const { selectKeys, intl, batchReLoan, getTableData, tableData: { data } } = this.props;
        //是否有选中订单
        const isSelected = selectKeys.length > 0;
        if (!isSelected) {
            message.warn(intl.formatMessage({ id: "windowPage.select.order" }));
            return;
        }
        this.setState({ batchReloanBtnDisabled: true });
        let selectedOrderNos = data.filter(row => selectKeys.includes(row.id)).map(row => row.orderNo);
        batchReLoan({ orderNos: selectedOrderNos }, () => {
            getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams }, () => this.setState({ batchReloanBtnDisabled: false }));
        });

    }

    loanBatchRefuse = () => {
        const _this = this;
        const { selectKeys, intl, batchRefuseLoan, getTableData, tableData: { data } } = this.props;
        // 是否有选中订单
        const isSelected = selectKeys.length > 0;
        if (!isSelected) {
            message.warn(intl.formatMessage({ id: "windowPage.select.order" }));
            return;
        }

        _this.setState({ batchLoanRefuseDisabled: true });

        let selectedOrderNos = data.filter(row => selectKeys.includes(row.id)).map(row => row.orderNo);
        batchRefuseLoan({ orderNos: selectedOrderNos },
            () => {
                getTableData({ pageSize: _this.pageSize, pageNum: 1, ..._this.searchParams });
                _this.setState({ batchLoanRefuseDisabled: false })
            });
    }

    onSelectChange = (selectedKeys) => {
        const { changeSelectKeys } = this.props;
        changeSelectKeys(selectedKeys);
    }

    handleExportReloanList = () => {
        const { orderNo, userPhone, userTrueName , merchantId} = this.searchParams
        window.open(`/hs/admin/order/fail/download?orderNo=${orderNo}&userPhone=${userPhone}&userTrueName=${userTrueName}&merchantId=${merchantId}`)
    }

    render() {
        const { tableData: { data, pagination }, loading, visible, modalLoading, modalData, selectKeys } = this.props;
        const rowSelection = {
            selectedRowKeys: selectKeys,
            onChange: this.onSelectChange,
        };
        const { batchReloanBtnDisabled, batchLoanRefuseDisabled } = this.state;
        return (
            <div>
                <SearchList submit={this.submit} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div>
                    <Row gutter={16}>
                        <Button type={'danger'} onClick={this.handleExportReloanList} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "page.table.export" })}  </Button>
                        <Button type={'primary'} disabled={batchReloanBtnDisabled} onClick={this.onClickBatchReLoan} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "page.table.batch.loan.again" })}  </Button>
                        <Button type={'primary'} disabled={batchLoanRefuseDisabled} onClick={this.loanBatchRefuse} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "windowPage.loan.batch.refuse" })}  </Button>
                    </Row>
                </div>
                <CommonTable
                    rowSelection={rowSelection}
                    columns={this.columns}
                    pagination={pagination}
                    dataSource={data}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                />
                <DetailModal
                    handlePageChange={this.handleModalChange}
                    visible={visible}
                    afterClose={this.afterClose}
                    modalLoading={modalLoading}
                    modalData={modalData}
                    handleCancel={this.handleCancel}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { paymentManageState: { repeatLoanState } } = state;
    return {
        tableData: repeatLoanState['tableData'],
        modalData: repeatLoanState['modalData'],
        visible: repeatLoanState['visible'],
        loading: repeatLoanState['loading'],
        modalLoading: repeatLoanState['modalLoading'],
        selectKeys: repeatLoanState['selectKeys'],
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: repeatLoanAction.rplGetTableData,
        setTableData: repeatLoanAction.rplSetTableData,
        getModalData: repeatLoanAction.rplGetModalData,
        setModalData: repeatLoanAction.rplSetModalData,
        changeModalLoading: repeatLoanAction.rplChangeModalLoading,
        changeModalVisible: repeatLoanAction.rplChangeModalVisible,
        repeatPay: repeatLoanAction.rplRepeatPay,
        changeSelectKeys: repeatLoanAction.rplChangeSelectKey,
        batchReLoan: repeatLoanAction.rplBatchReLoan,
        batchRefuseLoan: repeatLoanAction.rplRefuseLoan
    }, dispatch);
}

RepeatLoan.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RepeatLoan))
