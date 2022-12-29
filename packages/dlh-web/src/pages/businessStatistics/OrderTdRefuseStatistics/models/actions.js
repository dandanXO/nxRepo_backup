export const ORDER_TRS_GET_TABLE_DATA = 'ORDER_TRS_GET_TABLE_DATA';
export const ORDER_TRS_SET_TABLE_DATA = 'ORDER_TRS_SET_TABLE_DATA';
export const ORDER_TRS_CHANGE_TABLE_LOADING = 'ORDER_TRS_CHANGE_TABLE_LOADING';

export const orderTrsGetTableData = (params) => ({ type: ORDER_TRS_GET_TABLE_DATA, params });
export const orderTrsSetTableData = (data) => ({ type: ORDER_TRS_SET_TABLE_DATA, data });
export const orderTrsChangeTableLoading = (option) => ({ type: ORDER_TRS_CHANGE_TABLE_LOADING, option });