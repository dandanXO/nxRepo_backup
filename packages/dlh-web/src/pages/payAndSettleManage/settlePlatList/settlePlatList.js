import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip, Modal } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable, CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { settlePlatListAction } from './index';
import styles from './settlePlatList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios } from 'utils';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

class SettlePlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelId: null,
            platClass: '',
            allSettleTypeList: []
        };
        const _this = this;
        this.columns =[
            {
                title: this.props.intl.formatMessage({id : "page.search.list.platform.name"}),
                dataIndex: 'platName',
                key: 'platName',
                render(text) { return <CopyText text={text} /> }
            },{
                title: this.props.intl.formatMessage({id : "page.table.max.value"}),
                dataIndex: 'maxMoney',
                key: 'maxMoney',
                render(text) { return <CopyText text={text} /> }
            },{
                title: this.props.intl.formatMessage({id : "page.table.min.value"}),
                dataIndex: 'minMoney',
                key: 'minMoney',
                render(text) { return <CopyText text={text} /> }
            },{
                title: this.props.intl.formatMessage({id : "page.table.priority"}),
                dataIndex: 'sortNum',
                key: 'sortNum',
                width:'8%'
            },{
                title: this.props.intl.formatMessage({id : "windowPage.add.time"}),
                dataIndex: 'createDate',
                key: 'createDate',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },{
                title: this.props.intl.formatMessage({id : "page.table.last.modify.time"}),
                dataIndex: 'modifyDate',
                key: 'modifyDate',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: this.props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={ _this.props.intl.formatMessage({id : "page.table.modify.platform.info"})}>
                                <span onClick={() => _this.modifyModel(record)}><Icon type={'file-text'}/></span>
                            </Tooltip>
                            <Tooltip title={_this.props.intl.formatMessage({id : "page.table.delete.platform"})}>
                                <span onClick={() => _this.deleteModel(record)}><Icon type={'delete'}/></span>
                            </Tooltip>
                        </div>
                    );
                }
            },
        ];
        this.searchParams = {};
    }

    //添加
    handleAddModel = () => {
        const { changeModalVisible, changeModalInfo } = this.props;
        this.setState({ modelId: null ,platClass: ''});
        changeModalVisible(true);
        changeModalInfo({  plateName: '', platClass: '',sortNum:99 });
    }
    //修改
    modifyModel = (record) => {
        const { id, platName, platClass, reqGateway, payGateway, maxMoney, minMoney, sortNum } = record;
        const { changeModalVisible, changeModalInfo } = this.props;
        this.setState({ modelId: id, platClass: platClass });
        changeModalInfo({ platName, platClass, reqGateway, payGateway, maxMoney, minMoney, sortNum });
        changeModalVisible(true);
    }
    //删除
    deleteModel = (record) => {
        const confirm = Modal.confirm;
        const { id } = record;
        const { deleteModel, intl } = this.props;
        confirm({
            title: intl.formatMessage({id : "page.table.confirm.operation"}),
            content: intl.formatMessage({id : "page.table.confirm.delete.platform.info"}),
            onOk() {
              deleteModel({id});
            },
            onCancel() {},
          });
    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const { modelId, platClass } = this.state;
        const { addChannel, updateChannel } = this.props;
        if (modelId) {
            updateChannel({ ...obj, id: modelId, platClass });
            return;
        }
        addChannel(obj);
    }

    handleSearch = (obj) => {
        let { time, platName, platClass='' } = obj;
        const { getTableData } = this.props;
        let startDate = '', endDate = '';
        if(Array.isArray(time)) {
            [startDate, endDate] = time.map(item => item.format('YYYY-MM-DD'));
            if(!!startDate){
                startDate += ' 00:00:00';
            }
            if(!!endDate){
                endDate += ' 23:59:59';
            }
        }
        
        const params = { platName, platClass, startDate, endDate, pageSize: 10, pageNum: 1 };
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
        const { allSettleTypeList } = this.state;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <Button type={'primary'} onClick={this.handleAddModel}><FormattedMessage id="page.table.add" /></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <EditModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { settlePlatListState } } = state;
    
    return {
        tableData: settlePlatListState['data'],
        loading: settlePlatListState['loading'],
        visible: settlePlatListState['visible'],
        info: settlePlatListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       settlePlatListAction.settlePlatGetTableData,
        changeModalVisible: settlePlatListAction.settlePlatChangeModalVisible,
        changeModalInfo:    settlePlatListAction.settlePlatChangeModalInfo,
        addChannel:         settlePlatListAction.settlePlatAddTableData,
        updateChannel:      settlePlatListAction.settlePlatUpdateTableData,
        deleteModel:        settlePlatListAction.deleteModel
    },dispatch)
}

SettlePlatList.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettlePlatList));