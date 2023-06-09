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
import { Popconfirm, Icon, Button, message, Row, Col ,Modal} from 'antd';
import DetailModal from './DetailModal/DetailModal';
import styles from './RepeatLoan.less';
import { orderStatus, convertMoneyFormat } from 'utils';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const convertParams = (obj) => {
    const { orderNo = '', userTrueName = '', userPhone = '', merchantId = '', suspend = 'false' } = obj;
    return {
        orderNo,
        userTrueName,
        userPhone,
        merchantId,
        suspend
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
          batchLoanSuspendDisabled: false,
        };
        const _this = this;
        this.searchParams = convertParams({});
        this.pageSize = 10;
        this.columns = [
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo' ,width:'10%', render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName' , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone' , render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({ id: "page.search.list.suspend" }), dataIndex: 'suspend', key: 'suspend', width: '3%',
                render (text) {
                    return text  ?
                        <div style={{ color: '#F56A00' }}><FormattedMessage id={'page.table.yes'} /></div> :
                        <FormattedMessage id={'page.table.no'} />
                }
            },
            { title: this.props.intl.formatMessage({id :"page.search.list.product.name"}), dataIndex: 'productName', key: 'productName'},
            { title: this.props.intl.formatMessage({id :"page.table.appName"}), dataIndex: 'appName', key: 'appName' },
            {
                title: props.intl.formatMessage({ id: "page.table.application.amount" }),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                width:'6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.loan.amount" }),
                dataIndex: 'lendMoney',
                key: 'lendMoney',
                width:'6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.suspend.time" }),
                dataIndex: 'suspendTime',
                key: 'suspendTime',
            },
            {
                title: props.intl.formatMessage({ id: "page.table.card.data.update.time" }),
                dataIndex: 'lastBindBankCardTime',
                key: 'lastBindBankCardTime',
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.appication.time" }),
                dataIndex: 'addTime',
                key: 'addTime',
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
                width:'6%',
                render(text) {
                    return orderStatus[text]
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width:'5%',
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
        Modal.confirm({
            title: intl.formatMessage({ id: "page.table.reloan.all.orders.confirm" }),
            content: intl.formatMessage({ id: "page.table.reloan.all.orders.confirm.content" }),
            okText: intl.formatMessage({ id: "page.table.ok" }),
            cancelText: intl.formatMessage({ id: "page.table.cancel" }),
            icon: <Icon type="info-circle" theme="twoTone" twoToneColor={'#FAAD14'} />,
            onOk: () => {
               
                this.setState({ batchReloanBtnDisabled: true });
                let selectedOrderNos = data.filter(row => selectKeys.includes(row.id)).map(row => row.orderNo);
                batchReLoan({ orderNos: selectedOrderNos }, () => {
                    getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams }, () => this.setState({ batchReloanBtnDisabled: false }));
                });

            }
        })

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

        Modal.confirm({
            title: intl.formatMessage({ id: "page.table.quit.lending.all.orders.confirm" }),
            content: intl.formatMessage({ id: "page.table.quit.lending.all.orders.confirm.content" }),
            okText: intl.formatMessage({ id: "page.table.ok" }),
            cancelText: intl.formatMessage({ id: "page.table.cancel" }),
            icon: <Icon type="info-circle" theme="twoTone" twoToneColor={'#FAAD14'} />,
            onOk: () => {
               
                _this.setState({ batchLoanRefuseDisabled: true });

                let selectedOrderNos = data.filter(row => selectKeys.includes(row.id)).map(row => row.orderNo);
                batchRefuseLoan({ orderNos: selectedOrderNos },
                    () => {
                        getTableData({ pageSize: _this.pageSize, pageNum: 1, ..._this.searchParams });
                        _this.setState({ batchLoanRefuseDisabled: false })
                    });
            }
        })

    }

    loanBatchSuspend=()=>{
        const _this = this;
        const { selectKeys, intl, batchSuspendLoan, getTableData, tableData: { data } } = this.props;

        // 是否有选中订单
        const isSelected = selectKeys.length > 0;
        if (!isSelected) {
            message.warn(intl.formatMessage({ id: "windowPage.select.order" }));
            return;
        }

        _this.setState({ batchLoanSuspendDisabled: true });

        let selectedOrderNos = data.filter(row => selectKeys.includes(row.id)).map(row => row.orderNo);
        batchSuspendLoan({ orderNos: selectedOrderNos },
            () => {
                message.success(intl.formatMessage({ id: "page.table.has.been.modified" }));
                getTableData({ pageSize: _this.pageSize, pageNum: 1, ..._this.searchParams });
                _this.setState({ batchLoanSuspendDisabled: false })
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
        const { batchReloanBtnDisabled, batchLoanRefuseDisabled, batchLoanSuspendDisabled } = this.state;
        return (
            <div>
                <SearchList submit={this.submit} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div>
                    <Row gutter={16}>
                        <Button type={'danger'} onClick={this.handleExportReloanList} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "page.table.export" })}  </Button>
                        <Button type={'primary'} disabled={batchReloanBtnDisabled} onClick={this.onClickBatchReLoan} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "page.table.batch.loan.again" })}  </Button>
                        <Button type={'primary'} disabled={batchLoanRefuseDisabled} onClick={this.loanBatchRefuse} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "windowPage.loan.batch.refuse" })}  </Button>
                        <Button type={'primary'} disabled={batchLoanSuspendDisabled} onClick={this.loanBatchSuspend} style={{ margin: '10px' }}>{this.props.intl.formatMessage({ id: "page.table.suspend.disbursement" })}  </Button>
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
        batchRefuseLoan: repeatLoanAction.rplRefuseLoan,
        batchSuspendLoan: repeatLoanAction.rplSuspendLoan
    }, dispatch);
}

RepeatLoan.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RepeatLoan))
