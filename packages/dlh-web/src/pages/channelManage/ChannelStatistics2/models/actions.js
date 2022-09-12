export const CS2_GET_TABLE_DATA = 'CS2_GET_TABLE_DATA';
export const CS2_SET_TABLE_DATA = 'CS2_SET_TABLE_DATA';
export const CS2_CHANGE_TABLE_LOADING = 'CS2_CHANGE_TABLE_LOADING';
export const CS2_GET_SOURCE_DATA = 'CS2_GET_SOURCE_DATA';
export const CS2_SET_SOURCE_DATA = 'CS2_SET_SOURCE_DATA';

export const cs2GetTableData = (params) => ({ type: CS2_GET_TABLE_DATA, params });
export const cs2SetTableData = (data) => ({ type: CS2_SET_TABLE_DATA, data });
export const cs2ChangeTableLoading = (option) => ({ type: CS2_CHANGE_TABLE_LOADING, option });
export const cs2GetSourceData = (params) => ({ type: CS2_GET_SOURCE_DATA, params });
export const cs2SetSourceData = (data) => ({ type: CS2_SET_SOURCE_DATA, data });