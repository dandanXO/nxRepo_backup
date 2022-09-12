export const ORS_GET_TABLE_DATA = 'ORS_GET_TABLE_DATA';
export const ORS_SET_TABLE_DATA = 'ORS_SET_TABLE_DATA';
export const ORS_CHANGE_TABLE_LOADING = 'ORS_CHANGE_TABLE_LOADING';

export const orsGetTableData = (params) => ({ type: ORS_GET_TABLE_DATA, params });
export const orsSetTableData = (data) => ({ type: ORS_SET_TABLE_DATA, data });
export const orsChangeTableLoading = (option) => ({ type: ORS_CHANGE_TABLE_LOADING, option });