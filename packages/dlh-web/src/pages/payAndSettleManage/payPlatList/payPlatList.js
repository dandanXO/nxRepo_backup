import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip, Modal } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable ,CopyText} from 'components';
import { bindActionCreators } from 'redux';
import { payPlatListAction } from './index';
import styles from './payPlatList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios } from 'utils';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

class PayPlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelId: null,
            allPayTypeList:[]
        };
        const _this = this;
        this.columns =[
            {
                title: props.intl.formatMessage({id : "page.search.list.platform.name"}),
                dataIndex: 'platName',
                key: 'platName', render(text) { return <CopyText text={text} /> } 
            },{
                title: props.intl.formatMessage({id : "page.search.list.platform.type"}),
                dataIndex: 'platClass',
                key: 'platClass',
                render(text) { return <CopyText text={text} /> } 
            },{
                title: props.intl.formatMessage({id : "page.table.supoort.repayment.method"}),
                dataIndex: 'payTypeList',
                key: 'payTypeList',
                width:'30%',
                render(text,record) {
                    let { allPayTypeList } = _this.state;
                    let showStr = '';
                    let ids = text.split(',');
                    for(let i in ids){
                        for(let j in allPayTypeList){
                            if(allPayTypeList[j].id == ids[i]){
                                if(showStr.length > 0){
                                    showStr += '\n\r ';
                                }
                                showStr += allPayTypeList[j].label;
                            }
                        }
                    }
                    return (
                        <CopyText text={showStr} />
                    );
                }
            },{
                title: props.intl.formatMessage({id : "windowPage.add.time"}),
                dataIndex: 'createDate',
                key: 'createDate',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },{
                title: props.intl.formatMessage({id : "page.table.last.modify.time"}),
                dataIndex: 'modifyDate',
                key: 'modifyDate',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={props.intl.formatMessage({id : "page.table.modify.platform.info"})}>
                                <span onClick={() => _this.modifyModel(record)}><Icon type={'file-text'}/></span>
                            </Tooltip>
                            <Tooltip title={props.intl.formatMessage({id : "page.table.delete.platform"})}>
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
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: null });
        changeModalVisible(true);
        changeModalInfo({  plateName: '', platClass: '', });
    }
    //修改
    modifyModel = (record) => {
        const { id,platName,platClass,reqGateway,payGateway,payTypeList} = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: id });
        let payTypeIds = payTypeList.split(',');
        changeModalInfo({ platName,platClass,reqGateway,payGateway,payTypeList,payTypeIds });
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
        const { modelId } = this.state;
        const { addChannel, updateChannel } = this.props;

        const { payTypeIds } = obj;
        let ids = [''];
        if(Array.isArray(payTypeIds)) {
            ids = [...payTypeIds];
        }
        obj.payTypeList = ids.join(',');

        if(modelId) {
            updateChannel({ ...obj, id: modelId });
            return;
        }
        addChannel(obj);
    }

    handleSearch = (obj) => {
        let { time, platName, platClass } = obj;
        const { getTableData } = this.props;
        let startDate = '', endDate = '';
        if(Array.isArray(time)) {
            [startDate, endDate] = time.map(item => item.format('YYYY-MM-DD'));
            if(!!startDate){
                startDate += ' 00:00:00.0';
            }
            if(!!endDate){
                endDate += ' 23:59:59.999';
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

        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayType/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    content = content.map(item => ({ id: item.id, pId: 0, value: item.id + '', label: item.typeName+'('+item.typeAlias+')' }));
                    _this.setState({
                        allPayTypeList: content || []
                    });
                    console.dir(content);
                }
            });        
        } catch (e) {

        }
    }

    render() {
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        const { allPayTypeList } = this.state;
        // console.log(info)
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}/>
                <Button type={'primary'} onClick={this.handleAddModel}><FormattedMessage id="page.table.add" /></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <EditModel visible={visible} info={info} allPayTypeList={allPayTypeList} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { payPlatListState } } = state;
    
    return {
        tableData: payPlatListState['data'],
        loading: payPlatListState['loading'],
        visible: payPlatListState['visible'],
        info: payPlatListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       payPlatListAction.payPlatGetTableData,
        changeModalVisible: payPlatListAction.payPlatChangeModalVisible,
        changeModalInfo:    payPlatListAction.payPlatChangeModalInfo,
        addChannel:         payPlatListAction.payPlatAddTableData,
        updateChannel:      payPlatListAction.payPlatUpdateTableData,
        deleteModel:        payPlatListAction.deleteModel
    },dispatch)
}

PayPlatList.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PayPlatList));