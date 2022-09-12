export const DUE_OR_GET_TABLE_DATA = 'DUE_OR_GET_TABLE_DATA';
export const DUE_OR_SET_TABLE_DATA = 'DUE_OR_SET_TABLE_DATA';
export const DUE_OR_CHANGE_LOADING = 'DUE_OR_CHANGE_LOADING';
export const DUE_OR_CHANGE_VISIBLE = 'DUE_OR_CHANGE_VISIBLE';
export const DUE_OR_ADD_TABLE_RECORD = 'DUE_OR_ADD_TABLE_RECORD';
export const DUE_OR_CHANGE_BTN_LOADING = 'DUE_OR_CHANGE_BTN_LOADING';

export const orGetTableData = (params) => ({ type: DUE_OR_GET_TABLE_DATA, params });
export const orSetTableData = (data) => ({ type: DUE_OR_SET_TABLE_DATA, data });
export const orChangeLoading = (option) => ({ type: DUE_OR_CHANGE_LOADING, option });
export const orChangeVisible = (option) => ({ type: DUE_OR_CHANGE_VISIBLE, option });
export const orAddTableRecord = (params, callback) => ({ type: DUE_OR_ADD_TABLE_RECORD, params, callback });
export const orChangeBtnLoading = (option) => ({ type: DUE_OR_CHANGE_BTN_LOADING, option });