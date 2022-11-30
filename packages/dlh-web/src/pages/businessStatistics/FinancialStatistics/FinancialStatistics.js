import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable, CopyText } from 'components';
import SearchList from './SearchList/SearchList';
import moment from "moment/moment";
import { message } from "antd";
import { axios, convertMoneyFormat } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const convertParams = (time) => {
    return {
        startTime: time.format('YYYY-MM-DD') ,
        endTime: time.format('YYYY-MM-DD')
    };
}
class FinancialStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled:false
        };
    }
    


    //导出记录
    exportFinancialRecord = (obj) => {
        const { time = [] } = obj;
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = convertParams(time);
        axios.get("/hs/admin/statistics/financial-statements/download", { params: searchStatus, responseType: 'blob' })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({id : "menu.financial.report.xlsx"}, {expDate : moment(Date.now()).format('YYYYMMDDHHmmss')}));
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

        //导出记录
        exportOperationRecord = (obj) => {
            const { time = [] } = obj;
            this.setState({ btnDisabled: true });
            let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
            const searchStatus = convertParams(time);
            axios.get("/hs/admin/statistics/operation-daily/download", { params: searchStatus, responseType: 'blob' })
            .then(res => {
                hide && hide();
                this.setState({ btnDisabled: false });
                download(res, this.props.intl.formatMessage({id : "menu.operation.report.xlsx"}, {expDate : moment(Date.now()).format('YYYYMMDDHHmmss')}));
            })
            .catch(() => {
                hide && hide();
                this.setState({ btnDisabled: false });
            });
        };

    render() {
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList initTime={moment()}
                		  exportFinancialRecord={this.exportFinancialRecord}
                          exportOperationRecord={this.exportOperationRecord}
                          btnDisable={btnDisabled}
                          />
            </div>
        );
    }
}
FinancialStatistics.PropTypes = {
    intl: PropTypes.object.isRequired,
} 

export default injectIntl(FinancialStatistics);