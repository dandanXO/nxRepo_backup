export const ClS_GET_TABLE_DATA = 'ClS_GET_TABLE_DATA';
export const ClS_SET_TABLE_DATA = 'ClS_SET_TABLE_DATA';
export const ClS_CHANGE_TABLE_LOADING = 'ClS_CHANGE_TABLE_LOADING';
export const CLS_GET_SOURCE_DATA = 'CLS_GET_SOURCE_DATA';
export const CLS_SET_SOURCE_DATA = 'CLS_SET_SOURCE_DATA';


export const clsGetTableData = (params) => ({ type: ClS_GET_TABLE_DATA, params });
export const clsSetTableData = (data) => ({ type: ClS_SET_TABLE_DATA, data });
export const clsChangeTableLoading = (option) => ({ type: ClS_CHANGE_TABLE_LOADING, option });
export const clsGetSourceData = (params) => ({ type: CLS_GET_SOURCE_DATA, params })
export const clsSetSourceData = (data) => ({ type: CLS_SET_SOURCE_DATA, data });