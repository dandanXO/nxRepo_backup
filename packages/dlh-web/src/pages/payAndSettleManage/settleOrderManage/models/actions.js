export const SETTLE_ORDER_GET_TABLE_DATA = 'SETTLE_ORDER_GET_TABLE_DATA';
export const SETTLE_ORDER_SET_TABLE_DATA = 'SETTLE_ORDER_SET_TABLE_DATA';
export const SETTLE_ORDER_CHANGE_TABLE_LOADING = 'SETTLE_ORDER_CHANGE_TABLE_LOADING';
export const SETTLE_ORDER_CHANGE_MODAL_VISIBLE = 'SETTLE_ORDER_CHANGE_MODAL_VISIBLE';
export const SETTLE_ORDER_ADD_TABLE_DATA = 'SETTLE_ORDER_ADD_TABLE_DATA';
export const SETTLE_ORDER_UPDATE_TABLE_DATA = 'SETTLE_ORDER_UPDATE_TABLE_DATA';
export const SETTLE_ORDER_CHANGE_MODAL_INFO = 'SETTLE_ORDER_CHANGE_MODAL_INFO';
export const SETTLE_ORDER_DELETE_MODEL = 'SETTLE_ORDER_DELETE_MODEL';


export const settleOrderGetTableData = (params) => ({ type: SETTLE_ORDER_GET_TABLE_DATA, params });
export const settleOrderSetTableData = (data) => ({ type: SETTLE_ORDER_SET_TABLE_DATA, data });
export const settleOrderChangeTableLoading = (option) => ({ type: SETTLE_ORDER_CHANGE_TABLE_LOADING, option });
export const settleOrderChangeModalVisible = (option) => ({ type: SETTLE_ORDER_CHANGE_MODAL_VISIBLE, option });
export const settleOrderAddTableData = (params) => ({ type: SETTLE_ORDER_ADD_TABLE_DATA, params });
export const settleOrderUpdateTableData = (params) => ({ type: SETTLE_ORDER_UPDATE_TABLE_DATA, params});
export const settleOrderChangeModalInfo = (info) => ({ type: SETTLE_ORDER_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: SETTLE_ORDER_DELETE_MODEL,params});