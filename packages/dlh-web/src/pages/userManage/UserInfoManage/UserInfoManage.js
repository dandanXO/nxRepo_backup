import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Icon, message, Modal, Popconfirm, Tooltip} from 'antd';
import SearchList from './SearchList/SearchList';
import { CommonTable, CopyText } from 'components';
import {axios} from 'utils';
import {userInfoMangeAction} from './index';
import moment from 'moment-timezone';
import styles from './UserInfoManage.less';
import BlackModal from './BlackModal/BlackModal';
import AddBlackModal from './AddBlackModal/AddBlackModal';
import InfoModal from './InfoModal/InfoModal';
import download from 'downloadjs';
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';

const convertParams = (obj = {}) => {
    const { time = [], status = '', rnStatus = '', hasOrder = '', nameTrue = '', phoneNo = '', channelId = '', noLoanAgain = false, noLoanAgainStartDays = 1, noLoanAgainEndDays = 10, userStatus = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        addStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        addEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        status,
        rnStatus,
        hasOrder,
        nameTrue,
        phoneNo,
        channelId,
        noLoanAgain,
        noLoanAgainStartDays,
        noLoanAgainEndDays,
        userStatus
    }
}


class UserInfoManage extends Component {


    constructor(props) {
        super(props);
        this.searchStatus = convertParams({});
        this.state = {
            info: {},
            btnDisabled: false,
            addModalVisible: false,
            adminUserInfo: {},
            showDownLoanBtn: 0,
            manualAddBlackFlag: 0,
            btnTelSaleDisabled: false
        };

        const _this = this;
        this.pageSize = 10;
        this.operatorId = '';
        this.detailId = '';
        this.columns = [
            {
                title: this.props.intl.formatMessage({id: "page.search.list.mobile"}),
                dataIndex: 'phoneNo',
                key: 'phoneNo'
            },
            {
                title: this.props.intl.formatMessage({id: "page.search.list.reg.time"}),
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD: HH:mm:ss')
                },
                sorter: true
            },
            {
                title: this.props.intl.formatMessage({id: "page.search.list.channelId"}),
                dataIndex: 'channelName',
                key: 'channelName',
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: this.props.intl.formatMessage({id: "page.search.list.name"}),
                dataIndex: 'nameTrue',
                key: 'nameTrue',
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: this.props.intl.formatMessage({id: "page.table.blacklist.status"}),
                dataIndex: 'isBlack',
                key: 'isBlack',
                render(text) {
                    return Number(text) === 0 ? <FormattedMessage id="page.search.list.normal"/> : <FormattedMessage id="page.search.list.blacklist"/>;
                }
            },
            {
                title: this.props.intl.formatMessage({id: "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    let {adminUserInfo} = _this.state;
                    const {isBlack} = record;
                    // if(Number(isBlack) !== 0) {
                    //     return '';
                    // }
                    return (
                        <div className={styles.recordWrapper}>
                            {//超级管理员，方可操作
                                (!!adminUserInfo && adminUserInfo.roleId == 1 && Number(isBlack) !== 0) && <Popconfirm title={props.intl.formatMessage({id: "page.table.clear.user.info.confim"})} onConfirm={() => _this.removeUserById(record)}>
                                    <Tooltip title={props.intl.formatMessage({id: "page.table.clear.user.info"})}>
                                        <span><Icon type="close"/></span>
                                    </Tooltip>
                                </Popconfirm>
                            }
                            {//超级管理员，方可操作
                                (!!adminUserInfo && adminUserInfo.roleId == 1 && Number(isBlack) !== 0) && <Popconfirm title={props.intl.formatMessage({id: "page.table.forbin.user.login.confirm"})} onConfirm={() => _this.banUserById(record)}>
                                    <Tooltip title={props.intl.formatMessage({id: "page.table.forbin.user.login"})}>
                                        <span><Icon type="close"/></span>
                                    </Tooltip>
                                </Popconfirm>
                            }
                            {
                                Number(isBlack) === 0 && <Tooltip title={props.intl.formatMessage({id: "page.table.add.blacklist"})}>
                                    <span onClick={() => _this.showModal(text)}><Icon type={'delete'}/></span>
                                </Tooltip>
                            }
                            <Tooltip title={props.intl.formatMessage({id: "page.table.details"})}>
                                <span onClick={() => _this.lookDetail(text)}><Icon type={'file-text'}/></span>
                            </Tooltip>
                        </div>
                    );
                }
            }
        ];
    }

