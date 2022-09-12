export const SETTLE_MANUAL_ORDER_GET_TABLE_DATA = 'SETTLE_MANUAL_ORDER_GET_TABLE_DATA';
export const SETTLE_MANUAL_ORDER_SET_TABLE_DATA = 'SETTLE_MANUAL_ORDER_SET_TABLE_DATA';
export const SETTLE_MANUAL_ORDER_CHANGE_TABLE_LOADING = 'SETTLE_MANUAL_ORDER_CHANGE_TABLE_LOADING';
export const SETTLE_MANUAL_ORDER_CHANGE_MODAL_VISIBLE = 'SETTLE_MANUAL_ORDER_CHANGE_MODAL_VISIBLE';
export const SETTLE_MANUAL_ORDER_ADD_TABLE_DATA = 'SETTLE_MANUAL_ORDER_ADD_TABLE_DATA';
export const SETTLE_MANUAL_ORDER_UPDATE_TABLE_DATA = 'SETTLE_MANUAL_ORDER_UPDATE_TABLE_DATA';
export const SETTLE_MANUAL_ORDER_CHANGE_MODAL_INFO = 'SETTLE_MANUAL_ORDER_CHANGE_MODAL_INFO';
export const SETTLE_MANUAL_ORDER_DELETE_MODEL = 'SETTLE_MANUAL_ORDER_DELETE_MODEL';


export const settleManualOrderGetTableData = (params) => ({ type: SETTLE_MANUAL_ORDER_GET_TABLE_DATA, params });
export const settleManualOrderSetTableData = (data) => ({ type: SETTLE_MANUAL_ORDER_SET_TABLE_DATA, data });
export const settleManualOrderChangeTableLoading = (option) => ({ type: SETTLE_MANUAL_ORDER_CHANGE_TABLE_LOADING, option });
export const settleManualOrderChangeModalVisible = (option) => ({ type: SETTLE_MANUAL_ORDER_CHANGE_MODAL_VISIBLE, option });
export const settleManualOrderAddTableData = (params) => ({ type: SETTLE_MANUAL_ORDER_ADD_TABLE_DATA, params });
export const settleManualOrderUpdateTableData = (params) => ({ type: SETTLE_MANUAL_ORDER_UPDATE_TABLE_DATA, params});
export const settleManualOrderChangeModalInfo = (info) => ({ type: SETTLE_MANUAL_ORDER_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: SETTLE_MANUAL_ORDER_DELETE_MODEL,params});