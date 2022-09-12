import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoDeductionsStatisticsAction } from './index';
import { CommonTable } from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


class AutoDeductionsStatistics extends Component {

    columns = [
        { title: <FormattedMessage id="page.table.date" />, dataIndex: 'date', key: 'date' },
        { title: <FormattedMessage id="page.table.total.num.active.deduction" />, dataIndex: 'total', key: 'total' },
        { title: <FormattedMessage id="page.table.num.success" />, dataIndex: 'succTotal', key: 'succTotal' },
        { title: <FormattedMessage id="page.table.num.fail" />, dataIndex: 'failTotal', key: 'failTotal' },
        {
            title: <FormattedMessage id="page.table.amount.success.deduction" />,
            dataIndex: 'succAmount',
            key: 'succAmount',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        { title: <FormattedMessage id="page.table.deduction.success.rate" />, dataIndex: 'succRate', key: 'succRate' ,
            render(text, record) {
                const data = Number(text) * 100;
                return `${data.toFixed(2)}%`;
            }
        },
        { title: <FormattedMessage id="page.table.num.T0.success" />, dataIndex: 't0SuccTotal', key: 't0SuccTotal' },
        { title: <FormattedMessage id="page.table.T0.success.rate" />, dataIndex: 't0SuccRate', key: 't0SuccRate' ,
            render(text, record) {
                const data = Number(text) * 100;
                return `${data.toFixed(2)}%`;
            }
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
        };
        this.initTime = [
            moment().subtract(6, 'days'),
            moment()
        ];
        const _this = this;
        this.pageSize = 30;
        this.searchParams = this.convertParams({});
    }
    
    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/autoDeductionsStatisticDownLoad",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "page.table.deduction.statistics.export"}, {expDate : Date.now()}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime  } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        return {
            startTime: isArr ? time[0].format('YYYY-MM-DD'): '',
            endTime: isArr? time[1].format('YYYY-MM-DD') : ''
        };
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = this.convertParams(obj);
        this.searchParams = params;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams({});
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }



    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        
        return (
            <div>
                <SearchList initTime={this.initTime} handleSearch={this.handleSearch}
                		  exportRecord={this.exportRecord}
                          btnDisable={this.state.btnDisable}
                          />
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} pageSize={this.pageSize}/>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { autoDeductionsStatisticsState } } = state;
    return {
        tableData: autoDeductionsStatisticsState['tableData'],
        loading: autoDeductionsStatisticsState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: autoDeductionsStatisticsAction.adscGetTableData,
        setTableData: autoDeductionsStatisticsAction.adscSetTableData
    }, dispatch);
}

AutoDeductionsStatistics.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AutoDeductionsStatistics));