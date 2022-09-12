import React, { Component } from 'react';
import { Icon, Tooltip, Popconfirm } from 'antd';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { recyclingListAction } from './index';
import CloseOrderModal from './CloseOrderModal/CloseOrderModal';
import CloseDetail from './CloseDetail/CloseDetail';
import SearchList from './SearchList/SearchList';
import styles from './RecyclingList.less';

const sendStatus = {
    "0": "邮寄中",
    "1": "已关闭"
};

const convertParams = (obj) => {
    const { time = '', userPhone = '', userName = '', orderNo = '', expressNo = '', status = '9', expressCompany ='' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
        userPhone,
        userName,
        orderNo,
        expressNo,
        status,
        expressCompany,
        typeTime: '1'
    };
}


class RecyclingList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            info: {
                refusedRemark: '',
                // reason: '1'
            }
        };
        this.pageSize = 10;
        const _this = this;
        //存储搜索参数
        this.searchParams = convertParams({});
        this.columns = [
            {
                title: '寄回时间',
                dataIndex: 'expressSendTime',
                key: 'expressSendTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
            { title: '姓名', dataIndex: 'userName', key: 'userName' },
            { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
            { title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel' },
            {
                title: '回收状态',
                dataIndex: 'status',
                key: 'status' ,
                render(text) {
                    return sendStatus[text] || '';
                }
            },
            { title: '快递公司', dataIndex: 'expressCompany', key: 'expressCompany' },
            { title: '快递单号', dataIndex: 'expressNo', key: 'expressNo' },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    const { status } = record;
                    const isClose = Number(status) === 1;
                    if(isClose) {
                        return (
                            <div className={styles.operator}>
                                <Tooltip title={'查看详情'}>
                                    <div className={styles.iconWrapper} onClick={() =>_this.lookDetail(text)}>
                                        <Icon type="file-text" />
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    }

                    return (
                        <div className={styles.operator}>
                            <Popconfirm title={'确认要收货吗？'} onConfirm={() =>_this.confirmOK(text)}>
                                <div className={styles.iconWrapper}>
                                    <Icon type="bulb" />
                                </div>
                            </Popconfirm>
                            <Tooltip title={'关闭物流信息'}>
                                <div className={styles.iconWrapper} onClick={() => _this.openCloseModal(text)}>
                                    <Icon type="close-circle-o" />
                                </div>
                            </Tooltip>
                        </div>
                    );
                }
            }
        ];

    }

    //确认收货
    confirmOK = (text) => {
        const { confirmReceive, getTableData } = this.props;
        confirmReceive({ id: text }, () => {
            getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams });
        });
    }
    //分页
    handlePageChange = (info) => {
        const { pageSize, current } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current });
    }
    //打开物流弹窗
    openCloseModal = (text) => {
        const { changeCloseModal, changeRowId } = this.props;
        changeRowId(text);
        changeCloseModal(true);
    }
    //关闭物流信息
    closeOrder = (obj) => {
        const { submitCloseReason, rowId, getTableData, changeCloseModal } = this.props;
        submitCloseReason({ ...obj, id: rowId }, () => {
            changeCloseModal(false);
            getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams });
        });
    }
    //查看详情
    lookDetail = (text) => {
        const { getDetailInfo } = this.props;
        getDetailInfo({ id:text });
    }
    //关闭弹窗
    closeModalCancel = () => {
        const { changeCloseModal } = this.props;
        changeCloseModal(false);
    }

    detailHandleCancel = () => {
        const { changeDetailVisible } = this.props;
        changeDetailVisible(false);
    }
    //搜索
    handleSearch = (obj) => {
        console.log(obj);
        const { getTableData } = this.props;
        const params = convertParams(obj);
        //存储搜索参数
        this.searchParams = params;
        getTableData({ ...params, pageNum: 1, pageSize: this.pageSize });

    }

    componentDidMount() {
        const { getTableData, getExpressCompany, getRefuseReason } = this.props;
        //获取快递公司
        getExpressCompany({});
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams});
        getRefuseReason({});
    }

    render() {
        const { tableData: { data, pagination }, loading, closeModalVisible, detailVisible, detailInfo, expressData, refuseReason } = this.props;
        const { info } = this.state;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} expressData={expressData}/>
                <CommonTable
                    pagination={pagination}
                    handlePageChange={this.handlePageChange}
                    loading={loading}
                    dataSource={data}
                    columns={this.columns}
                />
                <CloseOrderModal
                    handleOk={this.closeOrder}
                    handleCancel={this.closeModalCancel}
                    visible={closeModalVisible}
                    info={info}
                    refuseReason={refuseReason}
                />
                <CloseDetail info={detailInfo} visible={detailVisible} handleCancel={this.detailHandleCancel}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { recycleManageState: { recyclingListState } } = state;
    return {
        tableData: recyclingListState['tableData'],
        loading: recyclingListState['loading'],
        closeModalVisible: recyclingListState['visible'],
        detailVisible: recyclingListState['detailVisible'],
        detailInfo: recyclingListState['detailInfo'],
        rowId: recyclingListState['rowId'],
        expressData: recyclingListState['expressData'],
        refuseReason: recyclingListState['refuseReason']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: recyclingListAction.rilGetTableData,
        setTableData: recyclingListAction.rilSetTableData,
        changeCloseModal: recyclingListAction.rilChangeModal,
        changeDetailVisible: recyclingListAction.rilChangeDetailModal,
        confirmReceive: recyclingListAction.rilConfirmReceive,   //确认收货
        submitCloseReason: recyclingListAction.rilSubmitCloseReason,  //提交关闭原因
        getDetailInfo: recyclingListAction.rilGetModalDetail,  //获取列表详情
        changeRowId: recyclingListAction.rilChangeTableRowId,
        getExpressCompany: recyclingListAction.rilGetExpressCompany,
        getRefuseReason: recyclingListAction.rilGetRefuseReason
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecyclingList);