import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'antd';
import moment from 'moment';
import { CommonTable } from 'components';
import { waitFollowAction } from './index';
import FollowModal from './FollowModal/FollowModal';
import styles from './WaitFollow.less';
import {convertMoneyFormat} from "utils";

const checkStatus = {
    "3": "质检通过",
    "4": "质检不通过"
}

class WaitFollow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: {
                operator: '6'
            },
            isShowRadio: true  //默认显示modal框中的提交放款
        };
        const _this = this;
        this.serarchParams = {
            timeType: '3',
            status: '10'
        };
        this.pageSize = 10;
        this.columns = [
            {
                title: '质检完成时间',
                dataIndex: 'goodsInspectTime',
                key: 'goodsInspectTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
            { title: '姓名', dataIndex: 'userName', key: 'userName' },
            { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
            { title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel' },
            {
                title: '手机估值',
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: '质检结果',
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return checkStatus[text] || '';
                }
            },
            {
                title: '扣除尾款',
                dataIndex: 'deductMoney',
                key: 'deductMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: '剩余尾款',
                dataIndex: 'restMoney',
                key: 'restMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            { title: '质检备注', dataIndex: 'goodsInspectRemark', key: 'goodsInspectRemark' },
            { title: '质检人', dataIndex: 'goodsInspector', key: 'goodsInspector' },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.iconWrapper} onClick={() => _this.openModal(text, record)}>
                            <Icon type="file-add" />
                        </div>
                    );
                }
            }
        ];
    }
    //打开modal
    openModal = (id, record) => {
        const { changeModalVisible, changeRowId } = this.props;
        const { status } = record;
        const isCheckSuccess = Number(status) === 3;
        changeRowId(id);
        this.setState(prevState => {
            return {
                info: {
                    ...prevState.info,
                    operator: isCheckSuccess ? '6' : '5'
                },
                isShowRadio: isCheckSuccess
            }
        }, () => {
            changeModalVisible(true);
        });


    }
    handleCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }
    handleOk = (obj) => {
        console.log(obj);
        const { getTableData, submitResult, rowId, changeModalVisible } = this.props;
        submitResult({ ...obj, id: rowId }, () => {
            changeModalVisible(false);
            getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.serarchParams });
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
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.serarchParams });
    }

    render() {
        const { tableData: { data, pagination }, loading, visible } = this.props;
        const { info, isShowRadio } =  this.state;
        return (
            <div>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <FollowModal isShowRadio={isShowRadio} handleOk={this.handleOk} info={info} visible={visible} handleCancel={this.handleCancel}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { recycleManageState: { waitFollowState } } = state;
    return {
        tableData: waitFollowState['tableData'],
        loading: waitFollowState['loading'],
        visible: waitFollowState['visible'],
        rowId: waitFollowState['rowId']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: waitFollowAction.wfwGetTableData,
        setTableData: waitFollowAction.wfwSetTableData,
        changeModalVisible: waitFollowAction.wfwChangeModalVisible,
        changeRowId: waitFollowAction.wfwChangeRowId,
        submitResult: waitFollowAction.wfwSubmitResult
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitFollow);