import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'antd';
import moment from 'moment';
import { CommonTable } from 'components';
import { waitQualityCheckAction } from './index';
import CheckModal from './CheckModal/CheckModal';
import SearchList from './SearchList/SearchList';
import styles from './WaitQualityCheck.less';

const convertParams = (obj) => {
    const { time = '', userPhone = '', userName = '', orderNo = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
        userPhone,
        userName,
        orderNo,
        typeTime: '2',
        status: '2'
    };
}


class WaitQualityCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
        const _this = this;
        this.searchParams = convertParams({});
        this.pageSize = 10;
        this.columns = [
            {
                title: '签收时间',
                dataIndex: 'expressReceiveTime',
                key: 'expressReceiveTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
            { title: '姓名', dataIndex: 'userName', key: 'userName' },
            { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
            { title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel' },
            // {
            //     title: '回收状态',
            //     dataIndex: 'status',
            //     key: 'status' ,
            //     render(text) {
            //         return sendStatus[text] || '';
            //     }
            // },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.iconWrapper} onClick={() => _this.openModal(record)}>
                            <Icon type="form" />
                        </div>
                    );
                }
            }
        ];
    }
    //打开modal
    openModal = (record) => {
        const { id, deviceMoney } = record;
        const { changeModalVisible, changeRowId } = this.props;
        //deviceMoney * 0.25 === 尾款
        let realMoney = Number(deviceMoney) * 0.2;
        realMoney = Number.isInteger(realMoney) ? realMoney : realMoney.toFixed(2);
        changeRowId(id);
        this.setState({
            info: { ...this.state.info, money: realMoney }
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
        const { submitCheckResult, rowId, getTableData, changeModalVisible } = this.props;
        submitCheckResult({ ...obj, id: rowId }, () => {
            changeModalVisible(false);
            getTableData({ ...this.searchParams, pageNum: 1, pageSize: this.pageSize });
        })
    }
    //搜索
    handleSearch = (obj) => {
        console.log(obj)
        const { getTableData } = this.props;
        const params = convertParams(obj);
        //存储搜索参数
        this.searchParams = params;
        getTableData({ ...params, pageNum: 1, pageSize: this.pageSize });
    }

    //分页
    handlePageChange = (info) => {
        const { pageSize, current } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams});
    }

    render() {
        const { tableData: { data, pagination }, loading, visible } = this.props;
        const { info } = this.state;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <CheckModal handleCancel={this.handleCancel} visible={visible} info={info} handleOk={this.handleOk}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { recycleManageState: { waitQualityCheckState } } = state;
    return {
        tableData: waitQualityCheckState['tableData'],
        loading: waitQualityCheckState['loading'],
        visible: waitQualityCheckState['visible'],
        rowId: waitQualityCheckState['rowId']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: waitQualityCheckAction.wqcGetTableData,
        setTableData: waitQualityCheckAction.wqcSetTableData,
        changeModalVisible: waitQualityCheckAction.wqcChangeModalVisible,
        changeRowId: waitQualityCheckAction.wqcChangeRowId,
        submitCheckResult: waitQualityCheckAction.wqcSubmitCheckResult
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(WaitQualityCheck);

