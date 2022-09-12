import React, { Component } from 'react';
import { Icon, Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { CommonTable } from 'components';
import { deviceListAction } from './index';
import { bindActionCreators } from "redux";
import styles from './DeviceList.less';
import DeviceModal from './DeviceModal/DeviceModal';
class DeviceList extends Component {

    constructor(props) {
        super(props);
        const _this = this;
        this.columns = [
            {
                title: '设备型号',
                dataIndex: 'deviceType',
                key: 'deviceType'
            },
            {
                title: '设备闪存大小',
                dataIndex: 'memoryNum',
                key: 'memoryNum'
            },
            {
                title: '最大额度',
                dataIndex: 'maxAmount',
                key: 'maxAmount'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '是否启动',
                dataIndex: 'isUse',
                key: 'isUse'
            },
            {
                title: '操作',
                dataIndex: 'id',
                width: '130px',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.operatorWrapper}>
                            <span onClick={(record) => _this.handleEdit(record)}>
                                <Icon type={'edit'}/>
                            </span>
                            <Popconfirm title={'确认要删除吗?'} onConfirm={(record) => _this.handleDelete(record)}>
                                <span>
                                    <Icon type={'delete'}/>
                                </span>
                            </Popconfirm>


                        </div>
                    );
                }

            }

        ];
        this.state = {
            // visible: false
        };
    }

    handleEdit = (record) => {
        const { changeFormData, changeModalVisible } = this.props;
        changeFormData({
            deviceType: Math.random(),
            memoryNum: Math.random(),
            maxAmount: Math.random(),
            isUse: false
        });
        changeModalVisible(true);
    }
    handleDelete = (record) => {
        console.log('aaaa');
    }
    addDeviceList = () => {
        const { changeFormData, changeModalVisible } = this.props;
        changeFormData({
            deviceType: '',
            memoryNum: '',
            maxAmount: '',
            isUse: false
        });
        changeModalVisible(true);
    }

    handleCancel = () => {
        const { changeModalVisible } =  this.props;
        changeModalVisible(false);
    }
    handleOK = (obj) => {
        console.log(obj);
        const { changeModalVisible } =  this.props;
        changeModalVisible(false);
    }


    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({});
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    render() {
        const { tableData: { data, pagination }, loading, formData, visible } = this.props;
        return (
            <div>
                <div className={styles.btnWrapper}><Button icon={'plus'} type={'primary'} onClick={this.addDeviceList}>添加设备列表</Button></div>
                <CommonTable columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <DeviceModal
                    handleOk={this.handleOK}
                    handleCancel={this.handleCancel}
                    formData={formData}
                    visible={visible}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { paramsManageState: { deviceListState} } = state;
    return {
        tableData: deviceListState['data'],
        loading: deviceListState['loading'],
        formData: deviceListState['formData'],
        visible: deviceListState['visible']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: deviceListAction.dlGetTableData,
        setTableData: deviceListAction.dlSetTableData,
        changeFormData: deviceListAction.dlChangeFormData,
        changeModalVisible: deviceListAction.dlChangeModalVisible
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);