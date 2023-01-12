
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {sumStatisticsAction, sumStatisticsState} from './index';
import moment from 'moment';
import SearchList from './SeachList/SearchList';
import { axios, convertMoneyFormat } from 'utils';
import download from 'downloadjs';
import {message} from "antd";
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import { CommonTable , CopyText } from 'components'

class SumStatistics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            initTime: [
                moment().subtract(9, 'days'),
                moment()
            ],
            btnDisabled: false
        };
        this.columns = [
            { title: props.intl.formatMessage({id : "page.table.loan.date"}), dataIndex: 'day', key: 'day', width: 130 },
            { title: props.intl.formatMessage({id : "page.table.num.loan"}), dataIndex: 'allCount', key: 'allCount', width: 90 },
            { title: props.intl.formatMessage({id : "page.table.old.customer"}), dataIndex: 'olderCount', key: 'olderCount', width: 90 },
            { title: props.intl.formatMessage({id : "page.table.new.customer"}), dataIndex: 'newerCount', key: 'newerCount', width: 90 },
            {
                title: props.intl.formatMessage({id : "page.table.loan.principal"}),
                dataIndex: 'loanMoney',
                key: 'loanMoney', width: 90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.loan.contract.amount"}),
                dataIndex: 'allDeviceMoney',
                key: 'allDeviceMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.old.customer.contract.amount"}),
                dataIndex: 'olderDeviceMoney',
                key: 'olderDeviceMoney',
                width: 130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.new.customer.contract.amount"}),
                dataIndex: 'newerDeviceMoney',
                key: 'newerDeviceMoney',
                width: 130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.old.customer.loan.amount"}),
                dataIndex: 'olderLoanMoney',
                key: 'olderLoanMoney',
                width: 120,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.new.customer.loan.amount"}),
                dataIndex: 'newerLoanMoney',
                key: 'newerLoanMoney',
                width: 120,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.total.first.overdue.contract.amount"}),
                dataIndex: 'allOverdueMoney',
                key: 'allOverdueMoney',
                width: 120,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.old.customer.first.overdue.contract.amount"}),
                dataIndex: 'olderOverdueDeviceMoney',
                key: 'olderOverdueDeviceMoney',
                width: 130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.new.customer.first.overdue.contract.amount"}),
                dataIndex: 'newerOverdueDeviceMoney',
                key: 'newerOverdueDeviceMoney',
                width: 130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.total.first.overdue.rate"}), dataIndex: 'allOverdueMoneyRate', key: 'allOverdueMoneyRate', width: 90 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.old.customer.first.overdue.rate"}), dataIndex: 'olderOverdueDeviceMoneyRate', key: 'olderOverdueDeviceMoneyRate', width: 110 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.new.customer.first.overdue.rate"}), dataIndex: 'newerOverdueDeviceMoneyRate', key: 'newerOverdueDeviceMoneyRate', width: 110 , render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({id : "page.table.total.overdue.contract.amount"}),
                dataIndex: 'currentOverdueMoney',
                key: 'currentOverdueMoney',
                width: 120,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.old.customer.overdue.amount"}),
                dataIndex: 'olderCurrentOverdueMoney',
                key: 'olderCurrentOverdueMoney',
                width: 130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.new.customer.overdue.amount"}),
                dataIndex: 'newerCurrentOverdueMoney',
                key: 'newerCurrentOverdueMoney',
                width: 130,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.total.overdue.rate"}), dataIndex: 'currentOverdueMoneyRate', key: 'currentOverdueMoneyRate', width: 90 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.old.customer.overdue.rate"}), dataIndex: 'olderCurrentOverdueMoneyRate', key: 'olderCurrentOverdueMoneyRate', width: 110 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.new.customer.overdue.rate"}), dataIndex: 'newerCurrentOverdueMoneyRate', key: 'newerCurrentOverdueMoneyRate', width: 110 , render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({id : "page.table.total.urge.amount"}),
                dataIndex: 'urgeDeviceMoney',
                key: 'urgeDeviceMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.old.customer.urge.amount"}),
                dataIndex: 'olderUrgeBackDeviceMoney',
                key: 'olderUrgeBackDeviceMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.new.customer.urge.amount"}),
                dataIndex: 'newerUrgeBackDeviceMoney',
                key: 'newerUrgeBackDeviceMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.total.urge.rate"}), dataIndex: 'urgeDeviceMoneyRate', key: 'urgeDeviceMoneyRate', width: 90 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.old.customer.urge.rate"}), dataIndex: 'olderUrgeBackDeviceMoneyRate', key: 'olderUrgeBackDeviceMoneyRate', width: 110 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.new.customer.urge.rate"}), dataIndex: 'newerUrgeBackDeviceMoneyRate', key: 'newerUrgeBackDeviceMoneyRate', width: 110 , render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({id : "page.table.total.principal.repaid"}),
                dataIndex: 'backLoanMoney',
                key: 'backLoanMoney',
                width: 90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.total.overdue.fee"}),
                dataIndex: 'delayedMoney',
                key: 'delayedMoney',
                width: 90,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.sum.repayment.amount"}),
                dataIndex: 'backTotalMoney',
                key: 'backTotalMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.old.customer.repayment.amount"}),
                dataIndex: 'olderTotalMoney',
                key: 'olderTotalMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.new.customer.repayment.amount"}),
                dataIndex: 'newerTotalMoney',
                key: 'newerTotalMoney',
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)}/>;
                }
            },
            { title: props.intl.formatMessage({id : "page.table.total.repayment.rate"}), dataIndex: 'backTotalMoneyRate', key: 'backTotalMoneyRate', width: 90 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.old.customer.repayment.rate"}), dataIndex: 'olderTotalMoneyRate', key: 'olderTotalMoneyRate', width: 100 , render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({id : "page.table.new.customer.repayment.rate"}), dataIndex: 'newerTotalMoneyRate', key: 'newerTotalMoneyRate', width: 100 , render(text) { return <CopyText text={text} /> } },
        ];
    }

    getSourceData = (data) => {
        axios({
            url: '/hs/admin/channel/getChannelList',
            method: 'post',
            data: data
        }).then((res) => {
            if(res.code === 200){
                this.setState({
                    sourceData:res.data.records
                })
            }
        })
    }

    convertParams = (time, channelId) => {
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
            channelId: (channelId === 0 ) ? '0' : channelId ? channelId : ''
        };
    }
    handleSearch = (obj) => {
        const { time, channelId } = obj;
        const params = this.convertParams(time, channelId);
        this.props.getTableData({ ...params });
    }

    handlReturn = (obj) => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const { time, channelId } = obj;
        const params = this.convertParams(time, channelId);
        axios({
            url: '/hs/admin/statistics/summaryStatisticReport',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.summary.statistics.export"},  {expDate : Date.now()}));
        }).catch((err) => {
            console.log(err)
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    componentDidMount() {
        const params = this.convertParams(this.state.initTime)
        this.props.getTableData({ ...params });
        this.getSourceData({ pageSize: 10000, pageNum: 1 });
    }

    render () {
        const { sourceData, initTime, btnDisabled } = this.state;
        const { tableData, loading } = this.props;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch}
                    handlReturn={this.handlReturn}
                    initTime={initTime}
                    sourceData={sourceData}
                    btnDisable={btnDisabled}
                />
                <CommonTable columns={this.columns} dataSource={tableData} loading={loading} bordered scroll={{ x: '100%' }} />
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { sumStatisticsState } } = state;
    return {
        tableData: sumStatisticsState['tableData'],
        loading: sumStatisticsState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: sumStatisticsAction.sumGetTableData,
        setTableData: sumStatisticsAction.sumSetTableData
    }, dispatch);
}

SumStatistics.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SumStatistics));