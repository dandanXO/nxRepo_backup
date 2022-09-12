export const WSR_GET_TABLE_DATA = 'WSR_GET_TABLE_DATA';
export const WSR_SET_TABLE_DATA = 'WSR_SET_TABLE_DATA';
export const WSR_CHANGE_TABLE_LOADING = 'WSR_CHANGE_TABLE_LOADING';
export const WSR_CHANGE_MODAL_VISIBLE = 'WSR_CHANGE_MODAL_VISIBLE';
export const WSR_CHANGE_ROWID = 'WSR_CHANGE_ROWID';
export const WSR_SALES_RETURN = 'WSR_SALES_RETURN';

export const wsrChangeTableLoading = (option) => ({ type: WSR_CHANGE_TABLE_LOADING, option });
export const wsrGetTableData = (params) => ({ type: WSR_GET_TABLE_DATA, params });
export const wsrSetTableData = (data) => ({ type: WSR_SET_TABLE_DATA, data });
export const wsrChangeModalVisible = (option) => ({ type: WSR_CHANGE_MODAL_VISIBLE, option });
export const wsrChangeRowId = (id) => ({ type: WSR_CHANGE_ROWID, id });
export const wsrSalesReturn = (params, callback) => ({ type: WSR_SALES_RETURN, params, callback });