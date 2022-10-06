import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { Button, message } from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';
import { CommonTable, UrgePersonModal } from 'components';
import {todayOrderDistributeAction} from './index';
import SearchList from './SearchList/SearchList';
import {convertMoneyFormat} from "utils";
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from "react-intl";


class TodayOrderDistribute extends Component {
    columns = [
        {title: <FormattedMessage id="page.search.list.order.no"/>, dataIndex: 'orderNo', key: 'orderNo'},
        {title: <FormattedMessage id="page.search.list.name"/>, dataIndex: 'userTrueName', key: 'userTrueName'},
        {title: <FormattedMessage id="page.search.list.mobile"/>, dataIndex: 'userPhone', key: 'userPhone'},
        {title: <FormattedMessage id="page.search.list.product.name"/>, dataIndex: 'productName', key: 'productName' },
        {title: <FormattedMessage id="page.table.appName"/>, dataIndex: 'appName', key: 'appName' },
        {
            title: <FormattedMessage id="page.table.loan2"/>,
            dataIndex: 'deviceMoney',
            key: 'deviceMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        // { title: '展期次数', dataIndex: 'lengNum', key: 'lengNum' },
        {
            title: <FormattedMessage id="page.search.list.expiration.time"/>,
            dataIndex: 'expireTime',
            key: 'expireTime',
            render(text) {
                return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
        }
        // ,
        // { title: '催收组', dataIndex: 'departmentName', key: 'departmentName' }
        // { title: '上次催收人', dataIndex: 'lastPerson', key: 'lastPerson' }
    ]

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            // selectedRowKeys: []
        };
        //存储搜索参数
        this.searchPrams = {};
    }

    //选择订单
    onSelectChange = (selectedRowKeys) => {
        const {changeSelectKeys} = this.props;
        changeSelectKeys(selectedRowKeys);
    }
    //点击分配订单
    distributeOrder = () => {
        // const { selectedRowKeys } = this.state;
        const { selectKeys, intl } = this.props;
        const { changeModalVisible, personData } = this.props;
        //是否有选中订单
        const isSelected = selectKeys.length > 0;
        if(!isSelected) {
            message.warn(intl.formatMessage({id : "windowPage.select.order"}));
            return;
        }
        if (personData.length === 0) {
            message.warn(intl.formatMessage({id : "windowPage.no.collector"}));
            return;
        }

        changeModalVisible(true);
    }
    //关闭催收人弹框
    onModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }
    //点击弹框确定按钮,分配订单
    onModalOk = (obj) => {

        const {selectKeys} = this.props;
        const {pageSize} = this.state;
        const {distributeOrder, getTableData, personType} = this.props;

        //let key = personType === 'group' ? 'departmentId' : 'collectorId';
   
        //todo 分配订单回调？ type 1 = 订单分配 , type2 = 重新分配 ( 逾期的沒有type )
        distributeOrder({type: 1, disIds: selectKeys.join(','), personIds: obj.join(',')}, () => {
            getTableData({pageSize: pageSize, pageNum: 1, collectorId: null, ...this.searchPrams});
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
            userPhone: obj['userPhone']
        };
        this.searchPrams = params;
        getTableData({...params, pageSize: pageSize, pageNum: 1, collectorId: null});
    }

    handleAll = () => {
        const {getTableData} = this.props;
        const {pageSize} = this.state;
        const params = {
            userPhone: null
        };
        this.searchPrams = params;
        getTableData({...params, pageSize: pageSize, pageNum: 1, collectorId: 0});
    }

    handleToday = () => {
        const {getTableData} = this.props;
        const {pageSize} = this.state;
        const now = moment();
        const params = {
            startTime: now.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endTime: now.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            userPhone: null
        };
        this.searchPrams = params;
        getTableData({...params, pageSize: pageSize, pageNum: 1, collectorId: 0});
    }

    handleTomorrow = () => {
        const {getTableData} = this.props;
        const tomorrow = moment().add(1, 'days');
        const {pageSize} = this.state;
        const params = {
            startTime: tomorrow.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endTime: tomorrow.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            userPhone: null
        };
        this.searchPrams = params;
        getTableData({...params, pageSize: pageSize, pageNum: 1, collectorId: 0});
    }
    //分页
    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        this.setState({...this.state, pageSize});
        getTableData({collectorId: null, pageNum: current, pageSize, ...this.searchPrams});
    }

    componentDidMount() {
        const {getTableData, getPersonData} = this.props;
        getTableData({collectorId: null, pageSize: 10, pageNum: 1});
        getPersonData({roleId: 8});
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
                <SearchList handleSearch={this.handleSearch}/>
                <div>
                    <Button type={'primary'} onClick={this.distributeOrder}><FormattedMessage id="windowPage.distribute.order"/></Button>
                    <Button type={'primary'} onClick={this.handleAll}><FormattedMessage id="button.todayOrder.all"/></Button>
                    <Button type={'primary'} onClick={this.handleToday}><FormattedMessage id="button.todayOrder.today"/></Button>
                    <Button type={'primary'} onClick={this.handleTomorrow}><FormattedMessage id="button.todayOrder.tomorrow"/></Button>
                </div>

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
    const {todayLoanManageState: {todayOrderDistributeState}} = state;
    return {
        tableData: todayOrderDistributeState['data'],
        loading: todayOrderDistributeState['loading'],
        visible: todayOrderDistributeState['visible'],
        personData: todayOrderDistributeState['personData'],
        selectKeys: todayOrderDistributeState['selectKeys'],
        personType: todayOrderDistributeState['personType']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: todayOrderDistributeAction.toodGetTableData,
        setTableData: todayOrderDistributeAction.toodSetTableData,
        getPersonData: todayOrderDistributeAction.toodGetPersonData,
        changeModalVisible: todayOrderDistributeAction.toodChangeModalVisible,
        distributeOrder: todayOrderDistributeAction.toodDistributeOrder,
        changeSelectKeys: todayOrderDistributeAction.toodChangeSelectKey
    }, dispatch);
}

TodayOrderDistribute.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TodayOrderDistribute));