import {
    SET_TODAY_COLLECT_TEAM_DATA,
    SET_TODAY_TEAM_REPORT_TABLE_DATA,
    SET_DOWNLOAD_TODAY_TEAM_REPORT,
    CHANGE_TODAY_TEAM_REPORT_TABLE_LOADING
} from './actions';

const initState = {
    loading: false,
    tableData: [],
    teamsData: [],
    downloadData: []
};

const todayCollectTeamReportState = (state = initState, action) => {
    switch (action.type) {
        case SET_TODAY_TEAM_REPORT_TABLE_DATA:
            return { ...state, tableData: action.data };
        case CHANGE_TODAY_TEAM_REPORT_TABLE_LOADING:
            return { ...state, loading: action.option };
        case SET_TODAY_COLLECT_TEAM_DATA:
            return { ...state, teamsData: action.data };
        case SET_DOWNLOAD_TODAY_TEAM_REPORT:
            return { ...state, downloadData: action.data };
        default:
            return state;
    }
};

export default todayCollectTeamReportState;