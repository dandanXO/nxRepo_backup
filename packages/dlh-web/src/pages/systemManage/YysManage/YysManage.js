import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import YysModel from './YysModel/YysModel';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { yysManageAction } from './index';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const controlStatus = {
    0: '否',
    1: '是'
}

const typeText = {
    0: '默认类型'
}
class yysManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configKey: null
        };
        const _this = this;
        this.columns =[
            {
                title: '配置名称',
                dataIndex: 'name',
                key: 'name'
            },
            // {
            //     title: '配置代码',
            //     dataIndex: 'key',
            //     key: 'key'
            // },
            {
                title: '配置值',
                dataIndex: 'value',
                key: 'value'
            },
            // {
            //     title: '配置类型',
            //     dataIndex: 'type',
            //     key: 'type',
            //     render(text) {
            //         return typeText[text];
            //     }
            // },
            // {
            //     title: '开关类型',
            //     dataIndex: 'iscontrol',
            //     key: 'iscontrol',
            //     render(text) {
            //         return controlStatus[text];
            //     }
            // },
            {
                title: '备注',
                dataIndex: 'summary',
                key: 'summary'
            },
            {
                title: '操作',
                dataIndex: 'key',
                key: 'key',
                render(text, record) {
                    return (
                        <div onClick={() => _this.modifyConfig(record)}>
                            <Icon type={'edit'}/>
                        </div>
                    );
                }
            },
        ];
        this.searchParams = {};
    }

    //修改
    modifyConfig = (record) => {
        const { key, name,value,iscontrol,type,summary } = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ configKey: key });
        changeModalInfo({ key,name,value,iscontrol,type,summary });
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
            updateConfig({ ...obj, key: configKey });
            return;
        }
    }

    handleSearch = (obj) => {
        let { name,key,iscontrol,type } = obj;
        const { getTableData } = this.props;
        const params = { name,key,iscontrol,type , pageSize: 10, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }
    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageSize: 10, pageNum: 1 });
    }

    render() {
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <YysModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { systemManageState: { yysManageState } } = state;
    return {
        tableData: yysManageState['data'],
        loading: yysManageState['loading'],
        visible: yysManageState['visible'],
        info: yysManageState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: yysManageAction.cfyGetTableData,
        changeModalVisible: yysManageAction.cfyChangeModalVisible,
        changeModalInfo: yysManageAction.cfyChangeModalInfo,
        updateConfig: yysManageAction.cfyUpdateTableData
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(yysManage);