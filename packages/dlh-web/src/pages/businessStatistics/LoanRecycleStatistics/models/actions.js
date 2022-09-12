export const LRS_GET_TABLE_DATA = 'LRS_GET_TABLE_DATA';
export const LRS_SET_TABLE_DATA = 'LRS_SET_TABLE_DATA';
export const LRS_CHANGE_TABLE_LOADING = 'LRS_CHANGE_TABLE_LOADING';

export const lrsGetTableData = (params) => ({ type: LRS_GET_TABLE_DATA, params });
export const lrsSetTableData = (data) => ({ type: LRS_SET_TABLE_DATA, data });
export const lrsChangeTableLoading = (option) => ({ type: LRS_CHANGE_TABLE_LOADING, option });