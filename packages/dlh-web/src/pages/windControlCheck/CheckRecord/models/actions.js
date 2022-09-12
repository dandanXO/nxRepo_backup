export const CRD_GET_TABLE_DATA = 'CRD_GET_TABLE_DATA';
export const CRD_SET_TABLE_DATA = 'CRD_SET_TABLE_DATA';
export const CRD_CHANGE_TABLE_LOADING = 'CRD_CHANGE_TABLE_LOADING';
export const CRD_GET_OPERATOR = 'CRD_GET_OPERATOR';
export const CRD_SET_OPERATOR = 'CRD_SET_OPERATOR';

export const crdGetTableData = (params) => ({ type: CRD_GET_TABLE_DATA, params });
export const crdSetTableData = (data) => ({ type: CRD_SET_TABLE_DATA, data });
export const crdChangeTableLoading = (option) => ({ type: CRD_CHANGE_TABLE_LOADING, option });
export const crdGetOperator = (params, callback) => ({ type: CRD_GET_OPERATOR, params, callback });
export const crdSetOperator = (data) => ({ type: CRD_SET_OPERATOR, data });