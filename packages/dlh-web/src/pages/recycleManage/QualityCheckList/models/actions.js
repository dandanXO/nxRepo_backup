export const QCL_GET_TABLE_DATA = 'QCL_GET_TABLE_DATA';
export const QCL_SET_TABLE_DATA = 'QCL_SET_TABLE_DATA';
export const QCL_CHANGE_TABLE_LOADING = 'QCL_CHANGE_TABLE_LOADING';

export const qclGetTableData = (params) => ({ type: QCL_GET_TABLE_DATA, params });
export const qclSetTableData = (data) => ({ type: QCL_SET_TABLE_DATA, data });
export const qclChangeTableLoading = (option) => ({ type: QCL_CHANGE_TABLE_LOADING, option });