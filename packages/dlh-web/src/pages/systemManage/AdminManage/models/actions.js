/*
* adminManage action
* */

export const AMG_GET_TABLE_DATA = 'AMG_GET_TABLE_DATA';
export const AMG_SET_TABLE_DATA = 'AMG_SET_TABLE_DATA';
export const AMG_CHANGE_TABLE_LOADING = 'AMG_CHANGE_TABLE_LOADING';



export const amgGetTableData = (params) => ({ type: AMG_GET_TABLE_DATA, params });
export const amgSetTableData = (data) => ({ type: AMG_SET_TABLE_DATA, data });
export const amgChangeTableLoading = (option) => ({ type: AMG_CHANGE_TABLE_LOADING, option });
