import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { CommonTable, UrgePersonModal, CopyText } from 'components';
import { overdueOrderDistributeAction } from './index';
import SearchList from './SearchList/SearchList';
import { convertMoneyFormat } from 'utils';
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { select } from 'redux-saga/effects';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";



class OverdueOrderDistribute extends Component {
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        this.state = {
            isSuperAdmin,
            allMerchants,
            // selectedRowKeys: []
            pageSize: 10
        };

        //存储搜索参数
        this.searchPrams = {};

        this.initParam = {
            pageNum: 1,
            collectorId: 0,
            pageSize: 10,
            merchantId: '',
            time: [ moment(0, 'HH'), moment({ hour: 23, minute: 59, seconds: 59 }) ]
        };

        this.columns = [
          { title: this.props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', render(text) { return <CopyText text={text} /> } },
          {
            title: <FormattedMessage id="page.search.list.product.name" />,
            dataIndex: "productName",
            key: "productName",
            render(text) { return <CopyText text={text} isEllispsis={true} /> }
          },
          {
            title: <FormattedMessage id='page.table.appName' />,
            dataIndex: "appName",
            key: "appName",
            render(text) { return <CopyText text={text} isEllispsis={true} /> }
          },
          { title: this.props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName', render(text) { return <CopyText text={text} /> } },
          { title: this.props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone', width: '10%', render(text) { return <CopyText text={text} /> } },
          {
            title: this.props.intl.formatMessage({ id: "page.table.loan" }),
            dataIndex: 'deviceMoney',
            key: 'deviceMoney',
            render(text, record) {
              return <CopyText text={convertMoneyFormat(text)} />;
            }
          },
          { title: this.props.intl.formatMessage({ id: "page.table.num.extend.period" }), dataIndex: 'lengNum', key: 'lengNum', width: '8%' },
          {
            title: this.props.intl.formatMessage({ id: "page.table.overdue.time" }),
            dataIndex: 'expireTime',
            key: 'expireTime',
            render(text) {
              return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
          },
          { title: this.props.intl.formatMessage({ id: "page.table.collect.depart" }), dataIndex: 'departmentName', key: 'departmentName' }
          // { title: '上次催收人', dataIndex: 'lastPerson', key: 'lastPerson' }
        ]

        if(isSuperAdmin) {
          this.columns.unshift({
            title: props.intl.formatMessage({id: "page.search.list.merchantName"}),
            dataIndex: 'merchantName',
            key: 'merchantName'
          })
        }


        this.convertParams = (obj) => {
            const { collectorId, pageNum, pageSize, time, userPhone, merchantId } = obj;
            console.log("merchantId", merchantId);
            const isArr = Array.isArray(time) && time.length > 0;
            return {
                startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
                endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
                collectorId: collectorId,
                userPhone: userPhone,
                pageNum: pageNum,
                pageSize: pageSize,
                merchantId,
            };
        }
    }

    //选择订单
    onSelectChange = (selectedRowKeys) => {
        const {changeSelectKeys} = this.props;
        changeSelectKeys(selectedRowKeys);
    }
    //点击分配订单
    distributeOrder = () => {
        // const { selectedRowKeys } = this.state;
        const {selectKeys, intl} = this.props;
        const {changeModalVisible, personData} = this.props;
        //是否有选中订单
        const isSelected = selectKeys.length > 0;
        if (!isSelected) {
            message.warn(intl.formatMessage({id: "windowPage.select.order"}));
            return;
        }
        if (personData.length === 0) {
            message.warn(intl.formatMessage({id: "windowPage.no.collector"}));
            return;
        }
        //打开催收人弹框
        changeModalVisible(true);
    }
    //关闭催收人弹框
    onModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }
    //点击弹框确定按钮,分配订单
    onModalOk = (obj) => {
        // const { selectedRowKeys } = this.state;
        const {selectKeys} = this.props;
        const {pageSize} = this.state;
        const {distributeOrder, getTableData, personType} = this.props;
        // const collectorId = obj['person'];
        let key = personType === 'group' ? 'departmentIds' : 'collectorIds';
        //todo 分配订单回调？

        distributeOrder({ disIds: selectKeys.join(','), [key]: obj.join(',') }, () => {
            getTableData({pageSize: pageSize, pageNum: 1, collectorId: 0, ...this.searchPrams });
        });
    }
    //搜索
    handleSearch = (obj) => {
        const {getTableData} = this.props;
        const {pageSize} = this.state;
        const time = obj['time'];
        const isArr = Array.isArray(time) && time.length > 0;
        const params = {
            startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
            endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
            userPhone: obj['userPhone'],
            merchantId: obj['merchantId'],
        };
        this.searchPrams = params;
        getTableData({...params, pageSize: pageSize, pageNum: 1, collectorId: 0});
    }
    //分页
    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        this.setState({...this.state, pageSize});
        getTableData({collectorId: 0, pageNum: current, pageSize, ...this.searchPrams});
    }

    componentDidMount() {
        const { getTableData, getPersonData } = this.props;
        getTableData(this.convertParams(this.initParam));
        getPersonData({ roleId: 8 });
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({data: [], pagination: {}});
    }

    render() {
        const {
            tableData: {data, pagination},
            loading,
            visible,
            personData,
            selectKeys
        } = this.props;
        const rowSelection = {
            selectedRowKeys: selectKeys,
            onChange: this.onSelectChange
        };
        const pageInfo = {...pagination, pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500", "1000", "2000"]}  //客戶要求1000、2000的分頁數
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} init={this.initParam} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}/>
                <div><Button type={'primary'} onClick={this.distributeOrder}><FormattedMessage id="windowPage.distribute.order"/></Button></div>
                <CommonTable
                    rowSelection={rowSelection}
                    columns={this.columns}
                    handlePageChange={this.handlePageChange}
                    dataSource={data}
                    pagination={pageInfo}
                    loading={loading}
                />
                <UrgePersonModal
                    onModalCancel={this.onModalCancel}
                    onModalOk={this.onModalOk}
                    urgePerson={personData}
                    visible={visible}
                    modalTitle={"windowPage.select.collector"}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {afterLoanManageState: {overdueOrderDistributeState}} = state;
    return {
        tableData: overdueOrderDistributeState['data'],
        loading: overdueOrderDistributeState['loading'],
        visible: overdueOrderDistributeState['visible'],
        personData: overdueOrderDistributeState['personData'],
        selectKeys: overdueOrderDistributeState['selectKeys'],
        personType: overdueOrderDistributeState['personType']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueOrderDistributeAction.oodGetTableData,
        setTableData: overdueOrderDistributeAction.oodSetTableData,
        getPersonData: overdueOrderDistributeAction.oodGetPersonData,
        changeModalVisible: overdueOrderDistributeAction.oodChangeModalVisible,
        distributeOrder: overdueOrderDistributeAction.oodDistributeOrder,
        changeSelectKeys: overdueOrderDistributeAction.oodChangeSelectKey
    }, dispatch);
}

OverdueOrderDistribute.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueOrderDistribute));
