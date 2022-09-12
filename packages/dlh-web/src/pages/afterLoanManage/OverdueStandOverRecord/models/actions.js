export const OSR_GET_TABLE_DATA = 'OSR_GET_TABLE_DATA';
export const OSR_SET_TABLE_DATA = 'OSR_SET_TABLE_DATA';
export const OSR_CHANGE_TABLE_LOADING = 'OSR_CHANGE_TABLE_LOADING';

export const osrGetTableData = (params) => ({ type: OSR_GET_TABLE_DATA, params });
export const osrSetTableData = (data) => ({ type: OSR_SET_TABLE_DATA, data });
export const osrChangeTableLoading = (option) => ({ type: OSR_CHANGE_TABLE_LOADING, option });
