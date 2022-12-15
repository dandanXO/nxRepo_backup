import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonTable} from 'components';
import {peopleManageAction} from "./index";
import AddModal from './AddModal/AddModal';
import {Button, Icon, Popconfirm} from 'antd';
import styles from './PeopleManage.less';
import SearchList from './SearchList/SearchList';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from "react-intl";
import {
  getAdminUser,
  getAdminUserInfo,
  getAllMerchants,
  getHasCollectionManagement,
  getIsSuperAdmin
} from "../../../../utils";
import Cookies from "js-cookie";

const userStatus = {
    0: <FormattedMessage id="page.search.list.freeze"/>,
    1: <FormattedMessage id="page.search.list.normal"/>
}

const googleStatus = {
    1: <FormattedMessage id="page.table.enabled"/>,
    0: <FormattedMessage id="page.search.list.disable"/>
}

class PeopleManage extends Component {
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        const adminUserInfo = getAdminUser();

        const hasCollectionManagement = adminUserInfo.data.roleId === 1 || adminUserInfo.data.roleId === 21;

        this.state = {
            isSuperAdmin,
            allMerchants,
            hasCollectionManagement,
            info: {
              departmentId: 2,
            },
        };
        this.pageSize = 10;
        this.modifyId = '';
        this.searchParams = {};
        const _this = this;
        this.columns = [
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'trueName', key: 'trueName' },
            { title: props.intl.formatMessage({ id: "page.search.list.account" }), dataIndex: 'userName', key: 'userName' },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'phoneNo', key: 'phoneNo' },
            { title: props.intl.formatMessage({ id: "page.table.collect-team" }), dataIndex: 'collectTeamName', key: 'collectTeamName' },
            { title: props.intl.formatMessage({ id: "page.table.collect-group" }), dataIndex: 'collectGroupName', key: 'collectGroupName' },
            { title: props.intl.formatMessage({ id: "page.search.list.roles" }), dataIndex: 'roleStr', key: 'roleStr', width: '23%' },
            {
                title: props.intl.formatMessage({ id: "page.search.list.status" }),
                dataIndex: 'enabled',
                key: 'enabled',
                width: '6%',
                render(text) {
                    return userStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.google.auth" }),
                dataIndex: 'googleAuthFlag',
                key: 'googleAuthFlag',
                width: '8%',
                render(text) {
                    return googleStatus[text];
                }
            }
        ];
        if(hasCollectionManagement) {
          this.columns.push({
            title: props.intl.formatMessage({ id: "page.table.operation" }),
            dataIndex: 'id',
            key: 'id',
            width: '8%',
            render(text, record) {
              return (
                <div className={styles.btnWrapper}>
                  <span onClick={() => _this.editTreeList(record)}><Icon type={'edit'} /></span>
                  <Popconfirm title={_this.props.intl.formatMessage({ id: "windowPage.confirm.delete" })} onConfirm={() => _this.deleteTreeList(text)}>
                    <span><Icon type={'delete'} /></span>
                  </Popconfirm>
                </div>
              );
            }
          })
        }
        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName'
          })
        }
    }


    addPeople = () => {
        const { changeModalVisible, departmentData, roleData, teamsData, getGroupsData } = this.props;
        this.modifyId = '';
        const info = {
            userName: '',
            trueName: '',
            phoneNo: '',
            departmentId: departmentData.length > 0 ? departmentData[0].id : '',
            roleId: roleData.length > 0 ? roleData[0].id : '',
            enabled: 1,
            googleAuthFlag: 0
        }
        this.setState({ info }, () => {
            getGroupsData('', '');
            changeModalVisible(true);
        })

    }
    editTreeList = (record) => {
        const { changeModalVisible, getGroupsData } = this.props;
        const { id, departmentId, roleId, trueName, userName, enabled, phoneNo, googleAuthFlag, password, passwordLogin, collectTeamId, collectGroupId } = record;
        this.modifyId = id;
        const teamId = collectTeamId === null ? "" : collectTeamId;
        const groupId = collectGroupId === null ? "" : collectGroupId;
        const info = {
            departmentId,
            roleId,
            trueName,
            userName,
            enabled,
            phoneNo,
            googleAuthFlag,
            passwordLogin,
            password,
        };
        this.setState({ info }, () => {
            getGroupsData(teamId, groupId);
            changeModalVisible(true);
        })

    }

    deleteTreeList = (id) => {
        const {deletePeopleData, getTableData} = this.props;
        deletePeopleData({id}, () => {
            getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
        })
    }

    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchParams});

    }

    handleOk = (obj) => {
        const {addPeopleData, getTableData, updatePeopleData} = this.props;

        const callback = () => {
            getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
        }

        if (this.modifyId === '') {
            addPeopleData(obj, callback);
            return;
        }
        updatePeopleData({...obj, id: this.modifyId}, callback);

    }
    handleCancel = () => {
        const {changeModalVisible} = this.props;
        this.modifyId = '';
        changeModalVisible(false);
    }
    submit = (obj) => {
        const {getTableData} = this.props;
        this.searchParams = obj;
        getTableData({...obj, pageSize: this.pageSize, pageNum: 1})
    }

    componentDidMount() {
        const { getTableData, getRoleData, getDepartmentData, getTeamsData, getGroupsData, teamsData } = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
        getRoleData({});
        getDepartmentData({});
        getTeamsData();
        getGroupsData('', '')
    }

    render() {
        const { tableData: { data, pagination }, loading, departmentData, roleData, visible, getGroupsData, teamsData, groupsData, collectTeamId, collectGroupId } = this.props;
        return (
            <div>
                <SearchList departmentData={departmentData} roleData={roleData} submit={this.submit} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div><Button type={'primary'} onClick={this.addPeople}><FormattedMessage id="page.table.add"/><FormattedMessage id="page.table.personnel"/></Button></div>
                <CommonTable columns={this.columns} dataSource={data} pagination={pagination} loading={loading} handlePageChange={this.handlePageChange}/>
                <AddModal
                    departmentData={departmentData}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    info={this.state.info}
                    visible={visible}
                    roleData={roleData}
                    getGroupsData={getGroupsData}
                    teamsData={teamsData}
                    groupsData={groupsData}
                    collectTeamId={collectTeamId}
                    collectGroupId={collectGroupId}
                    isSuperAdmin={this.state.isSuperAdmin}
                    allMerchants={this.state.allMerchants}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {systemManageState: {peopleManageState}} = state;
    return {
        tableData: peopleManageState['tableData'],
        loading: peopleManageState['loading'],
        visible: peopleManageState['visible'],
        departmentData: peopleManageState['departmentData'],
        roleData: peopleManageState['roleData'],
        teamsData:peopleManageState['teamsData'],
        groupsData:peopleManageState['groupsData'],
        collectTeamId:peopleManageState['collectTeamId'],
        collectGroupId:peopleManageState['collectGroupId'],
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: peopleManageAction.pmgGetTableData,
        setTableData: peopleManageAction.pmgSetTableData,
        changeModalVisible: peopleManageAction.pmgChangeModalVisible,
        getDepartmentData: peopleManageAction.pmgGetDepartmentData,
        getRoleData: peopleManageAction.pmgGetRoleData,
        addPeopleData: peopleManageAction.pmgAddPeopleList,
        updatePeopleData: peopleManageAction.pmgUpdatePeopleList,
        deletePeopleData: peopleManageAction.pmgDelPeopleList,
        getTeamsData: peopleManageAction.pmgGetCollectTeams,
        getGroupsData: peopleManageAction.pmgGetCollectGroups,
    }, dispatch);
}

PeopleManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PeopleManage));
