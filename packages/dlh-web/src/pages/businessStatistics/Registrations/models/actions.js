export const REG_GET_TABLE_DATA = 'REG_GET_TABLE_DATA';
export const REG_SET_TABLE_DATA = 'REG_SET_TABLE_DATA';
export const REG_CHANGE_TABLE_LOADING = 'REG_CHANGE_TABLE_LOADING';
export const REG_GET_SOURCE_DATA = "REG_GET_SOURCE_DATA";
export const REG_SET_SOURCE_DATA = "REG_SET_SOURCE_DATA";

export const regGetTableData = (params) => ({ type: REG_GET_TABLE_DATA, params });
export const regSetTableData = (data) => ({ type: REG_SET_TABLE_DATA, data });
export const regChangeTableLoading = (option) => ({ type: REG_CHANGE_TABLE_LOADING, option });
export const regGetSourceData = (params) => ({type: REG_GET_SOURCE_DATA, params});
export const regSetSourceData = (data) => ({type: REG_SET_SOURCE_DATA, data});