/*
* userInfoManage action
* */

export const DL_GET_TABLE_DATA = 'DL_GET_TABLE_DATA';
export const DL_SET_TABLE_DATA = 'DL_SET_TABLE_DATA';
export const DL_CHANGE_TABLE_LOADING = 'DL_CHANGE_TABLE_LOADING';
export const DL_CHANGE_FORM_DATA = 'DL_CHANGE_FORM_DATA';
export const DL_CHANGE_MODAL_VISIBLE = 'DL_CHANGE_MODAL_VISIBLE';

export const dlGetTableData = (params) => ({ type: DL_GET_TABLE_DATA, params });
export const dlSetTableData = (data) => ({ type: DL_SET_TABLE_DATA, data });
export const dlChangeTableLoading = (option) => ({ type: DL_CHANGE_TABLE_LOADING, option });
export const dlChangeFormData = (data) => ({ type: DL_CHANGE_FORM_DATA, data });
export const dlChangeModalVisible = (option) => ({ type: DL_CHANGE_MODAL_VISIBLE, option });