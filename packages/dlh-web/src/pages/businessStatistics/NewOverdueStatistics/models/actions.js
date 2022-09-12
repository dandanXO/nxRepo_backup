export const NOSC_GET_TABLE_DATA = 'NOSC_GET_TABLE_DATA';
export const NOSC_SET_TABLE_DATA = 'NOSC_SET_TABLE_DATA';
export const NOSC_CHANGE_TABLE_LOADING = 'NOSC_CHANGE_TABLE_LOADING';

export const noscGetTableData = (params) => ({ type: NOSC_GET_TABLE_DATA, params });
export const noscSetTableData = (data) => ({ type: NOSC_SET_TABLE_DATA, data });
export const noscChangeTableLoading = (option) => ({ type: NOSC_CHANGE_TABLE_LOADING, option });
