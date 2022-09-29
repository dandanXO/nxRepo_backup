import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Tooltip} from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import ChannelModel from './ChannelModel/ChannelModel';
import { CommonTable, CopyToLink, CopyText } from 'components';
import {bindActionCreators} from 'redux';
import {channelListAction} from './index';
import {axios} from 'utils';
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';

const stateStatus = {
    0: <FormattedMessage id="page.search.list.disable"/>,
    1: <FormattedMessage id="page.table.enabled"/>
}

class ChannelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemChannelId: null,
            channelUrl: null
        };
        this.searchParams = {};
    }

    //添加渠道
    handleAddChannel = () => {
        const {changeModalVisible, changeModalInfo, info} = this.props;
        this.setState({itemChannelId: null});
        changeModalVisible(true);
        let {channelUrl} = this.state;
        changeModalInfo({name: '', url: channelUrl, enabled: '1'});
    }
    //修改渠道
    modifyChannel = (record) => {
        const {id, url, name, enabled, modelName, campaign} = record;
        // const { id, url, name } = record;
        const {changeModalVisible, changeModalInfo, info} = this.props;
        this.setState({itemChannelId: id});
        changeModalInfo({name, url, modelName, enabled: enabled + '', campaign});
        // changeModalInfo({ ...info, name });
        changeModalVisible(true);
    }
    handleModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const {itemChannelId} = this.state;
        const {addChannel, updateChannel} = this.props;
        if (itemChannelId || itemChannelId === 0) {
            updateChannel({...obj, id: itemChannelId});
            return;
        }
        addChannel(obj);
    }

    handleSearch = (obj) => {
        let {time, url, name, enabled, modelName} = obj;
        const {getTableData} = this.props;
        let startTime = '', endTime = '';
        if (Array.isArray(time)) {
            [startTime, endTime] = time.map(item => item.format('YYYY-MM-DD'));
        }
        const params = {name, url, startTime, endTime, enabled, modelName, pageSize: 10, pageNum: 1};
        this.searchParams = params;
        getTableData(params);
    }
    handlePageChange = (pagination) => {
        const {current, pageSize} = pagination;
        const {getTableData} = this.props;
        getTableData({...this.searchParams, pageSize, pageNum: current});
    }

    componentDidMount() {
        const {getTableData, getRoleData} = this.props;
        getTableData({pageSize: 10, pageNum: 1, enabled: '1'});
        getRoleData({});
        try {
            const _this = this;
            axios({
                url: '/hs/admin/channel/getChannelUrl',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if (res && res.code == '200') {
                    let {data} = res;
                    _this.setState({
                        channelUrl: data.channelUrl
                    });
                    //console.log(data.channelUrl);
                }
            });
        } catch (e) {

        }

        axios({
            url: '/hs/admin/auth/getInfo',
            method: 'post'
        }).then((res) => {

            if (res && res.code == '200') {
                sessionStorage.setItem('riskPlan', res.riskPlan);
            }
        });
    }

    render() {
        const riskPlan = sessionStorage.getItem('riskPlan');
        const _this = this;
        const columns = [];
        columns.push(
            {
                title: <FormattedMessage id="page.table.channel.ID"/>,
                dataIndex: 'id',
                key: 'id',
                width: '10%',
                render(text) { return <CopyText text={text} /> }
            }
        );
        columns.push(
            {
                title: <FormattedMessage id="page.search.list.channelId"/>,
                dataIndex: 'name',
                key: 'name',
                width: 180,
                render(text) { return <CopyText text={text} /> }
            }
        );
        columns.push(
            {
                title: <FormattedMessage id="page.search.list.channelCampaign"/>,
                dataIndex: 'campaign',
                key: 'campaign',
                width: 180,
                render(text) { return <CopyText text={text} /> }
            }
        );
        columns.push(
            {
                title: <FormattedMessage id="page.search.list.hyperlink"/>,
                dataIndex: 'url',
                key: 'url',
                width: '30%',
                render(text) {
                    return <CopyToLink text={text}/>
                }
            }
        );
        if (riskPlan === 'C') {
            columns.push(
                {
                    title: <FormattedMessage id="page.table.risk.control.plan"/>,
                    dataIndex: 'modelName',
                    key: 'modelName',
                    width: '13%',
                    render(text) { return <CopyText text={text} /> }
                }
            );
        }
        columns.push(
            {
                title: <FormattedMessage id="page.table.build.time"/>,
                dataIndex: 'addTime',
                key: 'addTime',
                width: '9%',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD');
                }
            }
        );
        columns.push(
            {
                title: <FormattedMessage id="page.table.channel.status"/>,
                dataIndex: 'enabled',
                key: 'enabled',
                width: '10%',
                render(text) {
                    return stateStatus[text];
                }
            }
        );
        columns.push(
            {
                title: <FormattedMessage id="page.table.operation"/>,
                dataIndex: 'id',
                key: 'id',
                width: '6%',
                render(text, record) {
                    return (
                        <div onClick={() => _this.modifyChannel(record)}>
                            <Icon type={'edit'}/>
                        </div>
                    );
                }
            }
        );

        const {tableData: {data, pagination}, loading, visible, info, roleData} = this.props;
        return (
            <div>
                <SearchList roleData={roleData} handleSearch={this.handleSearch}/>
                <Button type={'primary'} onClick={this.handleAddChannel}><FormattedMessage id="page.table.add.channel"/></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={columns} dataSource={data} pagination={pagination} loading={loading}/>
                <ChannelModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk} roleData={roleData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {channelManageState: {channelListState}} = state;
    return {
        tableData: channelListState['data'],
        loading: channelListState['loading'],
        visible: channelListState['visible'],
        info: channelListState['modalInfo'],
        roleData: channelListState['roleData']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: channelListAction.chlGetTableData,
        changeModalVisible: channelListAction.chlChangeModalVisible,
        changeModalInfo: channelListAction.chlChangeModalInfo,
        addChannel: channelListAction.chlAddTableData,
        updateChannel: channelListAction.chlUpdateTableData,
        getRoleData: channelListAction.chlGetRoleData
    }, dispatch)
}

ChannelList.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChannelList));