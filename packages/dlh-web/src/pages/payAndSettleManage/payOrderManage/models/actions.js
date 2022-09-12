export const PAY_ORDER_GET_TABLE_DATA = 'PAY_ORDER_GET_TABLE_DATA';
export const PAY_ORDER_SET_TABLE_DATA = 'PAY_ORDER_SET_TABLE_DATA';
export const PAY_ORDER_CHANGE_TABLE_LOADING = 'PAY_ORDER_CHANGE_TABLE_LOADING';
export const PAY_ORDER_CHANGE_MODAL_VISIBLE = 'PAY_ORDER_CHANGE_MODAL_VISIBLE';
export const PAY_ORDER_ADD_TABLE_DATA = 'PAY_ORDER_ADD_TABLE_DATA';
export const PAY_ORDER_UPDATE_TABLE_DATA = 'PAY_ORDER_UPDATE_TABLE_DATA';
export const PAY_ORDER_CHANGE_MODAL_INFO = 'PAY_ORDER_CHANGE_MODAL_INFO';
export const PAY_ORDER_DELETE_MODEL = 'PAY_ORDER_DELETE_MODEL';


export const payOrderGetTableData = (params) => ({ type: PAY_ORDER_GET_TABLE_DATA, params });
export const payOrderSetTableData = (data) => ({ type: PAY_ORDER_SET_TABLE_DATA, data });
export const payOrderChangeTableLoading = (option) => ({ type: PAY_ORDER_CHANGE_TABLE_LOADING, option });
export const payOrderChangeModalVisible = (option) => ({ type: PAY_ORDER_CHANGE_MODAL_VISIBLE, option });
export const payOrderAddTableData = (params) => ({ type: PAY_ORDER_ADD_TABLE_DATA, params });
export const payOrderUpdateTableData = (params) => ({ type: PAY_ORDER_UPDATE_TABLE_DATA, params});
export const payOrderChangeModalInfo = (info) => ({ type: PAY_ORDER_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: PAY_ORDER_DELETE_MODEL,params});