import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { overOrderHandleAction } from './index';
import moment from 'moment';
import { Tooltip, Icon } from 'antd';
import { CommonTable } from 'components';
import styles from './OverOrderHandle.less';
import SearchList from './SearchList/SearchList';
import OverOrderHandleModal from './OverOrderHandleModal/OverOrderHandleModal';
import { orderStatus } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';

const getParams = () => {
    return {
        remark: {
            value: ''
        },
        smsCode: {
            value: ''
        }
    };
}

class overOrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: getParams()
        };
        const _this = this;
        //当前选中的订单号
        this.selectOrderNo = '';
        this.pageSize = 10;
        this.searchParams = {};
        this.columns = [
            {
                title: props.intl.formatMessage({id : "page.table.loan.time"}),
                dataIndex: 'loanTime',
                key: 'loanTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({id : "page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo' },
            { title: props.intl.formatMessage({id : "page.search.list.name"}), dataIndex: 'userTrueName', key: 'userTrueName' },
            { title: props.intl.formatMessage({id : "page.search.list.mobile"}), dataIndex: 'userPhone', key: 'userPhone' },
            { title: props.intl.formatMessage({id : "page.table.contract.amount"}), dataIndex: 'deviceMoney', key: 'deviceMoney' },
            {
                title: props.intl.formatMessage({id : "page.search.list.order.status"}),
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return orderStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.due.time"}),
                dataIndex: 'expireTime',
                key: 'expireTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({id : "page.table.days.overdue"}), dataIndex: 'expireDay', key: 'expireDay'},
            { title: props.intl.formatMessage({id : "page.table.reduce.amount"}), dataIndex: 'reductionMoney', key: 'reductionMoney' },
            { title: props.intl.formatMessage({id : "page.table.amount.paid"}), dataIndex: 'hadPaidMoney', key: 'hadPaidMoney' },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={_this.props.intl.formatMessage({id : "page.table.add.record"})}>
                                <span onClick={() => _this.showModal(record)}><Icon type={'edit'}/></span>
                            </Tooltip>
                        </div>
                    );
                }
            }
        ];
    }

    onChange= (changedFields) => {
        this.setState(({ info }) => ({
            info: { ...info, ...changedFields },
        }));
    }

    showModal = (record) => {
        const { orderNo, userTrueName, userPhone,expireDay,loginUserPhone, needPayMoney,deviceMoney,reductionMoney,remainderMoney,overDueMoney, hadPaidMoney, status } = record;
        const { changeModalVisible } = this.props;
        this.selectOrderNo = orderNo;
        this.setState({
            info: { ...getParams(),orderNo, userPhone, expireDay,loginUserPhone,userTrueName,deviceMoney,reductionMoney,remainderMoney,overDueMoney, needPayMoney, hadPaidMoney, status }
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
        console.log("this.searchParams:" + JSON.stringify(this.searchParams));
        getTableData({ pageNum:1, pageSize: this.pageSize, ...this.searchParams });
    }

    handleOk = (obj) => {
        const params = { ...obj, orderNo: this.selectOrderNo };
        const { addTableRecord, getTableData, tableData: { pagination } } = this.props;
        addTableRecord(params, () => {
            getTableData({ userTrueName:'',userPhone:'',orderNo:'', pageNum: pagination['current'] || 1, pageSize: this.pageSize });
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
                <OverOrderHandleModal onChange={this.onChange} handleOk={this.handleOk} handleCancel={this.handleCancel} info={this.state.info} visible={visible} modalLoading={btnLoading}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { paymentManageState: { overOrderHandleState } } = state;
    return {
        tableData: overOrderHandleState['tableData'],
        loading: overOrderHandleState['loading'],
        visible: overOrderHandleState['visible'],
        btnLoading: overOrderHandleState['btnLoading']
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overOrderHandleAction.orEdGetTableData,
        setTableData: overOrderHandleAction.orEdSetTableData,
        changeModalVisible: overOrderHandleAction.orEdChangeVisible,
        addTableRecord: overOrderHandleAction.orEdAddTableRecord
    }, dispatch);
}

overOrderEdit.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(overOrderEdit));