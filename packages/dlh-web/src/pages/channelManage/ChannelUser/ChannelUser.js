import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Icon} from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import ChannelUserModel from './ChannelUserModel/ChannelUserModel';
import {CommonTable} from 'components';
import {bindActionCreators} from 'redux';
import {channelUserAction} from './index';
import {FormattedMessage} from "react-intl";

const convertarams = (obj = {}) => {
    const {time = [], userName = '', userPhone = '', channelId = '', state = '', userNameLike = '', userPhoneLike = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        userName,
        userPhone,
        channelId,
        state,
        userNameLike,
        userPhoneLike
    };
}
const stateStatus = {
    0: <FormattedMessage id="page.search.list.disable"/>,
    1: <FormattedMessage id="page.table.enabled"/>
}

class ChannelUserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemChannelId: null
        };
        const _this = this;
        this.searchParams = convertarams({});
        this.columns = [
            {
                title: <FormattedMessage id="windowPage.add.time"/>,
                dataIndex: 'createTime',
                key: 'createTime',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            // {
            //     title: '渠道ID',
            //     dataIndex: 'channelId',
            //     key: 'channelId'
            // },
            {
                title: <FormattedMessage id="page.search.list.channelId"/>,
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: <FormattedMessage id="page.search.list.login.account"/>,
                dataIndex: 'userPhone',
                key: 'userPhone'
            },
            {
                title: <FormattedMessage id="page.search.list.user.status"/>,
                dataIndex: 'state',
                key: 'state',
                render(text) {
                    return stateStatus[text];
                }
            },
            {
                title: <FormattedMessage id="page.table.operation"/>,
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div onClick={() => _this.modifyChannelUser(record)}>
                            <Icon type={'edit'}/>
                        </div>
                    );
                }
            },
        ];
    }

    //添加渠道用户
    handleAddChannelUser = () => {
        const {changeModalVisible, changeModalInfo} = this.props;
        this.setState({itemChannelId: null});
        changeModalVisible(true);
        changeModalInfo({userName: '', userPhone: '', pass: '', channelId: '', state: '1', showField: ''});
    }
    //修改渠道用户
    modifyChannelUser = (record) => {
        const {id, userName, userPhone, channelId, state, showField} = record;
        const {changeModalVisible, changeModalInfo} = this.props;
        let idsArr = showField ? showField.split(',') : '', showFieldArr = [];
        let arr = [
            {"id": 1, "pId": 0, "value": "1", "label": <FormattedMessage id="page.table.new.customer.registrations.amount"/>},
            {"id": 2, "pId": 0, "value": "2", "label": <FormattedMessage id="page.table.new.customer.application.qantity"/>},
            {"id": 3, "pId": 0, "value": "3", "label": <FormattedMessage id="page.table.new.customer.loan.qantity"/>}
        ]
        for (let i = 0, len = idsArr.length; i < len; i++) {
            const isFind = arr.find(item => String(item.id) === String(idsArr[i]));
            if (isFind) {
                if (String(isFind['pId']) === '0') {
                    //找到该pid下面所有的菜单和列表返回的菜单比较
                    const allPidList = arr.filter(item => String(item.pId) === String(idsArr[i]));
                    const isAllin = allPidList.every(item => idsArr.indexOf(String(item)) !== -1);
                    if (isAllin) {
                        showFieldArr.push(idsArr[i]);
                    }
                } else {
                    showFieldArr.push(idsArr[i]);
                }
            }
        }
        this.setState({itemChannelId: id});
        changeModalInfo({userName, userPhone, channelId, state: state + '', showField: showFieldArr});
        changeModalVisible(true);
    }
    handleModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const {addChannelUser, updateChannelUser} = this.props;
        const {itemChannelId} = this.state;
        const {showField} = obj;
        let ids = [''];
        if (Array.isArray(showField)) {
            ids = [...showField];
        }
        const params = {...obj, showField: ids.join(',')};
        if (itemChannelId) {
            updateChannelUser({...params, id: itemChannelId});
            return;
        }
        addChannelUser(params);
    }

    handleSearch = (obj) => {
        const {getTableData} = this.props;
        const params = convertarams(obj);
        getTableData({pageSize: 10, pageNum: 1, ...params});
    }

    handlePageChange = (pagination) => {
        const {current, pageSize} = pagination;
        const {getTableData} = this.props;
        getTableData({...this.searchParams, pageSize, pageNum: current});
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: 10, pageNum: 1});
    }

    render() {
        const {tableData: {data, pagination}, loading, visible, info} = this.props;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <Button type={'primary'} onClick={this.handleAddChannelUser}><FormattedMessage id="page.table.add"/></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <ChannelUserModel
                    visible={visible}
                    info={info}
                    handleCancel={this.handleModalCancel}
                    handleOk={this.handleModalOk}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {channelManageState: {channelUserState}} = state;
    return {
        tableData: channelUserState['data'],
        loading: channelUserState['loading'],
        visible: channelUserState['visible'],
        info: channelUserState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: channelUserAction.chlUGetTableData,
        changeModalVisible: channelUserAction.chlUChangeModalVisible,
        changeModalInfo: channelUserAction.chlUChangeModalInfo,
        addChannelUser: channelUserAction.chlUAddTableData,
        updateChannelUser: channelUserAction.chlUUpdateTableData
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ChannelUserList);