export const PAY_MCH_GET_TABLE_DATA = 'PAY_MCH_GET_TABLE_DATA';
export const PAY_MCH_SET_TABLE_DATA = 'PAY_MCH_SET_TABLE_DATA';
export const PAY_MCH_CHANGE_TABLE_LOADING = 'PAY_MCH_CHANGE_TABLE_LOADING';
export const PAY_MCH_CHANGE_MODAL_VISIBLE = 'PAY_MCH_CHANGE_MODAL_VISIBLE';
export const PAY_MCH_ADD_TABLE_DATA = 'PAY_MCH_ADD_TABLE_DATA';
export const PAY_MCH_UPDATE_TABLE_DATA = 'PAY_MCH_UPDATE_TABLE_DATA';
export const PAY_MCH_CHANGE_MODAL_INFO = 'PAY_MCH_CHANGE_MODAL_INFO';
export const PAY_MCH_DELETE_MODEL = 'PAY_MCH_DELETE_MODEL';
export const PAY_MCH_TOGGLE_ENABLED = 'PAY_MCH_TOGGLE_ENABLED';

export const payMchGetTableData = (params) => ({ type: PAY_MCH_GET_TABLE_DATA, params });
export const payMchSetTableData = (data) => ({ type: PAY_MCH_SET_TABLE_DATA, data });
export const payMchChangeTableLoading = (option) => ({ type: PAY_MCH_CHANGE_TABLE_LOADING, option });
export const payMchChangeModalVisible = (option) => ({ type: PAY_MCH_CHANGE_MODAL_VISIBLE, option });
export const payMchAddTableData = (params) => ({ type: PAY_MCH_ADD_TABLE_DATA, params });
export const payMchUpdateTableData = (params) => ({ type: PAY_MCH_UPDATE_TABLE_DATA, params });
export const payMchChangeModalInfo = (info) => ({ type: PAY_MCH_CHANGE_MODAL_INFO, info });
export const deleteModel = (params) => ({ type: PAY_MCH_DELETE_MODEL, params });
export const payMchToggleEnabled = (params) => ({ type: PAY_MCH_TOGGLE_ENABLED, params });
