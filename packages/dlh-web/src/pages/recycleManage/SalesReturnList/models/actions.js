export const SRL_GET_TABLE_DATA = 'SRL_GET_TABLE_DATA';
export const SRL_SET_TABLE_DATA = 'SRL_SET_TABLE_DATA';
export const SRL_CHANGE_TABLE_LOADING = 'SRL_CHANGE_TABLE_LOADING';

export const srlGetTableData = (params) => ({ type: SRL_GET_TABLE_DATA, params });
export const srlSetTableData = (data) => ({ type: SRL_SET_TABLE_DATA, data });
export const srlChangeTableLoading = (option) => ({ type: SRL_CHANGE_TABLE_LOADING, option });