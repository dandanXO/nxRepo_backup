import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { CommonTable } from 'components';
import styles from './WaitSalesReturn.less';
import { waitSalesReturnAction } from './index';
import OperateModal from './OperateModal/OperateModal';
import moment from 'moment';

class WaitSalesReturn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
        const _this = this;
        this.pageSize = 10;
        this.searchParams = {
            status: '7'
        };
        this.columns = [
            // {
            //     title: '退回时间',
            //     dataIndex: 'goodsRefundTime',
            //     key: 'goodsRefundTime',
            //     render(text) {
            //         if(!text) {
            //             return '';
            //         }
            //         return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            //     }
            // },
            { title: '订单号',dataIndex: 'orderNo', key: 'orderNo' },
            { title: '姓名', dataIndex: 'userName', key: 'userName' },
            { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
            { title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel' },
            { title: '回收状态', dataIndex: 'status', key: 'status' },
            { title: '备注', dataIndex: 'customerDealRemak', key: 'customerDealRemak' },
            { title: '提交人', dataIndex: 'customerWaiter', key: 'customerWaiter' },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text) {
                    return (
                        <div className={styles.iconWrapper} onClick={() => _this.openModal(text)}>
                            <Icon type="wallet" />
                        </div>
                    );
                }
            }
        ];
    }
    //打开弹窗
    openModal = (id) => {
        const { changeModalVisible, changeRowId } = this.props;
        changeRowId(id);
        changeModalVisible(true);
    }
    handleCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }
    handleOk = (obj) => {
        const { getTableData, submitResult, rowId, changeModalVisible } = this.props;
        submitResult({ ...obj, id: rowId }, () => {
            changeModalVisible(false);
            getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams });
        })
    }

    //分页
    handlePageChange = (info) => {
        const { pageSize, current } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams });
    }

    render() {
        const { tableData: { data, pagination }, loading, visible } = this.props;
        const { info } = this.state;
        return (
            <div>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <OperateModal handleCancel={this.handleCancel} visible={visible} info={info} handleOk={this.handleOk}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { recycleManageState: { waitSalesReturnState } } = state;
    return {
        tableData: waitSalesReturnState['tableData'],
        loading: waitSalesReturnState['loading'],
        visible: waitSalesReturnState['visible'],
        rowId: waitSalesReturnState['rowId']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: waitSalesReturnAction.wsrGetTableData,
        setTableData: waitSalesReturnAction.wsrSetTableData,
        changeModalVisible: waitSalesReturnAction.wsrChangeModalVisible,
        submitResult: waitSalesReturnAction.wsrSalesReturn,
        changeRowId: waitSalesReturnAction.wsrChangeRowId
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitSalesReturn);