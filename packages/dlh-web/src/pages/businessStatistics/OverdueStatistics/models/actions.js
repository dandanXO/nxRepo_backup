export const OSC_GET_TABLE_DATA = 'OSC_GET_TABLE_DATA';
export const OSC_SET_TABLE_DATA = 'OSC_SET_TABLE_DATA';
export const OSC_CHANGE_TABLE_LOADING = 'OSC_CHANGE_TABLE_LOADING';

export const oscGetTableData = (params) => ({ type: OSC_GET_TABLE_DATA, params });
export const oscSetTableData = (data) => ({ type: OSC_SET_TABLE_DATA, data });
export const oscChangeTableLoading = (option) => ({ type: OSC_CHANGE_TABLE_LOADING, option });
