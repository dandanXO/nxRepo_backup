export const PAY_MANUAL_ORDER_GET_TABLE_DATA = 'PAY_MANUAL_ORDER_GET_TABLE_DATA';
export const PAY_MANUAL_ORDER_SET_TABLE_DATA = 'PAY_MANUAL_ORDER_SET_TABLE_DATA';
export const PAY_MANUAL_ORDER_CHANGE_TABLE_LOADING = 'PAY_MANUAL_ORDER_CHANGE_TABLE_LOADING';
export const PAY_MANUAL_ORDER_CHANGE_MODAL_VISIBLE = 'PAY_MANUAL_ORDER_CHANGE_MODAL_VISIBLE';
export const PAY_MANUAL_ORDER_ADD_TABLE_DATA = 'PAY_MANUAL_ORDER_ADD_TABLE_DATA';
export const PAY_MANUAL_ORDER_UPDATE_TABLE_DATA = 'PAY_MANUAL_ORDER_UPDATE_TABLE_DATA';
export const PAY_MANUAL_ORDER_CHANGE_MODAL_INFO = 'PAY_MANUAL_ORDER_CHANGE_MODAL_INFO';
export const PAY_MANUAL_ORDER_DELETE_MODEL = 'PAY_MANUAL_ORDER_DELETE_MODEL';


export const payManualOrderGetTableData = (params) => ({ type: PAY_MANUAL_ORDER_GET_TABLE_DATA, params });
export const payManualOrderSetTableData = (data) => ({ type: PAY_MANUAL_ORDER_SET_TABLE_DATA, data });
export const payManualOrderChangeTableLoading = (option) => ({ type: PAY_MANUAL_ORDER_CHANGE_TABLE_LOADING, option });
export const payManualOrderChangeModalVisible = (option) => ({ type: PAY_MANUAL_ORDER_CHANGE_MODAL_VISIBLE, option });
export const payManualOrderAddTableData = (params) => ({ type: PAY_MANUAL_ORDER_ADD_TABLE_DATA, params });
export const payManualOrderUpdateTableData = (params) => ({ type: PAY_MANUAL_ORDER_UPDATE_TABLE_DATA, params});
export const payManualOrderChangeModalInfo = (info) => ({ type: PAY_MANUAL_ORDER_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: PAY_MANUAL_ORDER_DELETE_MODEL,params});