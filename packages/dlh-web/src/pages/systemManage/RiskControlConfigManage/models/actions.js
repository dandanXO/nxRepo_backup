export const RCCF_GET_TABLE_DATA = 'RCCF_GET_TABLE_DATA';
export const RCCF_SET_TABLE_DATA = 'RCCF_SET_TABLE_DATA';
export const RCCF_CHANGE_TABLE_LOADING = 'RCCF_CHANGE_TABLE_LOADING';
export const RCCF_CHANGE_MODAL_VISIBLE = 'RCCF_CHANGE_MODAL_VISIBLE';
export const RCCF_UPDATE_TABLE_DATA = 'RCCF_UPDATE_TABLE_DATA';
export const RCCF_CHANGE_MODAL_INFO = 'RCCF_CHANGE_MODAL_INFO';


export const rcCfGetTableData = (params) => ({ type: RCCF_GET_TABLE_DATA, params });
export const rcCfSetTableData = (data) => ({ type: RCCF_SET_TABLE_DATA, data });
export const rcCfChangeTableLoading = (option) => ({ type: RCCF_CHANGE_TABLE_LOADING, option });
export const rcCfChangeModalVisible = (option) => ({ type: RCCF_CHANGE_MODAL_VISIBLE, option });
export const rcCfUpdateTableData = (params) => ({ type: RCCF_UPDATE_TABLE_DATA, params});
export const rcCfChangeModalInfo = (info) => ({ type: RCCF_CHANGE_MODAL_INFO, info });