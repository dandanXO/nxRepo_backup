import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import SearchList from './SearchList/SearchList';
import RiskSwitchModel from './RiskSwitchModel/RiskSwitchModel';
import {CommonTable} from 'components';
import {bindActionCreators} from 'redux';
import {riskSwitchManageAction} from './index';
import styles from './config.less';

const convertarams = (obj = {}) => {
    const {name = '', key = '', value = ''} = obj;
    return {
        name,
        key,
        type: 4,
        value
    };
}

const controlStatus = {
    0: '否',
    1: '是'
}

const typeText = {
    0: '默认类型'
}

class RiskSwitchManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configKey: null
        };
        const _this = this;
        this.pageSize = 10;
        this.searchParams = convertarams({});
        this.columns = [
            {
                title: '配置名称',
                dataIndex: 'name',
                key: 'name',
                render(text) {
                    return <div className={styles.contentleft}>{text}</div>;
                }
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
                key: 'summary',
                render(text) {
                    return <div className={styles.contentleft}>{text}</div>;
                }
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
    }

    //修改
    modifyConfig = (record) => {
        const {key, name, value, iscontrol, type, summary, channelId} = record;
        const {changeModalVisible, changeModalInfo, info} = this.props;
        this.setState({configKey: key});
        changeModalInfo({key, name, value, iscontrol, type, summary, channelId});
        changeModalVisible(true);
    }

    handleModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const {configKey} = this.state;
        const {updateConfig} = this.props;
        if (configKey) {
            updateConfig({...obj, key: configKey});
        }
    }

    handleSearch = (obj) => {
        const {getTableData} = this.props;
        const params = convertarams(obj);
        getTableData({pageSize: this.pageSize, pageNum: 1, ...params});
    }

    handlePageChange = (pagination) => {
        const {current, pageSize} = pagination;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchParams});
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
    }

    render() {
        const {tableData: {data, pagination}, loading, visible, info} = this.props;
        const pageInfo = {...pagination, pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500", "1000", "2000", "5000"], showSizeChanger: true}
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pageInfo} loading={loading}/>
                <RiskSwitchModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {systemManageState: {riskSwitchManageState}} = state;
    return {
        tableData: riskSwitchManageState['data'],
        loading: riskSwitchManageState['loading'],
        visible: riskSwitchManageState['visible'],
        info: riskSwitchManageState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: riskSwitchManageAction.riskSGetTableData,
        changeModalVisible: riskSwitchManageAction.riskSChangeModalVisible,
        changeModalInfo: riskSwitchManageAction.riskSChangeModalInfo,
        updateConfig: riskSwitchManageAction.riskSUpdateTableData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RiskSwitchManage);