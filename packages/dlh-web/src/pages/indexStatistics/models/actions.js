export const IST_GET_TABLE_DATA = 'IST_GET_TABLE_DATA';
export const IST_SET_TABLE_DATA = 'IST_SET_TABLE_DATA';
export const IST_CHANGE_TABLE_LOADING = 'IST_CHANGE_TABLE_LOADING';

export const istGetTableData = (params) => ({ type: IST_GET_TABLE_DATA, params });
export const istSetTableData = (data) => ({ type: IST_SET_TABLE_DATA, data });
export const istChangeTableLoading = (option) => ({ type: IST_CHANGE_TABLE_LOADING, option });