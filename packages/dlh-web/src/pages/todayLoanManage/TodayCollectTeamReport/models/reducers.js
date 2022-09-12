import { SET_TODAY_COLLECT_TEAM_DATA, SET_TODAY_TEAM_REPORT_TABLE_DATA, SET_DOWNLOAD_TODAY_TEAM_REPORT } from './actions';

const initState = {
    tableData: [],
    teamsData: [],
    downloadData: []
};

const todayCollectTeamReportState = (state = initState, action) => {
    switch (action.type) {
        case SET_TODAY_TEAM_REPORT_TABLE_DATA:
            return { ...state, tableData: action.data };
        case SET_TODAY_COLLECT_TEAM_DATA:
            return { ...state, teamsData: action.data };
        case SET_DOWNLOAD_TODAY_TEAM_REPORT:
            return { ...state, downloadData: action.data };
        default:
            return state;
    }
};

export default todayCollectTeamReportState;