export const ADSC_GET_TABLE_DATA = 'ADSC_GET_TABLE_DATA';
export const ADSC_SET_TABLE_DATA = 'ADSC_SET_TABLE_DATA';
export const ADSC_CHANGE_TABLE_LOADING = 'ADSC_CHANGE_TABLE_LOADING';

export const adscGetTableData = (params) => ({ type: ADSC_GET_TABLE_DATA, params });
export const adscSetTableData = (data) => ({ type: ADSC_SET_TABLE_DATA, data });
export const adscChangeTableLoading = (option) => ({ type: ADSC_CHANGE_TABLE_LOADING, option });