    //导出用户信息
    exportOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/user-manage/user-download',
            method: 'get',
            responseType: 'blob',
            params : _this.searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            let exportDate = Date.now();
            //download(res, `用户列表${Date.now()}.xlsx`);
            download(res, this.props.intl.formatMessage({id: "page.table.exporting.download.userlist"}, {expDate: exportDate}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    //根据用户id移除
    removeUserById = (obj) => {

        Modal.confirm({
            title: this.props.intl.formatMessage({id: "page.table.confirm.operation"}),
            content: this.props.intl.formatMessage({id: "page.table.clear.user.info.operation.confirm"}, {name: obj.nameTrue}),
            onOk() {
                try {
                    axios({
                        url: '/hs/admin/user-manage/user',//removeUserById
                        method: 'delete',
                        data: {userId: obj.id}
                    }).then((res) => {
                        setTimeout(function () {
                            document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                        }, 2000);
                    });
                } catch (e) {
                }
            },
            onCancel() {
            },
        });
    };

    //根据用户id永久禁止登陆app
    banUserById = (obj) => {

        Modal.confirm({
            title: this.props.intl.formatMessage({id: "page.table.confirm.operation"}),
            content: this.props.intl.formatMessage({id: "page.table.forbin.user.login.operation.confirm"}, {name: obj.nameTrue}),
            onOk() {
                try {
                    axios({
                        url: '/hs/admin/user-manage/user-ban',
                        method: 'post',
                        data: {userId: obj.id}
                    }).then((res) => {
                        setTimeout(function () {
                            document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                        }, 2000);
                    });
                } catch (e) {
                }
            },
            onCancel() {
            },
        });
    };


    showAddModal = (text) => {
        const {changeAddModalVisible} = this.props;
        changeAddModalVisible(true);
        this.operatorId = text;
    }


    showModal = (text) => {
        const {changeModalVisible} = this.props;
        changeModalVisible(true);
        //存储当前记录的id
        this.operatorId = text;
    }
    handleOk = (obj) => {
        const {goBlackOperator, getTableData, tableData: {pagination}} = this.props;
        goBlackOperator({...obj, userId: this.operatorId}, () => {
            getTableData({pageSize: this.pageSize, pageNum: pagination['current'] || 1, ...this.searchStatus});
        })

    }
    handleCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }


    handleAddModalOk = (obj) => {
        const {pushBlackOperator, getTableData, tableData: {pagination}} = this.props;
        pushBlackOperator({...obj, userId: this.operatorId}, () => {
            getTableData({pageSize: this.pageSize, pageNum: pagination['current'] || 1, ...this.searchStatus});
        })

    }
    handleAddModalCancel = () => {

        const {changeAddModalVisible} = this.props;
        changeAddModalVisible(false);
    }


    componentDidMount() {
        const _this = this;
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchStatus});
        axios({
            url: '/hs/admin/auth/getInfo',
            method: 'post'
        }).then((res) => {

            if (res && res.code == '200') {
                let {data} = res;
                _this.setState({
                    adminUserInfo: data,
                    showDownLoanBtn: res.showDownLoanBtn
                });
            }
        });

