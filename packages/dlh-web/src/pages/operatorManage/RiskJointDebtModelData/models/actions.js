export const RJMD_GET_TABLE_DATA = 'RJMD_GET_TABLE_DATA';
export const RJMD_SET_TABLE_DATA = 'RJMD_SET_TABLE_DATA';
export const RJMD_CHANGE_TABLE_LOADING = 'RJMD_CHANGE_TABLE_LOADING';

export const rjmdGetTableData = (params) => ({ type: RJMD_GET_TABLE_DATA, params });
export const rjmdSetTableData = (data) => ({ type: RJMD_SET_TABLE_DATA, data });
export const rjmdChangeTableLoading = (option) => ({ type: RJMD_CHANGE_TABLE_LOADING, option });