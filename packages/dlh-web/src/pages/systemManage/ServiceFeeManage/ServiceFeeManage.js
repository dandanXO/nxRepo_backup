import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import ServiceFeeModel from './ServiceFeeModel/ServiceFeeModel';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { serviceFeeManageAction } from './index';
import { axios } from 'utils';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const convertarams = (obj = {}) => {
    const {  name = '', key = '',channelId=-99} = obj;
    return {
        name,
        key,
        type: 2,
        channelId
    };
}

const controlStatus = {
    0: <FormattedMessage id="page.table.no" />,
    1: <FormattedMessage id="page.table.yes" />
}

const typeText = {
    0: <FormattedMessage id="page.table.default.type" />
}

class ServiceFeeManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configKey: null,
            channelList : []
        };
        const _this = this;
        this.pageSize = 10000;
        this.searchParams = convertarams({});
        this.channelMap = {};
    }

    //修改
    modifyConfig = (record,channelName) => {
        const { key, name,value,iscontrol,type,summary,channelId } = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ configKey: key });
        changeModalInfo({ key,name,value,iscontrol,type,summary,channelId,channelName });
        changeModalVisible(true);
    }
    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const { configKey } = this.state;
        const { updateConfig } = this.props;
        if(configKey) {
            updateConfig({ ...obj, key: configKey,searchParams : {...this.searchParams} });
        }
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = convertarams(obj);
        this.searchParams = params;
        getTableData({ ...this.searchParams });
    }

    handlePageChange = (pagination) => {
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = convertarams({});
        getTableData({...this.searchParams });
        this.getChannelList();
    }

    getChannelList() {
        const _this = this;
        axios({
            url: '/hs/admin/channel/getChannelList',
            method: 'post',
            data: {pageSize: 1000, pageNum: 1}
        }).then((res) => {
            if(res && res.code == '200') {
                let { data } = res;
                data.records.unshift({id: -99, name: this.props.intl.formatMessage({id : "windowPage.default.channel"})});
                data.records.map((item,i)=>{
                    this.channelMap[item.id] = item;
                });
                _this.setState({
                    channelList : data.records
                });

            }
        });
    }

    render() {
        const _this = this;
        const { tableData: { data}, loading, visible, info, intl } = this.props;
        const {channelList} = this.state;
        var currentChannel = this.channelMap[this.searchParams.channelId];
        var channelName = !!currentChannel?currentChannel.name:'';
        this.columns =[
            {
                title: intl.formatMessage({id : "page.search.list.belonging.channel"}),
                dataIndex: 'channel',
                key: 'channel',
                render(text,record){
                    return (
                        channelName
                    );
                }
            },
            {
                title: intl.formatMessage({id : "page.search.list.config.name"}),
                dataIndex: 'name',
                key: 'name'
            },
            {
                title:  intl.formatMessage({id : "page.table.configuration.value"}),
                dataIndex: 'value',
                key: 'value'
            },
            {
                title:  intl.formatMessage({id : "windowPage.remarks"}),
                dataIndex: 'summary',
                key: 'summary'
            },
            {
                title:  intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'operate',
                key: 'operate',
                render(text, record) {
                    return (
                        <div onClick={() => _this.modifyConfig(record,channelName)}>
                            <Icon type={'edit'}/>
                        </div>
                    );
                }
            },
        ];

        return (
            <div>
                <SearchList handleSearch={this.handleSearch} channelList={channelList} searchParams={this.searchParams}/>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={null}  loading={loading}/>
                <ServiceFeeModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { systemManageState: { serviceFeeManageState } } = state;
    return {
        tableData: serviceFeeManageState['data'],
        loading: serviceFeeManageState['loading'],
        visible: serviceFeeManageState['visible'],
        info: serviceFeeManageState['modalInfo']
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: serviceFeeManageAction.csfGetTableData,
        changeModalVisible: serviceFeeManageAction.csfChangeModalVisible,
        changeModalInfo: serviceFeeManageAction.csfChangeModalInfo,
        updateConfig: serviceFeeManageAction.csfUpdateTableData
    },dispatch)
}

ServiceFeeManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ServiceFeeManage));
