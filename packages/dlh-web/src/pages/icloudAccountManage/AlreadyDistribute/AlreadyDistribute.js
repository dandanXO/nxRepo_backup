import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Popconfirm, Icon, Tooltip } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import { alreadyDistributeAction } from "./index";
import styles from './AlreadyDistribute.less';

const convertParams = (obj) => {
    const { time = [], icloudNo = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
        icloudNo
    };
}


class AlreadyDistribute extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.pageSize = 10;
        this.searchParams = convertParams({});
        const _this = this;
        this.columns = [
            {
                title: '结清时间',
                key: 'payTime',
                dataIndex: 'payTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
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
                title: '新密码',
                key: 'icloudPwdNew',
                dataIndex: 'icloudPwdNew'
            },
            {
                title: '操作',
                key: 'id',
                dataIndex: 'id',
                render(text) {
                    return (
                        <Popconfirm title={'确认要修改密码吗？'} onConfirm={() => _this.onConfirm(text)}>
                            <div className={styles.iconWrapper}>
                                <Icon type={'edit'}/>
                            </div>
                        </Popconfirm>
                    );
                }
            }
        ]
    }

    onConfirm = (text) => {
        const { setNewPassword, getTableData,  tableData: { pagination } } = this.props;
        setNewPassword(text, () => {
            getTableData({pageNum: pagination['current'], pageSize: this.pageSize, ...this.searchParams});
        });
    }
    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchParams});
    }
    handleSearch = (obj) => {
        const params = convertParams(obj);
        const { getTableData } = this.props;
        this.searchParams = params;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...params });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams });
    }
    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <CommonTable
                    columns={this.columns}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    dataSource={data}
                />
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    const { iCloudAccountManageState: { alreadyDistributeState } } = state;
    return {
        tableData: alreadyDistributeState['tableData'],
        loading: alreadyDistributeState['loading']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: alreadyDistributeAction.adbGetTableData,
        setTableData: alreadyDistributeAction.adbSetTableData,
        setNewPassword: alreadyDistributeAction.adbSetNewPassword
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AlreadyDistribute);

