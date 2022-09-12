export const TD_GET_TABLE_DATA = 'TD_GET_TABLE_DATA';
export const TD_SET_TABLE_DATA = 'TD_SET_TABLE_DATA';
export const TD_CHANGE_TABLE_LOADING = 'TD_CHANGE_TABLE_LOADING';
export const TD_GET_COLLECTOR_DATA = 'TD_GET_COLLECTOR_DATA';
export const TD_SET_COLLECTOR_DATA = 'TD_SET_COLLECTOR_DATA';
export const TD_CHANGE_COLLECTOR_LOADING = 'TD_CHANGE_COLLECTOR_LOADING';

export const tdGetTableData = (params) => ({ type: TD_GET_TABLE_DATA, params });
export const tdSetTableData = (data) => ({ type: TD_SET_TABLE_DATA, data });
export const tdChangeTableLoading = (option) => ({ type: TD_CHANGE_TABLE_LOADING, option });
export const tdGetCollectorData = (params) => ({ type: TD_GET_COLLECTOR_DATA, params });
export const tdSetCollectorData = (data) => ({ type: TD_SET_COLLECTOR_DATA, data });
export const tdChangeCollectorLoading = (option) => ({ type: TD_CHANGE_COLLECTOR_LOADING, option });