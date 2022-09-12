export const FBM_GET_TABLE_DATA = 'FBM_GET_TABLE_DATA';
export const FBM_SET_TABLE_DATA = 'FBM_SET_TABLE_DATA';
export const FBM_CHANGE_TABLE_LOADING = 'FBM_CHANGE_TABLE_LOADING';
export const FBM_GET_TYPE_DATA = 'FBM_GET_TYPE_DATA';
export const FBM_SET_TYPE_DATA = 'FBM_SET_TYPE_DATA';

export const fbmGetTableData = (params) => ({
    type: FBM_GET_TABLE_DATA,
    params
});
export const fbmSetTableData = (data) => ({
    type: FBM_SET_TABLE_DATA,
    data
});
export const fbmChangeTableLoading = (option) => ({
    type: FBM_CHANGE_TABLE_LOADING,
    option
});
export const fbmGetTypeData = (params) => ({
    type: FBM_GET_TYPE_DATA,
    params
});
export const fbmSetTypeData = (data) => ({
    type: FBM_SET_TYPE_DATA,
    data
});