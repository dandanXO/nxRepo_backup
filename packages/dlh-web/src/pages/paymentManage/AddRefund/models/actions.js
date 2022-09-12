export const ARD_GET_TABLE_DATA = 'ARD_GET_TABLE_DATA';
export const ARD_SET_TABLE_DATA = 'ARD_SET_TABLE_DATA';
export const ARD_CHANGE_LOADING = 'ARD_CHANGE_LOADING';
export const ARD_CHANGE_VISIBLE = 'ARD_CHANGE_VISIBLE';
export const ARD_ADD_TABLE_RECORD = 'ARD_ADD_TABLE_RECORD';
export const ARD_CHANGE_BTN_LOADING = 'ARD_CHANGE_BTN_LOADING';

export const ardGetTableData = (params) => ({ type: ARD_GET_TABLE_DATA, params });
export const ardSetTableData = (data) => ({ type: ARD_SET_TABLE_DATA, data });
export const ardChangeLoading = (option) => ({ type: ARD_CHANGE_LOADING, option });
export const ardChangeVisible = (option) => ({ type: ARD_CHANGE_VISIBLE, option });
export const ardAddTableRecord = (params, callback) => ({ type: ARD_ADD_TABLE_RECORD, params, callback });
export const ardChangeBtnLoading = (option) => ({ type: ARD_CHANGE_BTN_LOADING, option });