import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable } from 'components';
import { siteBlackManageAction } from "./index";
import AddModal from './AddModal/AddModal';
import { Button, Icon, Popconfirm } from 'antd';
import styles from './SiteBlackManage.less';
import SearchList from './SearchList/SearchList';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const jobStatus = {
    1: <FormattedMessage id="page.table.disabled" />,
    2: <FormattedMessage id="page.table.enabled" />
}

class SiteBlackManage extends Component{
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
            { title: props.intl.formatMessage({id : "page.search.list.website.name"}), dataIndex: 'siteName', key: 'siteName' },
            { title: props.intl.formatMessage({id : "page.search.list.website.domain"}), dataIndex: 'siteDomain', key: 'siteDomain' },
            {
                title: props.intl.formatMessage({id : "page.search.list.status"}),
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return jobStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
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
        ];
    }


    addSiteBlack = () => {
        const { changeModalVisible} = this.props;
        this.modifyId = '';
        const info = {
            siteName: '',
            siteDomain: '',
            status: 2
        }
        this.setState({ info }, () => {
            changeModalVisible(true);
        })

    }

    editTreeList = (record) => {
        const { changeModalVisible } = this.props;
        const { id, siteName, siteDomain, status} = record;
        this.modifyId = id;
        const info = {
            siteName,
            siteDomain,
            status
        };
        this.setState({ info }, () => {
            changeModalVisible(true);
        })

    }

    deleteTreeList = (id) => {
        const { deleteSiteBlackData, getTableData } = this.props;
        deleteSiteBlackData({ id }, () => {
            getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
        })
    }


    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ pageNum: current, pageSize, ...this.searchParams });

    }

    handleOk = (obj) => {
        const { addSiteBlackData, getTableData, updateSiteBlackData } = this.props;

        const callback = () =>{
            getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
        }

        if(this.modifyId === '') {
            addSiteBlackData(obj, callback);
            return;
        }
        updateSiteBlackData({ ...obj, id: this.modifyId }, callback);

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
                <div><Button type={'primary'} onClick={this.addSiteBlack}><FormattedMessage id="page.table.add.loan.website" /></Button></div>
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
    const { systemManageState: { siteBlackManageState } } = state;
    return {
        tableData: siteBlackManageState['tableData'],
        loading: siteBlackManageState['loading'],
        visible: siteBlackManageState['visible']
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: siteBlackManageAction.siteBlackGetTableData,
        setTableData: siteBlackManageAction.siteBlackSetTableData,
        changeModalVisible: siteBlackManageAction.siteBlackChangeModalVisible,
        addSiteBlackData: siteBlackManageAction.siteBlackAddList,
        updateSiteBlackData: siteBlackManageAction.siteBlackUpdateList,
        deleteSiteBlackData: siteBlackManageAction.siteBlackDelList
    }, dispatch);
}

SiteBlackManage.PropTypes ={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)((injectIntl(SiteBlackManage)));