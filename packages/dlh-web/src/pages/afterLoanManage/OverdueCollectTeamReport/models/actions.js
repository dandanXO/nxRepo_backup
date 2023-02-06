export const GET_OVERDUE_TEAM_REPORT_TABLE_DATA = 'GET_OVERDUE_TEAM_REPORT_TABLE_DATA';
export const SET_OVERDUE_TEAM_REPORT_TABLE_DATA = 'SET_OVERDUE_TEAM_REPORT_TABLE_DATA';
export const CHANGE_OVERDUE_TEAM_REPORT_TABLE_LOADING = 'CHANGE_OVERDUE_TEAM_REPORT_TABLE_LOADING';
export const GET_OVERDUE_COLLECT_TEAM_DATA = 'GET_OVERDUE_COLLECT_TEAM_DATA';
export const SET_OVERDUE_COLLECT_TEAM_DATA = 'SET_OVERDUE_COLLECT_TEAM_DATA';
export const GET_DOWNLOAD_OVERDUE_TEAM_REPORT = 'GET_DOWNLOAD_OVERDUE_TEAM_REPORT';
export const SET_DOWNLOAD_OVERDUE_TEAM_REPORT = 'SET_DOWNLOAD_OVERDUE_TEAM_REPORT';


export const getTableData = (params) => ({ type: GET_OVERDUE_TEAM_REPORT_TABLE_DATA, params });
export const setTableData = (data) => ({ type: SET_OVERDUE_TEAM_REPORT_TABLE_DATA, data });
export const changeTableLoading = (option) => ({ type: CHANGE_OVERDUE_TEAM_REPORT_TABLE_LOADING, option });
export const getCollectTeam = () => ({ type: GET_OVERDUE_COLLECT_TEAM_DATA });
export const setCollectTeam = (data) => ({ type: SET_OVERDUE_COLLECT_TEAM_DATA, data });
export const getDownloadCollectReport = (params) => ({ type: GET_DOWNLOAD_OVERDUE_TEAM_REPORT, params });
export const setDownloadCollectReport = (data) => ({ type: SET_DOWNLOAD_OVERDUE_TEAM_REPORT, data });
