import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRefundAction } from './index';
import moment from 'moment';
import { Tooltip, Icon } from 'antd';
import { CommonTable } from 'components';
import styles from './AddRefund.less';
import SearchList from './SearchList/SearchList';
import AddModal from './AddModal/AddModal';
import { orderStatus, convertMoneyFormat } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const getParams = () => {
    return {
        payType: {
            value: '1'
        },
        payName: {
            value: '1'
        },
        totalMoney: {
            value: 0.01
        },
        payTradeNo: {
            value: ''
        },
        payTime: {
            value: moment()
        },
        remark: {
            value: ''
        }
    };
}

class AddRefund extends Component {
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            isSuperAdmin,
            allMerchants,
            info: getParams()
        };
        const _this = this;
        //当前选中的订单号
        this.selectOrderNo = '';
        this.pageSize = 10;
        this.searchParams = {};
        this.columns = [
            {
                title: props.intl.formatMessage({id :"page.table.loan.time"}),
                dataIndex: 'loanTime',
                key: 'loanTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({id :"page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo' },
            { title: props.intl.formatMessage({id :"page.search.list.name"}), dataIndex: 'userTrueName', key: 'userTrueName' },
            { title: props.intl.formatMessage({id :"page.search.list.mobile"}), dataIndex: 'userPhone', key: 'userPhone' },
            { title: props.intl.formatMessage({id :"page.search.list.product.name"}), dataIndex: 'productName', key: 'productName' },
            { title: props.intl.formatMessage({id :"page.table.appName"}), dataIndex: 'appName', key: 'appName' },
            {
                title: props.intl.formatMessage({id :"page.table.contract.amount"}),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({id :"page.search.list.order.status"}),
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return orderStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({id :"page.table.due.time"}),
                dataIndex: 'expireTime',
                key: 'expireTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({id :"page.table.amount.due"}), dataIndex: 'remainderMoney', key: 'remainderMoney' ,
                render(text,record) {
                    // const { reductionMoney } = record;
                    // const { hadPaidMoney } = record;
                    // const money = Number(text) - Number(reductionMoney) - Number(hadPaidMoney);
                    // return Number.isInteger(money) ? money : money.toFixed(2);
                    return convertMoneyFormat(text);;
                }
            },
            {
                title: props.intl.formatMessage({id :"page.table.reduce.amount"}),
                dataIndex: 'reductionMoney',
                key: 'reductionMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({id :"page.table.amount.paid"}),
                dataIndex: 'hadPaidMoney',
                key: 'hadPaidMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({id :"page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={_this.props.intl.formatMessage({id : "page.table.add.record"})}>
                                <span onClick={() => _this.showModal(record)}><Icon type={'plus'}/></span>
                            </Tooltip>
                        </div>
                    );
                }
            }
        ];
        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName'
          })
        }

    }

    onChange= (changedFields) => {
        this.setState(({ info }) => ({
            info: { ...info, ...changedFields },
        }));
    }

    showModal = (record) => {
        const { orderNo, userTrueName, userPhone, needPayMoney,reductionMoney, hadPaidMoney,remainderMoney, status } = record;
        const { changeModalVisible } = this.props;
        this.selectOrderNo = orderNo;
        this.setState({
            info: { ...getParams(), userPhone, userTrueName,reductionMoney, needPayMoney,remainderMoney, hadPaidMoney, status }
        }, () => {
            changeModalVisible(true);
        });
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current });
    }
    submit = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = obj;
        getTableData({ pageNum:1, pageSize: this.pageSize, ...this.searchParams });
    }

    handleOk = (obj) => {
        const params = { ...obj, orderNo: this.selectOrderNo };
        const { addTableRecord, getTableData, tableData: { pagination } } = this.props;
        const payTime = params['payTime'].format('YYYY-MM-DD HH:mm:ss');
        params['payTime'] = payTime;

        addTableRecord(params, () => {
            getTableData({ ...this.searchParams, pageNum: pagination['current'] || 1, pageSize: this.pageSize });
        });
    }
    handleCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }
    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({ data: [], pagination: {} });
    }
    render() {
        console.log(this.props)
        const { tableData: { data, pagination }, loading, btnLoading, visible } = this.props;
        return (
            <div>
                <SearchList submit={this.submit}/>
                <CommonTable
                    columns={this.columns}
                    handlePageChange={this.handlePageChange}
                    loading={loading}
                    pagination={pagination}
                    dataSource={data}
                />
                <AddModal onChange={this.onChange} handleOk={this.handleOk} handleCancel={this.handleCancel} info={this.state.info} visible={visible} modalLoading={btnLoading}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { paymentManageState: { addRefundState } } = state;
    return {
        tableData: addRefundState['tableData'],
        loading: addRefundState['loading'],
        visible: addRefundState['visible'],
        btnLoading: addRefundState['btnLoading']
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: addRefundAction.ardGetTableData,
        setTableData: addRefundAction.ardSetTableData,
        changeModalVisible: addRefundAction.ardChangeVisible,
        addTableRecord: addRefundAction.ardAddTableRecord
    }, dispatch);
}

AddRefund.PropTypes={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddRefund));
