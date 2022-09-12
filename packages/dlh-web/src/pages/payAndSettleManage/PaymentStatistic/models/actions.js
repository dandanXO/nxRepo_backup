export const PAY_GET_STATISTIC_TABLE_DATA = 'PAY_GET_STATISTIC_TABLE_DATA';
export const PAY_SET_STATISTIC_TABLE_DATA = 'PAY_SET_STATISTIC_TABLE_DATA';
export const PAY_CHANGE_STATISTIC_TABLE_LOADING = 'PAY_CHANGE_STATISTIC_TABLE_LOADING';

export const payGetTableData = (params) => ({ type: PAY_GET_STATISTIC_TABLE_DATA, params });
export const paySetTableData = (data) => ({ type: PAY_SET_STATISTIC_TABLE_DATA, data });
export const payChangeTableLoading = (option) => ({ type: PAY_CHANGE_STATISTIC_TABLE_LOADING, option });
