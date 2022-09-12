export const RCMD_GET_TABLE_DATA = 'RCMD_GET_TABLE_DATA';
export const RCMD_SET_TABLE_DATA = 'RCMD_SET_TABLE_DATA';
export const RCMD_CHANGE_TABLE_LOADING = 'RCMD_CHANGE_TABLE_LOADING';

export const rcmdGetTableData = (params) => ({ type: RCMD_GET_TABLE_DATA, params });
export const rcmdSetTableData = (data) => ({ type: RCMD_SET_TABLE_DATA, data });
export const rcmdChangeTableLoading = (option) => ({ type: RCMD_CHANGE_TABLE_LOADING, option });