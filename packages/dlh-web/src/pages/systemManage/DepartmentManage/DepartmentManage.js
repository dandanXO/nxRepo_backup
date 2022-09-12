import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { departmentManageAction } from './index';
import { CommonTable } from 'components';
import { Icon, Button, Popconfirm } from 'antd';
import AddModal  from './AddModal/AddModal';
import styles from './DepartmentManage.less';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


class DepartmentManage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
        const _this = this;
        this.modifyId = '';
        this.columns = [
            { title: props.intl.formatMessage({id : "page.search.list.department.name"}), dataIndex: 'name', key: 'name' ,width:'30%'},
            {
                title: props.intl.formatMessage({id : "page.table.in-charge.person"}),
                dataIndex: 'userName',
                key: 'userName',
                width:'25%',
                render(text, record) {
                    const { roleName } = record;
                    if(!text) {
                        return '';
                    }
                    return (
                        <div>
                            <span>{text}</span>(<span>{roleName}</span>)
                        </div>
                    );
                }
            },
            { title: props.intl.formatMessage({id : "windowPage.remarks"}), dataIndex: 'remark', key: 'remark' },
            { title: props.intl.formatMessage({id : "page.table.superior.department"}), dataIndex: 'parentName', key: 'parentName' },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width: '10%',
                render(text, record) {
                    if(Number(text) === 1) {
                        return '';
                    }
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() => _this.modifyList(text,record)}><Icon type={'edit'}/></span>
                            {/*<Popconfirm title={'确认要删除吗？'} onConfirm={() =>  _this.removeList(text)}>*/}
                                {/*<span><Icon type={'delete'}/></span>*/}
                            {/*</Popconfirm>*/}
                        </div>
                    );
                }
            }
        ];
    }

    //删除
    removeList = (id) => {
        const { deleteTableData } = this.props;
        deleteTableData({ id });
    }
    //添加
    addDepartment = () => {
        const { changeModalVisible, tableData } = this.props;
        this.modifyId = '';
        const info = {
            name: '',
            remark: '',
            managerUserId: '',
            pid: tableData.length > 0 ? tableData[0].id : ''
        };
        this.setState({ info }, () => {
            changeModalVisible(true);
        });
    }

    //修改
    modifyList = (text, record) => {
        const { name, remark, managerUserId, pid } = record;
        const { changeModalVisible } = this.props;
        this.modifyId = text;
        this.setState({
            info: {
                name,
                remark,
                managerUserId,
                pid
            }
        }, () => {
            changeModalVisible(true);
        })
    }

    handleCancel = () => {
        const { changeModalVisible } = this.props;
        this.modifyId = '';
        changeModalVisible(false);
    }
    handleOk = (obj) => {
        const { addTableData, updateTableData } =  this.props;
        if(this.modifyId === '') {
            addTableData(obj);
            return;
        }
        updateTableData({ ...obj, id: this.modifyId });

    }

    componentDidMount() {
        const { getTableData, getPersonData } = this.props;
        getTableData({});
        getPersonData({ pageEnable: false });
    }

    render() {
        const { tableData, loading, personData, visible } = this.props;
        return (
            <div>
                <div><Button type={'primary'} onClick={this.addDepartment}><FormattedMessage id="page.table.add.department" /></Button></div>
                <CommonTable columns={this.columns} dataSource={tableData} loading={loading} pagination={null}/>
                <AddModal handleOk={this.handleOk} visible={visible} handleCancel={this.handleCancel} info={this.state.info} personData={personData} departmentData={tableData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { systemManageState: { departmentManageState } } = state;
    return {
        tableData: departmentManageState['tableData'],
        loading: departmentManageState['loading'],
        visible: departmentManageState['visible'],
        personData: departmentManageState['personData']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: departmentManageAction.dtmGetTableData,
        setTableData: departmentManageAction.dtmGetTableData,
        changeModalVisible: departmentManageAction.dtmChangeModalVisible,
        addTableData: departmentManageAction.dtmAddTableData,
        updateTableData: departmentManageAction.dtmUpdateTableData,
        deleteTableData: departmentManageAction.dtmDelTableData,
        getPersonData: departmentManageAction.dtmGetPersonData
    }, dispatch);
}

DepartmentManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DepartmentManage));