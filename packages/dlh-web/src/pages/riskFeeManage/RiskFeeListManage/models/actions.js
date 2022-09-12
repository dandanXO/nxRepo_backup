
export const RFM_GET_TABLE_DATA = 'RFM_GET_TABLE_DATA';
export const RFM_SET_TABLE_DATA = 'RFM_SET_TABLE_DATA';
export const RFM_CHANGE_TABLE_LOADING = 'RFM_CHANGE_TABLE_LOADING';



export const rfmGetTableData = (params) => ({ type: RFM_GET_TABLE_DATA, params });
export const rfmSetTableData = (data) => ({ type: RFM_SET_TABLE_DATA, data });
export const rfmChangeTableLoading = (option) => ({ type: RFM_CHANGE_TABLE_LOADING, option });
