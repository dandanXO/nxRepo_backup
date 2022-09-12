import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Upload, Icon, message } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import UploadModal from './UploadModal/UploadModal';
import { waitDistributeAction } from './index';
import styles from './WaitDistribute.less';

const iCloudState = {
    1: '待分配',
    2: '已分配',
    3: '作废'
}
const activeState = {
    0: '未激活',
    1: '已激活'
};

const convertParams = (obj) => {
    const { time = [], icloudNo = '', allocationOrderNo = '', state = '', actived = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
        icloudNo,
        allocationOrderNo,
        state,
        actived
    };

}

class AlreadyDistribute extends Component{
    columns = [
        {
            title: 'iCloud账号',
            key: 'icloudNo',
            dataIndex: 'icloudNo'
        },
        {
            title: '密码',
            key: 'icloudPwd',
            dataIndex: 'icloudPwd'
        },
        {
            title: '添加时间',
            key: 'addTime',
            dataIndex: 'addTime',
            render(text) {
                return moment(Number(text) * 1000).format('YYYY-MM-DD: HH:mm:ss');
            }
        },
        {
            title: '新密码',
            key: 'icloudPwdNew',
            dataIndex: 'icloudPwdNew',
            render(text){
                return text || '无';
            }
        },
        {
            title: '已分配订单号',
            key: 'allocationOrderNo',
            dataIndex: 'allocationOrderNo',
        },
        {
            title: '分配时间',
            key: 'allocationTime',
            dataIndex: 'allocationTime',
            render (text) {
                return text ? moment(Number(text) * 1000).format('YYYY-MM-DD: HH:mm:ss') : '无'
            }
        },
        {
            title: '账号状态',
            key: 'state',
            dataIndex: 'state',
            render(text) {
                return iCloudState[text];
            }
        },
        {
            title: "激活状态",
            key: 'actived',
            dataIndex: 'actived',
            render(text) {
                return activeState[text];
            }
        }

    ]

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            uploadDisabled: false
        };
        this.pageSize = 10;
        this.uploadLoading = null;
        this.searchParams = convertParams({});
    }
    //上传icloud
    uploadICloud = () => {
        const { changeVisible } = this.props;
        changeVisible(true);
    }
    //上传modal取消
    handleCancel = () => {
        const { changeVisible } = this.props;
        changeVisible(false);
    }
    //上传modal确认
    handleOK = (obj) => {
        const { postUpload } = this.props;
        postUpload(obj['text']);
    }
    //分页
    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchParams});
    }
    //excel上传
    handleUploadChange = ({ file }) => {
        const { getTableData } = this.props;
        if(!this.uploadLoading) {
            this.uploadLoading = message.loading('正在上传，请稍候!', 0);
        }

        if(file.status === 'done') {
            this.uploadLoading && this.uploadLoading();
            this.uploadLoading = null;
            message.success('上传成功');
            getTableData({ pageNum: 1, pageSize: this.pageSize });
        }
        if(file.status === 'error') {
            this.uploadLoading && this.uploadLoading();
            this.uploadLoading = null;
            message.error('上传失败');
        }
    }
    //上传之前校验
    beforeUpload = (file) => {
        const isExcel = /(\.xlsxx?)$/.test(file.name);
        if(!isExcel) {
            message.error('上传格式错误');
        }
        return isExcel;
    }

    //搜索
    handleSearch = (obj) => {
        const params = convertParams(obj);
        const { getTableData } = this.props;
        this.searchParams = params;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...params });
    }
    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams });
    }
    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }



    render() {
        const { modalBtnLoading, modalVisible, tableData: { data, pagination }, loading } = this.props;
        const { text } = this.state;
        return (
            <div>
                <div>
                    <SearchList handleSearch={this.handleSearch}/>
                    <div className={styles.listWrapper}>
                        <Button type={'primary'} className={styles.uploadBtn} onClick={this.uploadICloud}>上传iCloud帐号</Button>
                    </div>

                    <div className={styles.listWrapper}>
                        <Upload
                            action={'/hs/admin/icloud/uploadIcloudExcel'}
                            onChange={this.handleUploadChange}
                            beforeUpload={this.beforeUpload}
                            disabled={this.state.uploadDisabled}
                            showUploadList={false}
                        >
                            <Button type={'primary'}>
                                <Icon type="upload" /> excel上传
                            </Button>
                        </Upload>
                    </div>

                </div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                />
                <UploadModal
                    loading={modalBtnLoading}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOK}
                    text={text}
                    visible={modalVisible}
                />
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    const { iCloudAccountManageState: { waitDistributeState } } = state;
    return {
        modalBtnLoading: waitDistributeState['modalBtnLoading'],
        modalVisible: waitDistributeState['visible'],
        tableData: waitDistributeState['data'],
        loading: waitDistributeState['loading']
    }
}
const mapStateToDispatch = (dispatch) => {
    return bindActionCreators({
        changeVisible: waitDistributeAction.wdbChangeModalVisible,
        // changeBtnLoading: waitDistributeAction.wdbChangeModalLoading
        postUpload: waitDistributeAction.wdbUploadIcloud,
        getTableData: waitDistributeAction.wdbGetTableData,
        setTableData: waitDistributeAction.wdbSetTableData
    }, dispatch)
}
export default connect(mapStateToProps, mapStateToDispatch)(AlreadyDistribute);

