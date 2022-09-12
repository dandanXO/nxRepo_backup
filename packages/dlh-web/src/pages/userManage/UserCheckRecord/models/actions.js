export const UCRD_GET_TABLE_DATA = 'UCRD_GET_TABLE_DATA';
export const UCRD_SET_TABLE_DATA = 'UCRD_SET_TABLE_DATA';
export const UCRD_CHANGE_TABLE_LOADING = 'UCRD_CHANGE_TABLE_LOADING';
export const UCRD_GET_OPERATOR = 'UCRD_GET_OPERATOR';
export const UCRD_SET_OPERATOR = 'UCRD_SET_OPERATOR';

export const uCrdGetTableData = (params) => ({ type: UCRD_GET_TABLE_DATA, params });
export const uCrdSetTableData = (data) => ({ type: UCRD_SET_TABLE_DATA, data });
export const uCrdChangeTableLoading = (option) => ({ type: UCRD_CHANGE_TABLE_LOADING, option });
export const uCrdGetOperator = (params, callback) => ({ type: UCRD_GET_OPERATOR, params, callback });
export const uCrdSetOperator = (data) => ({ type: UCRD_SET_OPERATOR, data });