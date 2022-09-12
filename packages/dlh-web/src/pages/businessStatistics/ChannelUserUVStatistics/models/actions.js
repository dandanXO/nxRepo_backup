export const CHANNEL_USER_UV_STATISTIC_GET_TABLE_DATA = 'CHANNEL_USER_UV_STATISTIC_GET_TABLE_DATA';
export const CHANNEL_USER_UV_STATISTIC_SET_TABLE_DATA = 'CHANNEL_USER_UV_STATISTIC_SET_TABLE_DATA';
export const CHANNEL_USER_UV_STATISTIC_CHANGE_TABLE_LOADING = 'CHANNEL_USER_UV_STATISTIC_CHANGE_TABLE_LOADING';

export const channelUserUvStatisticGetTableData = (params) => ({ type: CHANNEL_USER_UV_STATISTIC_GET_TABLE_DATA, params });
export const channelUserUvStatisticSetTableData = (data) => ({ type: CHANNEL_USER_UV_STATISTIC_SET_TABLE_DATA, data });
export const channelUserUvStatisticChangeTableLoading = (option) => ({ type: CHANNEL_USER_UV_STATISTIC_CHANGE_TABLE_LOADING, option });
