import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { roleManageAction } from "./index";
import { CommonTable } from 'components';
import { Icon, Popconfirm, Button } from 'antd';
import styles from './RoleManage.less';
import AddModal from './AddModal/AddModal';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


class RoleManage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
        this.modifyId = '';
        const _this = this;
        this.columns = [
            { title: props.intl.formatMessage({id : "page.table.role.name"}), dataIndex: 'name', key: 'name' },
            { title: props.intl.formatMessage({id : "page.table.description"}), dataIndex: 'desc', key: 'desc' },
            {
                title:  props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width: '200px',
                render(text, record) {
                    if(Number(text) === 1) {
                        return '';
                    }
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() => _this.modifyList(text,record)}><Icon type={'edit'}/></span>
                            <Popconfirm title={_this. props.intl.formatMessage({id : "windowPage.confirm.delete"})} onConfirm={() =>  _this.removeList(text)}>
                                <span><Icon type={'delete'}/></span>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }

    modifyList = (text, record) => {
        this.modifyId = text;
        const { changeModalVisible, menuList } = this.props;
        const { roleMenuIds, name, desc , assignRoles} = record;
        let idsArr = roleMenuIds ? roleMenuIds.split(',') : [], realIdsArr = [];
        let assignRoleIds = assignRoles ? assignRoles.split(',') : [];
        for(let i = 0, len = idsArr.length; i < len; i++) {
            const isFind = menuList.find(item => String(item.id) === String(idsArr[i]));
            if(isFind) {
                if(String(isFind['pId']) === '0') {
                    //找到该pid下面所有的菜单和列表返回的菜单比较
                    const allPidList = menuList.filter(item => String(item.pId) === String(idsArr[i]));
                    const isAllin = allPidList.every(item => idsArr.indexOf(String(item)) !== -1);
                    if(isAllin) {
                        realIdsArr.push(idsArr[i]);
                    }
                } else {
                    realIdsArr.push(idsArr[i]);
                }
            }
        }
        const info = {
            name,
            desc,
            menuIds: realIdsArr,
            assignRoles: assignRoleIds
        };
        this.setState({ info }, () => {
            changeModalVisible(true);
        })
    }
    removeList = (text) => {
        const { deleteRoleList } = this.props;
        deleteRoleList({ id: text });
    }
    addRole = () => {
        const { changeModalVisible } = this.props;
        this.modifyId = '';
        this.setState({
            info: {}
        }, () => {
            changeModalVisible(true);
        });
    }


    handleCancel = () => {
        this.modifyId = '';
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }
    handleOk = (obj) => {
        const { menuList, addRoleList, modifyRoleList } = this.props;
        const { menuIds, assignRoles } = obj;
        let ids = [''];
        if(Array.isArray(menuIds)) {
            ids = [...menuIds];
            for(let i = 0, len = menuIds.length; i < len; i++) {
                const isFind = menuList.find(item => String(item.id) === menuIds[i]);
                if(isFind && String(isFind['pId']) !== '0' && ids.indexOf(String(isFind['pId'])) === -1) {
                    ids.push(String(isFind['pId']));
                }
            }
        }
        const params = { ...obj, menuIds: ids.join(','), assignRoles: assignRoles.join(',') };
        console.log(params)
        if(this.modifyId === '') {
            addRoleList(params);
            return;
        }
        modifyRoleList({ ...params, id: this.modifyId });
    }
    componentDidMount() {
        const { getTableData, getMenuList } = this.props;
        getTableData({});
        getMenuList({});
    }

    render() {
        const { tableData, loading, visible, menuList } = this.props;
        const roleIdsData = [];
        tableData.map(item => {
            if (item.id != 1) {
                roleIdsData.push(<Option key={item.id}>{item.name}</Option>);
            }
        })

        for (var k in menuList) {
            menuList[k].label = this.props.intl.formatMessage({ id: menuList[k].label.trim() })
        }
        return (
            <div>
                <div><Button onClick={this.addRole} type={'primary'}><FormattedMessage id="page.table.add.role" /></Button></div>
                <CommonTable columns={this.columns} dataSource={tableData} loading={loading} pagination={null}/>
                <AddModal
                    treeData={menuList}
                    assignRolesData={roleIdsData}
                    visible={visible}
                    info={this.state.info}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { systemManageState: { roleManageState } } = state;
    return {
        tableData: roleManageState['tableData'],
        loading: roleManageState['loading'],
        visible: roleManageState['visible'],
        menuList: roleManageState['menuList']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: roleManageAction.rlmGetTableData,
        setTableData: roleManageAction.rlmSetTableData,
        changeModalVisible: roleManageAction.rlmChangeModalVisible,
        getMenuList: roleManageAction.rlmGetMenuList,
        addRoleList: roleManageAction.rlmAddRoleList,
        modifyRoleList: roleManageAction.rlmUpdateRoleList,
        deleteRoleList: roleManageAction.rlmDelRoleList
    }, dispatch);
}

RoleManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RoleManage));