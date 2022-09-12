export const CG_GET_TABLE_DATA = 'CG_GET_TABLE_DATA';
export const CG_SET_TABLE_DATA = 'CG_SET_TABLE_DATA';
export const CG_CHANGE_TABLE_LOADING = 'CG_CHANGE_TABLE_LOADING';



export const cGGetTableData = (params) => ({ type: CG_GET_TABLE_DATA, params });
export const cGSetTableData = (data) => ({ type: CG_SET_TABLE_DATA, data });
export const cGChangeTableLoading = (option) => ({ type: CG_CHANGE_TABLE_LOADING, option });