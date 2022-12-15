import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Switch, Tooltip } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable, CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { payMchListAction } from './index';
import styles from './payMchList.less';
import { axios, getAllMerchants, getIsSuperAdmin } from 'utils';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";

class PayMchList extends Component {

    constructor(props) {
        super(props);
        this.pageSize = 50;
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        this.state = {
            modelId: null,
            allPayPlatList:[],
            allPayTypeList:[],
            pagination: {
                pageSize: this.pageSize
            },
            isSuperAdmin,
            allMerchants

        };
        const _this = this;
        this.columns = [
            {
                title: props.intl.formatMessage({ id: "page.table.is.enabled" }),
                dataIndex: 'isEnabled',
                key: 'isEnabled',
                width: 90,
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
                title: props.intl.formatMessage({ id: "page.search.list.repayement.platfrom" }),
                dataIndex: 'platId',
                key: 'platId',
                width: 260,
                render(text) {
                    let showStr = '';
                    if (!!text) {
                        let { allPayPlatList } = _this.state;
                        let payPlat = allPayPlatList.find(item => item.id == text);
                        if (!!payPlat) {
                            showStr = payPlat.platName + '(' + payPlat.platClass + ')';
                        }
                    }
                    return <CopyText text={showStr} />

                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.collection.mchNo" }),
                dataIndex: 'mchNo',
                key: 'mchNo',
                width: 240,
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.collection.mchName" }),
                dataIndex: 'mchName',
                key: 'mchName',
                width: 220,
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({ id: "windowPage.payment.method" }),
                dataIndex: 'openPayTypeList',
                key: 'openPayTypeList',
                width: 350,
                render(text, record) {
                    let { allPayTypeList } = _this.state;
                    let showStr = '';
                    let ids = !!text ? text.split(',') : [];
                    for (let i in ids) {
                        for (let j in allPayTypeList) {
                            if (allPayTypeList[j].id == ids[i]) {
                                if (showStr.length > 0) {
                                    showStr += ', ';
                                }
                                showStr += allPayTypeList[j].label;
                            }
                        }
                    }
                    return <CopyText text={showStr} />
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.priority" }),
                dataIndex: 'sortNum',
                key: 'sortNum',
                width: 70,
            },
            // {
            //     title: props.intl.formatMessage({id : "page.table.use.for.repayment"}),
            //     dataIndex: 'enabledRepaied',
            //     key: 'enabledRepaied',
            //     render(text) {
            //         var showStr = !!text && text ? props.intl.formatMessage({id : "page.table.yes"}) : props.intl.formatMessage({id : "page.table.no"});
            //         return (
            //             <div>
            //                 <span>{showStr}</span>
            //             </div>
            //
            //         );
            //     }
            // },
            // {
            //     title: props.intl.formatMessage({id : "page.table.bind.bank.card"}),
            //     dataIndex: 'enabledAuthBank',
            //     key: 'enabledAuthBank',
            //     render(text) {
            //         var showStr = !!text && text ? props.intl.formatMessage({id : "page.table.yes"}) : props.intl.formatMessage({id : "page.table.no"});
            //         return (
            //             <div>
            //                 <span>{showStr}</span>
            //             </div>
            //
            //         );
            //     }
            // },
            {
                title: props.intl.formatMessage({ id: "windowPage.add.time" }),
                dataIndex: 'createDate',
                key: 'createDate',
                width: 160,
                render(text) {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.last.modify.time" }),
                dataIndex: 'modifyDate',
                key: 'modifyDate',
                width: 160,
                render(text) {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: 90,
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

        if (isSuperAdmin) {
            this.columns.splice(1,0,{
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'dlhMerchantName',
                key: 'dlhMerchantName',
                width: 90
            })
        }

        this.searchParams = {  platId:'', mchNo:'', mchName:'', startDate:'', endDate:'', dlhMerchantId:'' };
    }

    //添加
    handleAddModel = () => {
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: null });
        changeModalVisible(true);
        changeModalInfo({ dlhMerchantId: '', mchNo: '', mchName: '', mchKey: '', mchKey2: '', platId: '', rate: '', openTime: '', payMoneyList: '', callbackHost: '', openPayTypeList: '', enabledRepaied: true, enabledAuthBank: false, isEnabled: true, sortNum: 99, business1Field: '', business2Field: '', business3Field: '', openDays: '', startTime: '', endTime: ''});
    }
    //修改
    modifyModel = (record) => {
        const {dlhMerchantId, id, mchNo, mchName, mchKey, mchKey2, platId, rate, openTime, payMoneyList, callbackHost, openPayTypeList, forFirst, isEnabled, sortNum, file1Id, file2Id, enabledRepaied, enabledAuthBank, business1Field, business2Field, business3Field, openDays, startTime, endTime } = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: id });
        changeModalInfo({ ...record, dlhMerchantId, mchNo, mchName, mchKey, mchKey2, platId, rate, openTime, payMoneyList, callbackHost, openPayTypeList, payTypeIds: openPayTypeList.split(','), forFirst, isEnabled, sortNum, file1Id, file2Id, enabledRepaied, enabledAuthBank, business1Field, business2Field, business3Field, openDays, startTime, endTime });
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
        const { addModel, updateModel, changeModalVisible, getTableData } = this.props;

        const { payTypeIds } = obj;
        let ids = [''];
        if(Array.isArray(payTypeIds)) {
            ids = [...payTypeIds];
        }
        obj.openPayTypeList = ids.join(',');

        if(modelId) {
            updateModel({ ...obj, id: modelId });
        } else {
          addModel(obj);
        }

    }

    handleSearch = (obj) => {
      console.log("obj", obj)
        let { time, platId, mchNo, mchName, dlhMerchantId = '' } = obj;
        const { getTableData } = this.props;
        let startDate = '', endDate = '';
        if (Array.isArray(time)) {
            [startDate, endDate] = time.map(item => item.format('YYYY-MM-DD'));
            if (!!startDate) {
                startDate += ' 00:00:00';
            }
            if (!!endDate) {
                endDate += ' 23:59:59';
            }
        }

        const params = { platId, mchNo, mchName, startDate, endDate, dlhMerchantId, pageSize: this.pageSize, pageNum: 1 };
        this.searchParams = params;
        console.log("params", params);
        getTableData(params);
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.setState({ pagination });
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    }

    handleToggleMchEnabled = (record) => {
        const { payMchToggleEnabled } = this.props;
        // toggle enabled
        record.isEnabled = record.isEnabled && record.isEnabled == 1 ? 0 : 1;
        // save
        payMchToggleEnabled({ id: record.id, isEnabled: record.isEnabled });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize: this.pageSize, pageNum: 1 });
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
                    // console.dir(content);
                }
            });
        } catch (e) {
        }
        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayPlat/list',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data: { content }} = res;
                    // content = content.map(item => ({ id: item.id, pId: 0, value: item.id + '', label: item.typeName+'('+item.typeAlias+')' }));
                    _this.setState({
                        allPayPlatList: content || []
                    });
                    // console.dir(content);
                }
            });
        } catch (e) {
        }
    }

    render() {
        const { pagination } = this.state;
        const { tableData: { data }, loading, visible, info } = this.props;
        const { allPayPlatList,allPayTypeList } = this.state;
        return (
            <div>
                <SearchList
                    allPayPlatList={allPayPlatList}
                    handleSearch={this.handleSearch}
                    isSuperAdmin={this.state.isSuperAdmin}
                    allMerchants={this.state.allMerchants}
                />
                <Button type={'primary'} onClick={this.handleAddModel}><FormattedMessage id="page.table.add" /></Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} scroll={{x:'100%'}}/>
                <EditModel
                    visible={visible}
                    allPayPlatList={allPayPlatList}
                    allPayTypeList={allPayTypeList}
                    info={info}
                    handleCancel={this.handleModalCancel}
                    handleOk={this.handleModalOk}
                    isSuperAdmin={this.state.isSuperAdmin}
                    allMerchants={this.state.allMerchants}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { payMchListState } } = state;

    return {
        tableData: payMchListState['data'],
        loading: payMchListState['loading'],
        visible: payMchListState['visible'],
        info: payMchListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: payMchListAction.payMchGetTableData,
        changeModalVisible: payMchListAction.payMchChangeModalVisible,
        changeModalInfo: payMchListAction.payMchChangeModalInfo,
        addModel: payMchListAction.payMchAddTableData,
        updateModel: payMchListAction.payMchUpdateTableData,
        deleteModel: payMchListAction.deleteModel,
        payMchToggleEnabled: payMchListAction.payMchToggleEnabled
    }, dispatch)
}

PayMchList.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PayMchList));
