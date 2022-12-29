/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {atosStatisticsAction, atosStatisticsState} from './index';
import moment from 'moment';
import { CommonTable } from 'components';
import SearchList from './SeachList/SearchList';
import { message } from "antd";
import { axios,convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";

const convertParams = (time, isStatistLeng, merchantId = '') => {
    const isArr = Array.isArray(time) && time.length > 0;

    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        isStatistLeng,
        merchantId,
    };
}
class AtoSStatistics extends Component{
    constructor(props) {
        super(props);
        const isSuperAdmin = getIsSuperAdmin();
        const allMerchants = getAllMerchants();
        this.state = {
            isSuperAdmin,
            allMerchants,
            initTime: [
                moment().subtract(9, 'days'),
                moment()
            ],
            isStatistLeng : false,
            btnDisabled:false
        };
        this.columns = [
            { title: props.intl.formatMessage({id : "page.table.date"}), dataIndex: 'day', key: 'day' },
            { title: props.intl.formatMessage({id : "page.table.registration.qantity"}), dataIndex: 'regNum', key: 'regNum' , width: 80},
            { title: props.intl.formatMessage({id : "page.table.total.loan.quantity"}), dataIndex: 'loanSum', key: 'loanSum' , width: 90},
            { title: props.intl.formatMessage({id : "page.table.new.customer.application.qantity"}), dataIndex: 'newSubNum', key: 'newSubNum' },
            { title: props.intl.formatMessage({id : "page.table.new.customer.loan.qantity"}), dataIndex: 'newLoanSum', key: 'newLoanSum' },
            { title: props.intl.formatMessage({id : "page.table.num.old.customer"}), dataIndex: 'oldSubNum', key: 'oldSubNum' },
            { title: props.intl.formatMessage({id : "page.table.num.old.customer.loan"}), dataIndex: 'oldLoanSum', key: 'oldLoanSum' },
            { title: props.intl.formatMessage({id : "page.table.new.customer.overdue.quantity"}), dataIndex: 'newUserOverdeu', key: 'newUserOverdeu' },
            { title: props.intl.formatMessage({id : "page.table.old.customer.overdue.quantity"}), dataIndex: 'oldUserOverdeu', key: 'oldUserOverdeu' },
            {
                title: props.intl.formatMessage({id : "page.table.num.old.customer.extension"}),
                dataIndex: 'oldLengNum',
                key: 'oldLengNum'
            },
            {
                title: props.intl.formatMessage({id : "page.table.num.new.customer.extension"}),
                dataIndex: 'newLengNum',
                key: 'newLengNum'
            },
            { title: props.intl.formatMessage({ id: "page.table.loan.conversion.new.customer" }), dataIndex: 'a2s', key: 'a2s', width: 150 },

        ];

    }

    handleSearch = (obj) => {
        const { time,isStatistLeng, merchantId } = obj;
        const { getTableData } = this.props;
        const params = convertParams(time,isStatistLeng, merchantId);
        getTableData({ ...params });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        const params = convertParams(this.state.initTime,this.state.isStatistLeng)
        getTableData({ ...params });
    }
    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData([]);
    }

    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const { time, isStatistLeng, merchantId } = obj;
        const searchStatus = convertParams(time, isStatistLeng, merchantId);
        axios({
        url: "/hs/admin/statistics/atosStatisticDownLoad",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.atos.statistics.export"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    render() {
        const { initTime, isStatistLeng } = this.state;
        const { tableData, loading } = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} initTime={initTime} isStatistLeng={isStatistLeng} isSuperAdmin={this.state.isSuperAdmin} allMerchants={this.state.allMerchants}
                		  exportRecord={this.exportRecord}
                          btnDisable={btnDisabled}
                          />
                <CommonTable columns={this.columns} dataSource={tableData} loading={loading}/>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { atosStatisticsState } } = state;
    return {
        tableData: atosStatisticsState['tableData'],
        loading: atosStatisticsState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: atosStatisticsAction.assGetTableData,
        setTableData: atosStatisticsAction.assSetTableData
    }, dispatch);
}

AtoSStatistics.PropTypes ={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AtoSStatistics));
