import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable } from 'components';
import { scheduleJobManageAction } from "./index";
import AddModal from './AddModal/AddModal';
import { Button, Icon, Popconfirm } from 'antd';
import styles from './ScheduleJobManage.less';
import SearchList from './SearchList/SearchList';

const jobStatus = {
    1: '运行',
    2: '暂停'
}

class ScheduleJobManage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
        this.pageSize = 10;
        this.modifyId = '';
        this.searchParams = {};
        const _this = this;
        this.columns = [
            { title: '任务名称', dataIndex: 'jobName', key: 'jobName' },
            { title: '任务类名', dataIndex: 'beanName', key: 'beanName' },
            { title: '任务表达式', dataIndex: 'cronExpression', key: 'cronExpression' },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return jobStatus[text];
                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() =>_this.editTreeList(record)}><Icon type={'edit'}/></span>
                            <Popconfirm title={'确认要删除吗？'} onConfirm={() => _this.deleteTreeList(text)}>
                                <span><Icon type={'delete'}/></span>
                            </Popconfirm>
                            <Popconfirm title={'确认要立即执行该任务吗？'} onConfirm={() => _this.executeTreeList(text)}>
                                <span><Icon type={'play-circle'}/></span>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }


    addScheduleJob = () => {
        const { changeModalVisible} = this.props;
        this.modifyId = '';
        const info = {
            jobName: '',
            beanName: '',
            cronExpression: '',
            status: 1
        }
        this.setState({ info }, () => {
            changeModalVisible(true);
        })

    }

    editTreeList = (record) => {
        const { changeModalVisible } = this.props;
        const { id, jobName, beanName, cronExpression, status} = record;
        this.modifyId = id;
        const info = {
            jobName,
            beanName,
            cronExpression,
            status
        };
        console.log(info);
        this.setState({ info }, () => {
            changeModalVisible(true);
        })

    }

    deleteTreeList = (id) => {
        const { deleteScheduleJobData, getTableData } = this.props;
        deleteScheduleJobData({ id }, () => {
            getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
        })
    }

    executeTreeList = (id) => {
        const { executeScheduleJobData } = this.props;
        executeScheduleJobData({ id }, () => {

        })
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ pageNum: current, pageSize, ...this.searchParams });

    }

    handleOk = (obj) => {
        const { addScheduleJobData, getTableData, updateScheduleJobData } = this.props;

        const callback = () =>{
            getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
        }

        if(this.modifyId === '') {
            addScheduleJobData(obj, callback);
            return;
        }
        updateScheduleJobData({ ...obj, id: this.modifyId }, callback);

    }
    handleCancel = () => {
        const { changeModalVisible } = this.props;
        this.modifyId = '';
        changeModalVisible(false);
    }
    submit = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = obj;
        getTableData({ ...obj, pageSize: this.pageSize, pageNum: 1 })
    }
    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    render() {
        const { tableData: { data, pagination }, loading, visible } = this.props;
        return (
            <div>
                <SearchList submit={this.submit} />
                <div><Button type={'primary'} onClick={this.addScheduleJob}>添加任务</Button></div>
                <CommonTable columns={this.columns} dataSource={data} pagination={pagination} loading={loading} handlePageChange={this.handlePageChange}/>
               <AddModal
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    info={this.state.info}
                    visible={visible}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { systemManageState: { scheduleJobManageState } } = state;
    return {
        tableData: scheduleJobManageState['tableData'],
        loading: scheduleJobManageState['loading'],
        visible: scheduleJobManageState['visible']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: scheduleJobManageAction.sjGetTableData,
        setTableData: scheduleJobManageAction.sjSetTableData,
        changeModalVisible: scheduleJobManageAction.sjChangeModalVisible,
        addScheduleJobData: scheduleJobManageAction.sjAddScheduleJobList,
        updateScheduleJobData: scheduleJobManageAction.sjUpdateScheduleJobList,
        deleteScheduleJobData: scheduleJobManageAction.sjDelScheduleJobList,
        executeScheduleJobData: scheduleJobManageAction.sjExecuteScheduleJob
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleJobManage);