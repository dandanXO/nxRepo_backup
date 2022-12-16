import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {todayStatisticsAction} from './index';
import moment from 'moment';
import { CommonTable,CopyText } from 'components';
import SearchList from './SeachList/SearchList';
import { message,Tabs } from "antd";
import { convertMoneyFormat } from "utils";
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';
import {getIsSuperAdmin, getAllMerchants} from "utils";
const { TabPane } = Tabs;
class TodayStatistics extends Component{
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();

        this.state = {
            btnDisabled:false,
            isSuperAdmin,
            allMerchants

        };
        this.initTime={
            time: [moment(0, "HH").add(-30,'d'), moment({ hour: 23, minute: 59, seconds: 59 })],
            distributeTime: []
        }
        this.searchParams = {...this.initTime};
        this.searchCollectorParams = {...this.initTime};
        this.allColumns = [
            { title: props.intl.formatMessage({id : "page.search.list.expiration.time"}), dataIndex: 'day', key: 'day' ,width:110},
            { title: props.intl.formatMessage({id : "page.table.onday.due.order.total"}), dataIndex: 'todaySumCount', key: 'todaySumCount' ,width:130},
            {
                title: props.intl.formatMessage({id : "page.table.onday.due.principal.total"}),
                dataIndex: 'todaySumLendMoney',
                key: 'todaySumLendMoney',
                width:130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.onday.due.contract.amount"}),
                dataIndex: 'todaySumDeviceMoney',
                key: 'todaySumDeviceMoney',
                width:130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.onday.num.repayment.order"}),
                dataIndex: 'todaySumBackCount',
                key: 'todaySumBackCount',
                width:140,
                render(text, record) {
                    const res =  text == null || text == ''? 0 : text;
                    return res;
                }
            },
            // { title: '当日还款总笔数', dataIndex: 'todaySumBackLendMoney', key: 'todaySumBackLendMoney' },
            {
                title: props.intl.formatMessage({id : "page.table.onday.repayment.amount.total"}),
                dataIndex: 'todaySumBackTotalMoney',
                key: 'todaySumBackTotalMoney',
                width:130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.onday.order.repayment.rate"}), dataIndex: 'sumBackNumRate', key: 'sumBackNumRate',width:150 },
            { title: props.intl.formatMessage({id : "page.table.onday.amount.collect"}), dataIndex: 'sumBackAmtRate', key: 'sumBackAmtRate' ,width:120 },
            { title: props.intl.formatMessage({id : "page.search.customer.service"}), dataIndex: 'collectName', key: 'collectName' ,width:120 },
            {
                title: props.intl.formatMessage({id : "page.table.num.allocat.order"}),
                dataIndex: 'todayCount',
                key: 'todayCount',
                width:110, 
                render(text, record) {
                    const res =  text == null || text == ''? 0 : text;
                    return res;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.allocat.amount"}),
                dataIndex: 'todayDeviceMoney',
                key: 'todayDeviceMoney',
                width:90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.num.repayment.order"}),
                dataIndex: 'todayBackCount',
                key: 'todayBackCount',
                width:110, 
                render(text, record) {
                    const res =  text == null || text == ''? 0 : text;
                    return res;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.repayment.amount"}),
                dataIndex: 'todayBackDeviceMoney',
                key: 'todayBackDeviceMoney',
                width:90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.repayment.order.rate"}), dataIndex: 'todaySumBackNumRate', key: 'todaySumBackNumRate' ,width:120},
            { title: props.intl.formatMessage({id : "page.table.repayment.amount.rate"}), dataIndex: 'todaySumBackAmtRate', key: 'todaySumBackAmtRate' ,width:100},
        ];

        this.collectorsColumns = [
            { title: props.intl.formatMessage({id : "page.search.list.expiration.time"}), dataIndex: 'day', key: 'day' ,width:110},
            { title: props.intl.formatMessage({id : "page.search.customer.service"}), dataIndex: 'collectName', key: 'collectName' ,width:120 },
            {
                title: props.intl.formatMessage({id : "page.table.num.allocat.order"}),
                dataIndex: 'todayCount',
                key: 'todayCount',
                width:110, 
                render(text, record) {
                    const res =  text == null || text == ''? 0 : text;
                    return res;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.allocat.amount"}),
                dataIndex: 'todayDeviceMoney',
                key: 'todayDeviceMoney',
                width:90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.num.repayment.order"}),
                dataIndex: 'todayBackCount',
                key: 'todayBackCount',
                width:110, 
                render(text, record) {
                    const res =  text == null || text == ''? 0 : text;
                    return res;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.repayment.amount"}),
                dataIndex: 'todayBackDeviceMoney',
                key: 'todayBackDeviceMoney',
                width:90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.repayment.order.rate"}), dataIndex: 'todaySumBackNumRate', key: 'todaySumBackNumRate' ,width:120},
            { title: props.intl.formatMessage({id : "page.table.repayment.amount.rate"}), dataIndex: 'todaySumBackAmtRate', key: 'todaySumBackAmtRate' ,width:100},
        ];

        if (isSuperAdmin) {
            this.allColumns.unshift({
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'merchantName',
                key: 'merchantName',
                width:90
            })

            this.collectorsColumns.unshift({
                title: props.intl.formatMessage({ id: "page.search.list.merchantName" }),
                dataIndex: 'merchantName',
                key: 'merchantName',
                width:90
            })
        }

    }

    handleSearch = (searchObj) => {
        const { getTableData, getCollectorsData } = this.props;
        const { type, obj } = searchObj;
        type === 'all' ? this.searchParams = obj : this.searchCollectorParams = obj;
        const params = { ...this.convertParams(type, obj), page: 0, size: 10 };
        type === 'all' ? getTableData(params) : getCollectorsData(params);
    };


    convertParams = (type, searchType) => {
        const { time, distributeTime, merchantId = '' } = searchType;
        const isArr = Array.isArray(time) && time.length > 0;
        const startTime = isArr ? time[0].format("YYYY-MM-DD 00:00:00") : "";
        const endTime = isArr ? time[1].format("YYYY-MM-DD 23:59:59") : "";
        const fstartTime = Array.isArray(distributeTime) && distributeTime.length > 0 ? distributeTime[0].format("YYYY-MM-DD 00:00:00") : "";
        const fendTime = Array.isArray(distributeTime) && distributeTime.length > 0 ? distributeTime[1].format("YYYY-MM-DD 23:59:59") : "";
        const params = { startTime, endTime, fstartTime, fendTime, merchantId }
        return type === 'all' ? { ...params } : { ...params, collectorId: searchType.collectorId };
    }

    componentDidMount () {
        const { getTableData, getCollectorsData } = this.props;
        const params = this.convertParams('all', { ...this.searchParams })
        const collectorParams = this.convertParams('collector', { ...this.searchCollectorParams })
        getTableData({ ...params, page: 0, size: 10 });
        getCollectorsData({ ...collectorParams, page: 0, size: 10 });
    }
    componentWillUnmount () {
        const { setTableData, setCollectorsData } = this.props;
        setTableData([]);
        setCollectorsData([]);
    }

    //导出记录
    exportRecord = ({ type, obj }) => {
        this.setState({ btnDisabled: true }, () => {
            message.loading(this.props.intl.formatMessage({ id: "page.table.exporting" }), 3);
            const searchStatus = this.convertParams(type, obj);
            const urlText = type === 'all' ? 'getDayOrderSummaryReportDownload' : 'getDayOrderCollectorReportDownload';
            let urlParams = '';
            Object.entries(searchStatus).forEach(i => urlParams += `${i[0]}=${i[1]}&`);
            window.open(`/hs/admin/orderToday/${urlText}?${urlParams}`);
            this.setState({ btnDisabled: false });
        });
    };

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        const params = this.convertParams('all',{...this.searchParams})
        getTableData({ ...params, page: current - 1, size: pageSize });
    }

    handleCollectorPageChange = (info) => {
        const { current, pageSize } = info;
        const { getCollectorsData } = this.props;
        const collectorParams = this.convertParams('collector',{...this.searchCollectorParams})
        getCollectorsData({ ...collectorParams ,page: current - 1, size: pageSize});
    }

    render() {
        const { tableData, loading, collectorData, collectorLoading, intl } = this.props;
        const { btnDisabled } = this.state;
        const tabAllText = intl.formatMessage({ id: "windowPage.all" });
        const tabCollectorText = intl.formatMessage({ id: "windowPage.collectors" })
        return (
            <div>
                <Tabs animated={false}>
                    <TabPane tab={intl.formatMessage({ id: "windowPage.overdueStatistics" }, { type: tabAllText })} key="1">
                        <SearchList
                            handleSearch={this.handleSearch}
                            initTime={this.initTime}
                            exportRecord={this.exportRecord}
                            btnDisable={btnDisabled}
                            type={"all"}
                            isSuperAdmin={this.state.isSuperAdmin}
                            allMerchants={this.state.allMerchants}
                        />
                        <CommonTable
                            columns={this.allColumns}
                            dataSource={tableData.data}
                            loading={loading}
                            scroll={{ x: "100%" }}
                            pagination={tableData.pagination}
                            handlePageChange={this.handlePageChange}
                        />
                    </TabPane>
                    <TabPane tab={intl.formatMessage({ id: "windowPage.overdueStatistics" }, { type: tabCollectorText })} key="2">
                        <SearchList
                            handleSearch={this.handleSearch}
                            initTime={this.initTime}
                            exportRecord={this.exportRecord}
                            btnDisable={btnDisabled}
                            type={"collector"}
                            isSuperAdmin={this.state.isSuperAdmin}
                            allMerchants={this.state.allMerchants}
                        />
                        <CommonTable
                            columns={this.collectorsColumns}
                            dataSource={collectorData.data}
                            loading={collectorLoading}
                            scroll={{ x: "100%" }}
                            pagination={collectorData.pagination}
                            handlePageChange={this.handleCollectorPageChange}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { todayStatisticsState } } = state;
    return {
        tableData: todayStatisticsState['tableData'],
        loading: todayStatisticsState['loading'],
        collectorData: todayStatisticsState['collectorData'],
        collectorLoading: todayStatisticsState['collectorLoading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: todayStatisticsAction.tdGetTableData,
        setTableData: todayStatisticsAction.tdSetTableData,
        getCollectorsData: todayStatisticsAction.tdGetCollectorData,
        setCollectorsData: todayStatisticsAction.tdSetCollectorData,
    }, dispatch);
}

TodayStatistics.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TodayStatistics));