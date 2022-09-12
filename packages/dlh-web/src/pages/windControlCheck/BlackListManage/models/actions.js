
export const BLM_GET_TABLE_DATA = 'BLM_GET_TABLE_DATA';
export const BLM_SET_TABLE_DATA = 'BLM_SET_TABLE_DATA';
export const BLM_CHANGE_TABLE_LOADING = 'BLM_CHANGE_TABLE_LOADING';
export const BLM_CHANGE_MODAL_VISIBLE = 'BLM_CHANGE_MODAL_VISIBLE';
export const BLM_ADD_TABLE_DATA = 'BLM_ADD_TABLE_DATA';

export const blmGetTableData = (params) => ({ type: BLM_GET_TABLE_DATA, params });
export const blmSetTableData = (data) => ({ type: BLM_SET_TABLE_DATA, data });
export const blmChangeTableLoading = (option) => ({ type: BLM_CHANGE_TABLE_LOADING, option });
export const blmChangeModalVisible = (option) => ({ type: BLM_CHANGE_MODAL_VISIBLE, option });
export const blmAddTableData = (params) => ({ type: BLM_ADD_TABLE_DATA, params });