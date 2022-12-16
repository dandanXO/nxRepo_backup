import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { overdueCollectTeamReportAction } from './index';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { CollectTeamReport } from 'components';
import moment from 'moment';
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";
function OverdueCollectTeamReport(props) {

    const initTime = [moment().subtract(7, 'days'), moment()];

    const isSuperAdmin = getIsSuperAdmin();
    const allMerchants = getAllMerchants();

    useEffect(() => {
        const { getCollectTeamData, getReportData } = props;
        getCollectTeamData();
        const startDate = initTime[0].format('YYYY-MM-DD');
        const endDate = initTime[1].format('YYYY-MM-DD');
        getReportData({ startDate, endDate, collectTeamId: '', leng: '', merchantId: '' });
    }, []);

    return <CollectTeamReport {...props} initTime={initTime} type={'overdue'} isSuperAdmin={isSuperAdmin} allMerchants={allMerchants}/>
}

OverdueCollectTeamReport.propTypes = {
    intl: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    const { afterLoanManageState: { overdueCollectTeamReportState } } = state;
    return {
        teamsData: overdueCollectTeamReportState['teamsData'],
        tableData: overdueCollectTeamReportState['tableData'],
        downloadData: overdueCollectTeamReportState['downloadData'],
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCollectTeamData: overdueCollectTeamReportAction.getCollectTeam,
        getReportData: overdueCollectTeamReportAction.getTableData,
        downloadReport: overdueCollectTeamReportAction.getDownloadCollectReport,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueCollectTeamReport));

