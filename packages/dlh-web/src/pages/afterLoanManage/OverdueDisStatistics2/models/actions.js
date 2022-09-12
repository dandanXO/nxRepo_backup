export const DSD_OSC_GET_TABLE_DATA = 'DSD_OSC_GET_TABLE_DATA';
export const DSD_OSC_SET_TABLE_DATA = 'DSD_OSC_SET_TABLE_DATA';
export const DSD_OSC_CHANGE_TABLE_LOADING = 'DSD_OSC_CHANGE_TABLE_LOADING';

export const dsdOscGetTableData = (params) => ({ type: DSD_OSC_GET_TABLE_DATA, params });
export const dsdOscSetTableData = (data) => ({ type: DSD_OSC_SET_TABLE_DATA, data });
export const dsdOscChangeTableLoading = (option) => ({ type: DSD_OSC_CHANGE_TABLE_LOADING, option });