        axios({
            url: '/hs/admin/black/getPushRcConfig',
            method: 'post'
        }).then((res) => {

            if (res && res.code == '200') {
                let {data} = res;
                _this.setState({
                    manualAddBlackFlag: data
                });
            }
        });

    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    handleSubmit = (obj) => {
        const { getTableData } = this.props;
        this.searchStatus = convertParams(obj);
        const { noLoanAgain, userStatus } = this.searchStatus;
        const isAbleImportTelSale = noLoanAgain || userStatus === "20" || userStatus === "11";
        this.setState({ btnTelSaleDisabled: isAbleImportTelSale });
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchStatus });
    }

    handlePageChange = (pagination, filters, sorter) => {
        const {current, pageSize} = pagination;
        const {getTableData} = this.props;
        const sortField = sorter.field;
        const sortOrder = sorter.order;
        getTableData({pageNum: current, pageSize, sortField, sortOrder, ...this.searchStatus});
    }

    tabChange = (key) => {
        const {getApplyData, getOperatorData, getContactsData, getSMSLogData} = this.props;
        const params = {userId: this.detailId, pageSize: 10000, pageNum: 1};
        switch (Number(key)) {
            case 2:
                getApplyData(params);
                break;
            case 3:
                getContactsData(params);
                break;
            case 4:
                getOperatorData(params);
                break;
            case 5:
                getSMSLogData(params);
                break;

        }
    }

    handleInfoModalCancel = () => {
        const {changeDetailModal, setDetailData, setApplyData, setOperatorData, setContactsData,setSMSLogData} = this.props;
        this.detailId = '';
        changeDetailModal(false);
        //清空tab数据
        setDetailData({})
        setApplyData([]);
        setOperatorData([]);
        setContactsData([]);
        setSMSLogData([]);

    }
    lookDetail = (text) => {
        const {changeDetailModal, getDetailData} = this.props;
        this.detailId = text;
        getDetailData({userId: text});
        changeDetailModal(true);
    }

    handleImportTelSale = () => {
        const { intl, importTelSale } = this.props;
        importTelSale({ ...this.searchStatus });
        message.success(intl.formatMessage({ id: "page.table.operation.success" }));
    }

    render() {
        const { intl, tableData: { data, pagination }, loading, visible, infoVisible, addModalVisible, info, modalLoading } = this.props;
        const { btnDisabled, showDownLoanBtn, manualAddBlackFlag, adminUserInfo, btnTelSaleDisabled } = this.state;
        const adminUserRoleAndManualAddBlackFlag = !!adminUserInfo && adminUserInfo.roleId == 1 && manualAddBlackFlag != 0;
        return (
            <div>
                <SearchList submit={this.handleSubmit} />
                <div className={styles.buttonWrapper}>
                    {adminUserRoleAndManualAddBlackFlag && <Button type={'primary'} onClick={() => this.showAddModal()}>{intl.formatMessage({ id: "page.table.add.blacklist" })}</Button>}
                    {showDownLoanBtn === '1' && <Button type={'danger'} disabled={btnDisabled} onClick={this.exportOrder}>{intl.formatMessage({ id: "page.table.export" })}</Button>}
                    <Button type={'danger'} disabled={!btnTelSaleDisabled} onClick={this.handleImportTelSale}>{intl.formatMessage({ id: "windowPage.import.tel.sale" })}</Button>
                </div>
                <CommonTable
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    dataSource={data}
                    pagination={pagination}
                    columns={this.columns}
                />
                {adminUserRoleAndManualAddBlackFlag && <AddBlackModal visible={addModalVisible} info={this.state.info} handleCancel={this.handleAddModalCancel} handleOk={this.handleAddModalOk} />}
                <BlackModal visible={visible} info={this.state.info} handleCancel={this.handleCancel} handleOk={this.handleOk} />
                <InfoModal loading={modalLoading} handleChange={this.tabChange} info={info} visible={infoVisible} handleCancel={this.handleInfoModalCancel} />
            </div>
        );
        
    }

}

const mapStateToProps = (state) => {
    const {userManageState: {userInfoManageState}} = state;
    return {
        tableData: userInfoManageState['data'],
        loading: userInfoManageState['loading'],
        visible: userInfoManageState['visible'],
        addModalVisible: userInfoManageState['addModalVisible'],
        infoVisible: userInfoManageState['infoVisible'],
        info: userInfoManageState['info'],
        modalLoading: userInfoManageState['modalLoading']

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: userInfoMangeAction.uimGetTableData,
        setTableData: userInfoMangeAction.uimSetTableData,
        goBlackOperator: userInfoMangeAction.uimGoBlackList,
        pushBlackOperator: userInfoMangeAction.uimPushBlackList,
        changeModalVisible: userInfoMangeAction.uimChangeVisible,
        changeAddModalVisible: userInfoMangeAction.uimChangeAddModalVisible,
        changeDetailModal: userInfoMangeAction.uimDetailVisible,
        getDetailData: userInfoMangeAction.uimGetDetailData,
        getApplyData: userInfoMangeAction.uimGetApplyData,
        getOperatorData: userInfoMangeAction.uimGetOperatorData,
        getContactsData: userInfoMangeAction.uimGetContactsData,
        setDetailData: userInfoMangeAction.uimSetDetailData,
        setApplyData: userInfoMangeAction.uimSetApplyData,
        setOperatorData: userInfoMangeAction.uimSetOperatorData,
        setContactsData: userInfoMangeAction.uimSetContactsData,
        getSMSLogData: userInfoMangeAction.uimGetSMSLogData,
        setSMSLogData: userInfoMangeAction.uimSetSMSLogData,
        importTelSale:userInfoMangeAction.uimImportTelSaleData
    }, dispatch)
}

const propTypes = {
    intl: PropTypes.object.isRequired,
};

UserInfoManage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserInfoManage));