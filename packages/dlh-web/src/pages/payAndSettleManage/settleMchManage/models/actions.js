export const SETTLE_MCH_GET_TABLE_DATA = 'SETTLE_MCH_GET_TABLE_DATA';
export const SETTLE_MCH_SET_TABLE_DATA = 'SETTLE_MCH_SET_TABLE_DATA';
export const SETTLE_MCH_CHANGE_TABLE_LOADING = 'SETTLE_MCH_CHANGE_TABLE_LOADING';
export const SETTLE_MCH_CHANGE_MODAL_VISIBLE = 'SETTLE_MCH_CHANGE_MODAL_VISIBLE';
export const SETTLE_MCH_ADD_TABLE_DATA = 'SETTLE_MCH_ADD_TABLE_DATA';
export const SETTLE_MCH_UPDATE_TABLE_DATA = 'SETTLE_MCH_UPDATE_TABLE_DATA';
export const SETTLE_MCH_CHANGE_MODAL_INFO = 'SETTLE_MCH_CHANGE_MODAL_INFO';
export const SETTLE_MCH_DELETE_MODEL = 'SETTLE_MCH_DELETE_MODEL';
export const SETTLE_MCH_TOGGLE_ENABLED = 'SETTLE_MCH_TOGGLE_ENABLED';


export const settleMchGetTableData = (params) => ({ type: SETTLE_MCH_GET_TABLE_DATA, params });
export const settleMchSetTableData = (data) => ({ type: SETTLE_MCH_SET_TABLE_DATA, data });
export const settleMchChangeTableLoading = (option) => ({ type: SETTLE_MCH_CHANGE_TABLE_LOADING, option });
export const settleMchChangeModalVisible = (option) => ({ type: SETTLE_MCH_CHANGE_MODAL_VISIBLE, option });
export const settleMchAddTableData = (params) => ({ type: SETTLE_MCH_ADD_TABLE_DATA, params });
export const settleMchUpdateTableData = (params) => ({ type: SETTLE_MCH_UPDATE_TABLE_DATA, params });
export const settleMchChangeModalInfo = (info) => ({ type: SETTLE_MCH_CHANGE_MODAL_INFO, info });
export const deleteModel = (params) => ({ type: SETTLE_MCH_DELETE_MODEL, params });
export const settleMchToggleEnabled = (params) => ({ type: SETTLE_MCH_TOGGLE_ENABLED, params });