import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Popconfirm } from 'antd';
import { menuMangeAction } from './index';
import { CommonTable } from 'components';
import AddModal from './AddModal/AddModal';
import styles from './MenuManage.less';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

class MenuManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
        this.modifyId = '';
        const _this = this;
        this.columns = [
            { title: props.intl.formatMessage({id : "page.table.menu.name"}), dataIndex: 'name', key: 'name' },
            { title: props.intl.formatMessage({id : "page.table.path.URL"}), dataIndex: 'actionUrl', key: 'actionUrl' },
            {
                title: props.intl.formatMessage({id : "page.table.show.icon"}),
                dataIndex: 'iconCss',
                key: 'iconCss',
                render(text) {
                    return (
                        <div>
                            <Icon type={text}/>
                        </div>
                    );
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width: '200px',
                render(text, record) {
                    return (
                        <div className={styles.btnWrapper}>
                            <span onClick={() =>_this.editTreeList(record)}><Icon type={'edit'}/></span>
                            <Popconfirm title={_this.props.intl.formatMessage({id : "windowPage.confirm.delete"})} onConfirm={() => _this.deleteTreeList(text)}>
                                <span><Icon type={'delete'}/></span>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ]
    }

    addMenu = () => {
        this.modifyId = '';
        const { changeModalVisible } = this.props;
        this.setState({
            info: {}
        }, () => {
            changeModalVisible(true);
        })
    }

    handleCancel = () => {
        const { changeModalVisible } = this.props;
        this.modifyId = '';
        changeModalVisible(false);
    }

    //删除
    deleteTreeList = (id) => {
        const { deleteTreeList } = this.props;
        deleteTreeList({ id });
    }
    handleOk = (obj) => {
        console.log(obj);
        const { addTreeList, modifyTreeList } = this.props;
        if(this.modifyId === '') {
            addTreeList(obj);
            return;
        }
        modifyTreeList({ ...obj, id: this.modifyId });
    }

    //修改
    editTreeList = (record) => {
        console.log(record);
        const { name, actionUrl, iconCss, id, parentId ,sortOrder} = record;
        const { changeModalVisible } = this.props;
        this.modifyId = id;
        this.setState({
            info: {
                name,
                actionUrl,
                iconCss,
                parentId: parentId + '',
                sortOrder
            }
        }, () => {
            changeModalVisible(true);
        })
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({});
    }

    render() {
        const { tableData, loading, visible } = this.props;
        const { info } = this.state;
        // console.log(tableData);
        for (var k in tableData) {
            tableData[k].name = this.props.intl.formatMessage({id : tableData[k].name.trim()})
             
            for(var j in tableData[k]['children']){
                tableData[k]['children'][j].name = this.props.intl.formatMessage({id : tableData[k]['children'][j].name.trim()})
            }
           
            // console.log(tableData[k])
          }
       // tableData.forEach(function(obj) { console.log(obj.name); });
        return (
            <div>
                <div><Button onClick={this.addMenu} type={'primary'}><FormattedMessage id="windowPage.add.menu" /></Button></div>
                <div><FormattedMessage id="page.menuManage.comment1" /></div>
                <CommonTable columns={this.columns} dataSource={tableData} loading={loading} pagination={null}/>
                <AddModal info={info} handleCancel={this.handleCancel} visible={visible} handleOk={this.handleOk} selectData={tableData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { systemManageState: { menuManageState } } = state;
    return {
        tableData: menuManageState['tableData'],
        loading: menuManageState['loading'],
        visible: menuManageState['visible']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: menuMangeAction.mmgGetTableData,
        setTableData: menuMangeAction.mmgSetTableData,
        changeModalVisible: menuMangeAction.mmgChangeModalVisible,
        addTreeList: menuMangeAction.mmgAddTreeData,
        modifyTreeList: menuMangeAction.mmgUpdateTreeData,
        deleteTreeList: menuMangeAction.mmgDelTreeData
    }, dispatch);
}

MenuManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MenuManage));