export const OLMG_GET_TABLE_DATA = 'OLMG_GET_TABLE_DATA';
export const OLMG_SET_TABLE_DATA = 'OLMG_SET_TABLE_DATA';
export const OLMG_GET_MAPPING_LIST_DATA = 'OLMG_GET_MAPPING_LIST_DATA';
export const OLMG_SET_MAPPING_LIST_DATA = 'OLMG_SET_MAPPING_LIST_DATA';
export const OLMG_CHANGE_TABLE_LOADING = 'OLMG_CHANGE_TABLE_LOADING';

export const olmgGetTableData = (params) => ({ type: OLMG_GET_TABLE_DATA, params });
export const olmgSetTableData = (data) => ({ type: OLMG_SET_TABLE_DATA, data });
export const olmgGetMappingListData = (params) => ({ type: OLMG_GET_MAPPING_LIST_DATA, params });
export const olmgSetMappingListData = (data) => ({ type: OLMG_SET_MAPPING_LIST_DATA, data });
export const olmgChangeTableLoading = (option) => ({ type: OLMG_CHANGE_TABLE_LOADING, option });