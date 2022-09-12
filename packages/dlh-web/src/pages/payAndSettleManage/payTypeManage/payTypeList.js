import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip, Modal } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable,CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { payTypeListAction } from './index';
import styles from './payTypeList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';

class PayTypeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemChannelId: null,
            channelUrl:null
        };
        const _this = this;
        this.columns = [
            {
                title: props.intl.formatMessage({ id: "windowPage.payment.method" }),
                dataIndex: 'typeName',
                key: 'typeName',
                render(text) {
                    return <CopyText text={text} />
                }
            }, 
            {
                title: props.intl.formatMessage({ id: "windowPage.payment.method.alias" }),
                dataIndex: 'typeAlias',
                key: 'typeAlias',
                render(text) {
                    return <CopyText text={text} />
                }
            }, 
            {
                title: props.intl.formatMessage({ id: "windowPage.remarks" }),
                dataIndex: 'typeNote',
                key: 'typeNote',
                render(text) {
                    var showStr = !!text && text.length >= 100 ? text.substring(0, 100) + '...' : text;
                    return  <CopyText text={showStr} />
                }
            }, 
            {
                title: props.intl.formatMessage({ id: "windowPage.add.time" }),
                dataIndex: 'createDate',
                key: 'createDate',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            }, 
            {
                title: props.intl.formatMessage({ id: "page.table.last.modify.time" }),
                dataIndex: 'modifyDate',
                key: 'modifyDate',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            }, 
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={_this.props.intl.formatMessage({ id: "page.table.modify" })}>
                                <span onClick={() => _this.modifyModel(record)}><Icon type={'file-text'} /></span>
                            </Tooltip>
                            <Tooltip title={_this.props.intl.formatMessage({ id: "page.table.delete" })}>
                                <span onClick={() => _this.deleteModel(record)}><Icon type={'delete'} /></span>
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
        this.setState({ itemChannelId: null });
        changeModalVisible(true);
        let { channelUrl } = this.state;
        changeModalInfo({  typeName:'',typeAlias:'',typeNote:'' });
    }
    //修改
    modifyModel = (record) => {
        const { id,typeName,typeAlias,typeNote} = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ itemChannelId: id });
        changeModalInfo({ typeName,typeAlias,typeNote });
        changeModalVisible(true);
    }
    //删除
    deleteModel = (record) => {
        const confirm = Modal.confirm;
        const { id } = record;
        const { deleteModel, intl } = this.props;
        confirm({
            title: intl.formatMessage({id : "page.table.confirm.operation"}),
            content: intl.formatMessage({id : "page.table.confirm.delete.repayment.method"}),
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
        const { itemChannelId } = this.state;
        const { addModel, updateModel } = this.props;
        if(itemChannelId) {
            updateModel({ ...obj, id: itemChannelId });
            return;
        }
        addModel(obj);
    }

    handleSearch = (obj) => {
        let { time, typeName, typeAlias } = obj;
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
        
        const params = {  typeName, typeAlias, startDate, endDate, pageSize: 10, pageNum: 1 };
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
        // try {
        //     const _this = this;
        //     axios({
        //         url: '/hs/admin/channel/getChannelUrl',
        //         method: 'post',
        //         data: {pageSize: 1000, pageNum: 1}
        //     }).then((res) => {
        //         if(res && res.code == '200') {
        //             let { data } = res;
        //             _this.setState({
        //                 channelUrl: data.channelUrl
        //             });
        //             //console.log(data.channelUrl);
        //         }
        //     });        
        // } catch (e) {

        // }
    }

    render() {
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        // console.log(info)
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
    const { payAndSettleManageState: { payTypeListState } } = state;
    
    return {
        tableData: payTypeListState['data'],
        loading: payTypeListState['loading'],
        visible: payTypeListState['visible'],
        info: payTypeListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       payTypeListAction.payTypeGetTableData,
        changeModalVisible: payTypeListAction.payTypeChangeModalVisible,
        changeModalInfo:    payTypeListAction.payTypeChangeModalInfo,
        addModel:         payTypeListAction.payTypeAddTableData,
        updateModel:      payTypeListAction.payTypeUpdateTableData,
        deleteModel:        payTypeListAction.deleteModel
    },dispatch)
}

PayTypeList.PropTypes ={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PayTypeList));