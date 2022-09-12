export const TRS_GET_TABLE_DATA = 'TRS_GET_TABLE_DATA';
export const TRS_SET_TABLE_DATA = 'TRS_SET_TABLE_DATA';
export const TRS_CHANGE_TABLE_LOADING = 'TRS_CHANGE_TABLE_LOADING';

export const trsGetTableData = (params) => ({ type: TRS_GET_TABLE_DATA, params });
export const trsSetTableData = (data) => ({ type: TRS_SET_TABLE_DATA, data });
export const trsChangeTableLading = (option) => ({ type: TRS_CHANGE_TABLE_LOADING, option });