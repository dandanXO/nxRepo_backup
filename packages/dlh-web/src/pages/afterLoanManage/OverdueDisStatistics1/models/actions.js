export const DSC_OSC_GET_TABLE_DATA = 'DSC_OSC_GET_TABLE_DATA';
export const DSC_OSC_SET_TABLE_DATA = 'DSC_OSC_SET_TABLE_DATA';
export const DSC_OSC_CHANGE_TABLE_LOADING = 'DSC_OSC_CHANGE_TABLE_LOADING';

export const dscOscGetTableData = (params) => ({ type: DSC_OSC_GET_TABLE_DATA, params });
export const dscOscSetTableData = (data) => ({ type: DSC_OSC_SET_TABLE_DATA, data });
export const dscOscChangeTableLoading = (option) => ({ type: DSC_OSC_CHANGE_TABLE_LOADING, option });
