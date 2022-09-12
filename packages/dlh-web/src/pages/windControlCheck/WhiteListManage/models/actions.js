
export const WLM_GET_TABLE_DATA = 'WLM_GET_TABLE_DATA';
export const WLM_SET_TABLE_DATA = 'WLM_SET_TABLE_DATA';
export const WLM_CHANGE_TABLE_LOADING = 'WLM_CHANGE_TABLE_LOADING';
export const WLM_CHANGE_MODAL_VISIBLE = 'WLM_CHANGE_MODAL_VISIBLE';
export const WLM_ADD_TABLE_DATA = 'WLM_ADD_TABLE_DATA';
export const WLM_UPDATE_TABLE_DATA = 'WLM_UPDATE_TABLE_DATA';
export const WLM_CHANGE_MODAL_INFO = 'WLM_CHANGE_MODAL_INFO';

export const wlmGetTableData = (params) => ({ type: WLM_GET_TABLE_DATA, params });
export const wlmSetTableData = (data) => ({ type: WLM_SET_TABLE_DATA, data });
export const wlmChangeTableLoading = (option) => ({ type: WLM_CHANGE_TABLE_LOADING, option });
export const wlmChangeModalVisible = (option) => ({ type: WLM_CHANGE_MODAL_VISIBLE, option });
export const wlmAddTableData = (params, callback) => ({ type: WLM_ADD_TABLE_DATA, params, callback });
export const wlmUpdateTableData = (params) => ({ type: WLM_UPDATE_TABLE_DATA, params});
export const wlmChangeModalInfo = (info) => ({ type: WLM_CHANGE_MODAL_INFO, info });
