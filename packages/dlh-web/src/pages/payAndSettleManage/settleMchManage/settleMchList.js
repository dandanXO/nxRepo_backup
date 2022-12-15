import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Switch, Tooltip } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable, CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { settleMchListAction } from './index';
import styles from './settleMchList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios } from 'utils';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";
import {getIsSuperAdmin, getAllMerchants} from "utils";

class SettleMchList extends Component {

    constructor(props) {
        super(props);
        this.pageSize = 50;
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        this.state = {
            modelId: null,
            allSettlePlatList:[],
            pagination: {
                pageSize: this.pageSize
            },
            isSuperAdmin,
            allMerchants

        };
        const _this = this;
        this.columns =[
            {
                title: props.intl.formatMessage({ id: "page.table.is.enabled" }),
                dataIndex: 'isEnabled',
                key: 'isEnabled',
                width:'7%',
                render(text, record) {
                    return (
                        <div>
                            <Switch checkedChildren={"ON"}
                                    unCheckedChildren={"OFF"}
                                    defaultChecked={record && record.isEnabled}
                                    checked={record && record.isEnabled}
                                    onChange={() => _this.handleToggleMchEnabled(record)}
                                    size="small"
                            />
                        </div>
                    );
                }
            },
            {
                title: props.intl.formatMessage({id : "page.search.list.payment.platId"}),
                dataIndex: 'platId',
                key: 'platId',
                width:'23%',
                render(text) {
                    let showStr = '';
                    if(!!text){
                        let {allSettlePlatList} = _this.state;
                        let settlePlat = allSettlePlatList.find(item => item.id == text);
                        if(!!settlePlat){
                            showStr = settlePlat.platName+'('+settlePlat.platClass+')';
                        }
                    }
                    return <CopyText text={showStr} />
                }
            },
            {
                title: props.intl.formatMessage({id : "page.search.list.payment.mchNo"}),
                dataIndex: 'mchNo',
                key: 'mchNo',
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({id : "page.search.list.payment.mchName"}),
                dataIndex: 'mchName',
                key: 'mchName',
                width:'13%',
                render(text) { return <CopyText text={text} /> }
            },
            // {
            //     title: props.intl.formatMessage({id : "windwoPage.rate.per.thousands"}),
            //     dataIndex: 'rate',
            //     key: 'rate'
            // },
            {
                title: props.intl.formatMessage({id : "page.table.priority"}),
                dataIndex: 'sortNum',
                key: 'sortNum',
                width:'6%',
            },
            {
                title: props.intl.formatMessage({id : "windowPage.add.time"}),
                dataIndex: 'createDate',
                key: 'createDate',
                width:'13%',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.last.modify.time"}),
                dataIndex: 'modifyDate',
                key: 'modifyDate',
                width:'13%',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width:'7%',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={_this.props.intl.formatMessage({id : "page.table.modify"})}>
                                <span onClick={() => _this.modifyModel(record)}><Icon type={'file-text'}/></span>
                            </Tooltip>
                            <Tooltip title={_this.props.intl.formatMessage({id : "page.table.delete"})}>
                                <span onClick={() => _this.deleteModel(record)}><Icon type={'delete'}/></span>
                            </Tooltip>
                        </div>
                    );
                }
            },
        ];
        if (isSuperAdmin) {
            this.columns.unshift({
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'merchantName',
                key: 'merchantName',
                width: 90
            })
        }

        this.searchParams = { platId:'', mchNo:'', mchName:'', startDate:'', endDate:'', merchantId:'', pageSize: this.pageSize, pageNum: 1 };
    }

    //添加
    handleAddModel = () => {
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: null });
        changeModalVisible(true);
        changeModalInfo({  mchNo:'',mchName:'',mchKey:'',mchKey2:'',platId:'',rate:'',openTime:'',settleMoneyList:'',file1Id:'',file2Id:'',callbackHost:'',forFirst:false,isEnabled:true,sortNum:99,business1Field:"",business2Field:"",business3Field:"" });
    }
    //修改
    modifyModel = (record) => {
        const { id,mchNo,mchName,mchKey,mchKey2,platId,rate,openTime,settleMoneyList,callbackHost,forFirst,isEnabled,sortNum,file1Id,file2Id,business1Field,business2Field,business3Field} = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: id });
        changeModalInfo({ mchNo,mchName,mchKey,mchKey2,platId,rate,openTime,settleMoneyList,callbackHost,settleTypeIds:forFirst,isEnabled,sortNum,file1Id,file2Id,business1Field,business2Field,business3Field });
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
        const { modelId } = this.state;
        const { addModel, updateModel } = this.props;

        if(modelId) {
            updateModel({ ...obj, id: modelId });
            return;
        }
        addModel(obj);
    }

    handleSearch = (obj) => {
        let { time, platId, mchNo, mchName, merchantId = '' } = obj;
        const { getTableData } = this.props;
        let startDate = '', endDate = '';
        if (Array.isArray(time)) {
            [startDate, endDate] = time.map(item => item.format('YYYY-MM-DD'));
            if (!!startDate) {
                startDate += ' 00:00:00.0';
            }
            if (!!endDate) {
                endDate += ' 23:59:59.999';
            }
        }

        const params = { platId, mchNo, mchName, startDate, endDate, merchantId, pageSize: this.pageSize, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.setState({ pagination });
        getTableData({ ...this.searchParams, pageSize, pageNum: current });
    }

    handleToggleMchEnabled = (record) => {
        const { settleMchToggleEnabled } = this.props;
        // toggle enabled
        record.isEnabled = record.isEnabled && record.isEnabled == 1 ? 0 : 1;
        // save
        settleMchToggleEnabled({ id: record.id, isEnabled: record.isEnabled });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize: this.pageSize, pageNum: 1 });

        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettlePlat/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    _this.setState({
                        allSettlePlatList: content || []
                    });
                }
            });
        } catch (e) {
        }
    }

    render() {
        const { pagination } = this.state;
        const { tableData: { data }, loading, visible, info } = this.props;
        const { allSettlePlatList } = this.state;
        return (
            <div>
                <SearchList allSettlePlatList={allSettlePlatList} handleSearch={this.handleSearch} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <Button type={'primary'} onClick={this.handleAddModel}><FormattedMessage id="page.table.add" /></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <EditModel visible={visible} allSettlePlatList={allSettlePlatList} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { settleMchListState } } = state;
    const data = settleMchListState['data'];
    const originalRows = data.data;
    if (originalRows && Array.isArray(originalRows)) {
        data.data = originalRows.map(row => ({ enableDetails: { isEnabled: row.isEnabled, id: row.id, isLoading: row.isLoading || false }, ...row }));
    }

    return {
        tableData: data,
        loading: settleMchListState['loading'],
        visible: settleMchListState['visible'],
        info: settleMchListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: settleMchListAction.settleMchGetTableData,
        changeModalVisible: settleMchListAction.settleMchChangeModalVisible,
        changeModalInfo: settleMchListAction.settleMchChangeModalInfo,
        addModel: settleMchListAction.settleMchAddTableData,
        updateModel: settleMchListAction.settleMchUpdateTableData,
        deleteModel: settleMchListAction.deleteModel,
        settleMchToggleEnabled: settleMchListAction.settleMchToggleEnabled,
    },dispatch)
}

SettleMchList.PropTypes ={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettleMchList));
