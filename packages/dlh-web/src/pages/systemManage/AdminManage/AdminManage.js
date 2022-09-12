import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable } from 'components';
import SerachList from './SearchList/SearchList';
import { adminManageAction } from './index';

class AdminManage extends Component {

    columns = [
        { title: '用户名称', dataIndex: 'name', key: 'name' },
        { title: '真实姓名', dataIndex: 'realName', key: 'realName' },
        { title: '添加时间', dataIndex: 'addTime', key: 'addTime' },
        { title: '是否启用', dataIndex: 'isUse', key: 'isUse' },
        { title: '当前角色', dataIndex: 'currentRole', key: 'currentRole' }
    ]
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        return(
            <div>
                <SerachList/>
                <CommonTable
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    columns={this.columns}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { systemManageState: { adminManageState } } = state;
    return {
        tableData: adminManageState['data'],
        loading: adminManageState['loading']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: adminManageAction.amgGetTableData,
        setTableData: adminManageAction.amgSetTableData
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManage);