export const OR_ED_RRD_GET_TABLE_DATA = 'OR_ED_RRD_GET_TABLE_DATA';
export const OR_ED_RRD_SET_TABLE_DATA = 'OR_ED_RRD_SET_TABLE_DATA';
export const OR_ED_RRD_CHANGE_TABLE_LOADING = 'OR_ED_RRD_CHANGE_TABLE_LOADING';

export const orEdRrdGetTableData = (params) => ({ type: OR_ED_RRD_GET_TABLE_DATA, params });
export const orEdRrdSetTableData = (data) => ({ type: OR_ED_RRD_SET_TABLE_DATA, data });
export const orEdRrdChangeTableLoading = (option) => ({ type: OR_ED_RRD_CHANGE_TABLE_LOADING, option });