import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { todayCollectTeamReportAction } from './index';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { CollectTeamReport } from 'components';
import moment from 'moment';
import {getIsSuperAdmin, getAllMerchants} from "utils";
function TodayCollectTeamReport(props) {

    const isSuperAdmin = getIsSuperAdmin();
    const allMerchants = getAllMerchants();

    const initTime = [moment(), moment()];

    useEffect(() => {
        const { getCollectTeamData, getReportData } = props;
        getCollectTeamData();
        const startDate = initTime[0].format('YYYY-MM-DD');
        const endDate = initTime[1].format('YYYY-MM-DD');
        getReportData({ startDate, endDate, collectTeamId: '', leng: '', merchantId: '' });
    }, []);

    return <CollectTeamReport {...props} initTime={initTime} type={'today'} isSuperAdmin={isSuperAdmin} allMerchants={allMerchants}/>
}

TodayCollectTeamReport.propTypes = {
    intl: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    const { todayLoanManageState: { todayCollectTeamReportState } } = state;
    return {
        teamsData: todayCollectTeamReportState['teamsData'],
        tableData: todayCollectTeamReportState['tableData'],
        downloadData: todayCollectTeamReportState['downloadData'],
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCollectTeamData: todayCollectTeamReportAction.getCollectTeam,
        getReportData: todayCollectTeamReportAction.getTableData,
        downloadReport: todayCollectTeamReportAction.getDownloadCollectReport,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TodayCollectTeamReport));

