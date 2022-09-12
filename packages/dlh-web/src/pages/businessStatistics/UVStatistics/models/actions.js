export const UV_STATISTIC_GET_TABLE_DATA = 'UV_STATISTIC_GET_TABLE_DATA';
export const UV_STATISTIC_SET_TABLE_DATA = 'UV_STATISTIC_SET_TABLE_DATA';
export const UV_STATISTIC_CHANGE_TABLE_LOADING = 'UV_STATISTIC_CHANGE_TABLE_LOADING';

export const uvStatisticGetTableData = (params) => ({ type: UV_STATISTIC_GET_TABLE_DATA, params });
export const uvStatisticSetTableData = (data) => ({ type: UV_STATISTIC_SET_TABLE_DATA, data });
export const uvStatisticChangeTableLoading = (option) => ({ type: UV_STATISTIC_CHANGE_TABLE_LOADING, option });
