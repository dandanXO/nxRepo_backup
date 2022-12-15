import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonTable, UrgePersonModal, CopyText } from 'components';
import { bindActionCreators } from 'redux';
import { Button, Icon, Tooltip } from 'antd';
import moment from 'moment';
import { todayListAction } from './index';
import SearchList from './SearchList/SearchList';
import styles from './TodayList.less';
import { message } from "antd/lib/index";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import {getIsSuperAdmin, getAllMerchants} from "utils";

const statusObj = {
    "0": <FormattedMessage id="page.search.list.outstanding"/>,
    "1": <FormattedMessage id="page.search.list.repaid"/>,
    "3": <FormattedMessage id="page.search.list.partial.repaid"/>
}

class TodayList extends Component {
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        this.state = {
            btnDisabled: false,
            isSuperAdmin,
            allMerchants

        };
        const _this = this;
        this.initSearchParams = {
            time: [moment(0, 'HH'), moment({ hour: 23, minute: 59, seconds: 59 }).add(1, 'd')],
            phoneNo: '',
            name: '',
            orderNo: '',
            orderStatus: '0',
            person: '',
        };
        this.convertParams = (obj) => {
            const {personType} = this.props;
            let key = personType === 'group' ? 'departmentId' : 'collectorId';
            const { time, phoneNo, name, orderNo, orderStatus, person } = obj;
            const isArr = Array.isArray(time) && time.length > 0;
            return {
                startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
                endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
                status: orderStatus,
                userPhone: phoneNo,
                userTrueName: name,
                orderNo,
                [key]: person,
            };
        }
        this.columns = [
            {
                title: props.intl.formatMessage({id: "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width: '3%',
                render(text, record) {
                    const {userId} = record;
                    return (
                        <Tooltip title={_this.props.intl.formatMessage({id: "page.table.view.detail"})}>
                            <div onClick={() => _this.handleLookDetail(text, userId)} className={styles.operatorWrapper}>
                                <Icon type="exception"/>
                            </div>
                        </Tooltip>
                    );
                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.distribute.time"}),
                dataIndex: 'distributionTime',
                key: 'distributionTime',
                width: '11%',
                render(text) {
                    return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {title: props.intl.formatMessage({id: "page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo', width: '13%', render(text) { return <CopyText text={text} /> } },
            {
                title: <FormattedMessage id="page.search.list.product.name" />,
                dataIndex: "productName",
                key: "productName",
                width:'10%',
                render(text) { return <CopyText text={text} isEllispsis={true} /> }
            },
            {
                title: <FormattedMessage id="page.table.appName" />,
                dataIndex: "appName",
                key: "appName",
                width:'10%',
                render(text) { return <CopyText text={text} isEllispsis={true} /> }
            },
            {title: props.intl.formatMessage({id: "page.search.list.name"}), dataIndex: 'userTrueName', key: 'userTrueName', width: '8%', render(text) { return <CopyText text={text} isEllispsis={true}/> } },
            // { title: '手机型号', dataIndex: 'deviceModel', key: 'deviceModel' },
            // { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
            {
                title: props.intl.formatMessage({id: "page.table.loan"}),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                width: '6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            // { title: '展期次数', dataIndex: 'lengNum', key: 'lengNum' },
            {
                title: props.intl.formatMessage({id: "page.table.amount.due.currency"}),
                dataIndex: 'payable',
                key: 'payable',
                width: '6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.reduce.amount.currency"}),
                dataIndex: 'reductionAmt',
                key: 'reductionAmt',
                width: '6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.amount.paid.currency"}),
                dataIndex: 'payMoney',
                key: 'payMoney',
                width: '6%',
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.order.status"}),
                dataIndex: 'status',
                key: 'status',
                width: '5%',
                render(text) {
                    return statusObj[text] || '';
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.designator"}),
                dataIndex: 'distributionName',
                key: 'distributionName',
                width: '8%',
                render(text) {
                    return text;
                }
            },
            {
                title: props.intl.formatMessage({id: "windowPage.collector"}),
                dataIndex: 'collectorName',
                key: 'collectorName',
                width: '7%',
                render(text) {
                    return text;
                    // const { personData } = _this.props;
                    // const obj = personData.find(item => Number(item.value) === Number(text));
                    // console.log(obj);
                    // return  obj ? obj['name'] : '';
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.expiration.time" }),
                dataIndex: 'expireTime',
                key: 'expireTime',
                width: '11%',
                render(text) {
                    return moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")
                }
            }

        ];
        if (isSuperAdmin) {
            this.columns.splice(1,0,{
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'merchantName',
                key: 'merchantName',
                width: 90
            })
        }

    }


    //导出记录
    exportRecord = (obj) => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const {searchParams} = this.props;
        const searchStatus = this.convertParams(searchParams);
        axios({
            url: "/hs/admin/orderToday/todayListDownLoad",
            method: "post",
            responseType: "blob",
            data: searchStatus
        })
            .then(res => {
                hide && hide();
                this.setState({btnDisabled: false});
                download(res, this.props.intl.formatMessage({id: "page.today.list.export"}, {expDate: Date.now()}));
            })
            .catch(() => {
                hide && hide();
                this.setState({btnDisabled: false});
            });
    };

    //查看详情
    handleLookDetail = (id, userId) => {
        const {history: {push}} = this.props;
        push({
            pathname: `/todayList/${id}`,
            state: { userId }
        })
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

    //搜索
    handleSearch = (obj) => {
        const {setSearchParams, getTableData} = this.props;
        setSearchParams(obj);
        const params = this.convertParams(obj);
        getTableData({...params, pageNum: 1, pageSize: 10});
    }
    //分页
    handlePageChange = (info) => {
        const {pageSize, current} = info;
        const {getTableData, searchParams} = this.props;
        const params = this.convertParams(searchParams);
        getTableData({...params, pageSize, pageNum: current});
    }

    //关闭催收人弹框
    onModalCancel = () => {
        const {changeModalVisible} = this.props;
        changeModalVisible(false);
    }
    //点击弹框确定按钮,分配订单
    onModalOk = (obj) => {
        // const { selectedRowKeys } = this.state;
        // const { selectKeys } = this.props;
        const {distributeOrder, getTableData, searchParams, selectKeys, tableData: {pagination}, personType} = this.props;
        // const collectorId = obj['person'];

        // let key = personType === 'group' ? 'departmentId' : 'collectorId';

        //todo 分配订单回调？ type 1 = 订单分配 , type2 = 重新分配 ( 逾期的沒有type )
        distributeOrder({type: 2, disIds: selectKeys.join(','), personIds: obj.join(',')}, () => {
            let params = this.convertParams(searchParams);
            params = {...params, pageSize: pagination['pageSize'] || 10, pageNum: pagination['current'] || 1};
            getTableData(params);
        });
    }

    componentDidMount() {
        const { setSearchParams, getTableData, tableData: { pagination }, getPerson, personData } = this.props;
        setSearchParams(this.initSearchParams);
        let params = this.convertParams(this.initSearchParams);
        params = { ...params, pageSize: pagination['pageSize'] || 10, pageNum: pagination['current'] || 1 };
        getPerson({ roleId: 8 }, () => {
            getTableData(params);
        });
    }

    //todo 是否清理列表以及选择数据
    componentWillUnmount() {
        // const { location: { pathname } } = this.props;
        // const isOk = pathname.indexOf()
    }


    render() {
        const {
            tableData: {data, pagination},
            loading,
            searchParams,
            visible,
            selectKeys,
            personData
        } = this.props;
        const rowSelection = {
            selectedRowKeys: selectKeys,
            onChange: this.onSelectChange
        };
        const {btnDisabled} = this.state;
        const pageInfo = {...pagination, pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500", "1000", "2000"]} //客戶要求1000、2000的分頁數

        return (
            <div>
                <SearchList handleSubmit={this.handleSearch} params={searchParams} personData={personData}/>
                <div>
                    <span>
                        <Button type={'primary'} onClick={this.distributeOrder}><FormattedMessage id="page.table.redistribute.order"/></Button>
                    </span>
                    <span className={styles.btnStyle}>
                        <Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button>
                    </span>
                </div>
                <CommonTable
                    columns={this.columns}
                    pagination={pageInfo}
                    handlePageChange={this.handlePageChange}
                    loading={loading}
                    dataSource={data}
                    rowSelection={rowSelection}
                />
                <UrgePersonModal
                    visible={visible}
                    urgePerson={personData}
                    onModalOk={this.onModalOk}
                    onModalCancel={this.onModalCancel}
                    modalTitle={"windowPage.select.collector"}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {todayLoanManageState: {todayListState}} = state;
    return {
        tableData: todayListState['data'],
        loading: todayListState['loading'],
        searchParams: todayListState['params'],
        personData: todayListState['personData'],
        selectKeys: todayListState['selectKeys'],
        visible: todayListState['visible'],
        personType: todayListState['personType']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: todayListAction.todlGetTableData,
        setTableData: todayListAction.todlSetTableData,
        setSearchParams: todayListAction.todlChangeSearchParams,
        getPerson: todayListAction.todlGetPerson,
        changeModalVisible: todayListAction.todlChangeModalVisible,
        distributeOrder: todayListAction.todlDistributeOrder,
        changeSelectKeys: todayListAction.todlChangeSelectKey
    }, dispatch);
}

TodayList.PropTypes = {
    intl: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TodayList));
