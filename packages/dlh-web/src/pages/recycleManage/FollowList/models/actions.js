export const FWL_GET_TABLE_DATA = 'FWL_GET_TABLE_DATA';
export const FWL_SET_TABLE_DATA = 'FWL_SET_TABLE_DATA';
export const FWL_CHANGE_TABLE_LOADING = 'FWL_CHANGE_TABLE_LOADING';

export const fwlGetTableData = (params) => ({ type: FWL_GET_TABLE_DATA, params });
export const fwlSetTableData = (data) => ({ type: FWL_SET_TABLE_DATA, data });
export const fwlChangeTableLoading = (option) => ({ type: FWL_CHANGE_TABLE_LOADING, option });