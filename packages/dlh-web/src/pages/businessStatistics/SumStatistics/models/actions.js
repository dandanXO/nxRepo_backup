

export const SUM_GET_TABLE_DATA = 'SUM_GET_TABLE_DATA';
export const SUM_SET_TABLE_DATA = 'SUM_SET_TABLE_DATA';
export const SUM_CHANGE_TABLE_LOADING = 'SUM_CHANGE_TABLE_LOADING';

export const sumGetTableData = (params) => ({ type: SUM_GET_TABLE_DATA, params });
export const sumSetTableData = (data) => ({ type: SUM_SET_TABLE_DATA, data });
export const sumChangeTableLoading = (option) => ({ type: SUM_CHANGE_TABLE_LOADING, option });