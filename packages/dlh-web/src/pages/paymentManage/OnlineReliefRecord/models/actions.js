export const OL_RRD_GET_TABLE_DATA = 'OL_RRD_GET_TABLE_DATA';
export const OL_RRD_SET_TABLE_DATA = 'OL_RRD_SET_TABLE_DATA';
export const OL_RRD_CHANGE_TABLE_LOADING = 'OL_RRD_CHANGE_TABLE_LOADING';

export const olRrdGetTableData = (params) => ({ type: OL_RRD_GET_TABLE_DATA, params });
export const olRrdSetTableData = (data) => ({ type: OL_RRD_SET_TABLE_DATA, data });
export const olRrdChangeTableLoading = (option) => ({ type: OL_RRD_CHANGE_TABLE_LOADING, option });