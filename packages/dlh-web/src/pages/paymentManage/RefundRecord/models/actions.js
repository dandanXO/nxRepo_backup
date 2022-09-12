export const RRD_GET_TABLE_DATA = 'RRD_GET_TABLE_DATA';
export const RRD_SET_TABLE_DATA = 'RRD_SET_TABLE_DATA';
export const RRD_CHANGE_TABLE_LOADING = 'RRD_CHANGE_TABLE_LOADING';

export const rrdGetTableData = (params) => ({ type: RRD_GET_TABLE_DATA, params });
export const rrdSetTableData = (data) => ({ type: RRD_SET_TABLE_DATA, data });
export const rrdChangeTableLoading = (option) => ({ type: RRD_CHANGE_TABLE_LOADING, option });