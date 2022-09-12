
export const WRM_GET_TABLE_DATA = 'WRM_GET_TABLE_DATA';
export const WRM_SET_TABLE_DATA = 'WRM_SET_TABLE_DATA';
export const WRM_CHANGE_TABLE_LOADING = 'WRM_CHANGE_TABLE_LOADING';



export const wrmGetTableData = (params) => ({ type: WRM_GET_TABLE_DATA, params });
export const wrmSetTableData = (data) => ({ type: WRM_SET_TABLE_DATA, data });
export const wrmChangeTableLoading = (option) => ({ type: WRM_CHANGE_TABLE_LOADING, option });
