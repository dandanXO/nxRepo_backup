

export const ASS_GET_TABLE_DATA = 'ASS_GET_TABLE_DATA';
export const ASS_SET_TABLE_DATA = 'ASS_SET_TABLE_DATA';
export const ASS_CHANGE_TABLE_LOADING = 'ASS_CHANGE_TABLE_LOADING';

export const assGetTableData = (params) => ({ type: ASS_GET_TABLE_DATA, params });
export const assSetTableData = (data) => ({ type: ASS_SET_TABLE_DATA, data });
export const assChangeTableLoading = (option) => ({ type: ASS_CHANGE_TABLE_LOADING, option });