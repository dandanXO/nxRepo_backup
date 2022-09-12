import { SET_OVERDUE_TEAM_REPORT_TABLE_DATA, SET_OVERDUE_COLLECT_TEAM_DATA, SET_DOWNLOAD_OVERDUE_TEAM_REPORT } from './actions';

const initState = {
    teamsData: [],
    tableData: [],
    downloadData: []
};

const overdueCollectTeamReportState = (state = initState, action) => {
    switch (action.type) {
        case SET_OVERDUE_TEAM_REPORT_TABLE_DATA:
            return { ...state, tableData: action.data };
        case SET_OVERDUE_COLLECT_TEAM_DATA:
            return { ...state, teamsData: action.data };
        case SET_DOWNLOAD_OVERDUE_TEAM_REPORT:
            return { ...state, downloadData: action.data};
        default:
            return state;
    }
};

export default overdueCollectTeamReportState;