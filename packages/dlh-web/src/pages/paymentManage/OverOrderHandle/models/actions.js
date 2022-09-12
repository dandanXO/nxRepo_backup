export const OR_ED_GET_TABLE_DATA = 'OR_ED_GET_TABLE_DATA';
export const OR_ED_SET_TABLE_DATA = 'OR_ED_SET_TABLE_DATA';
export const OR_ED_CHANGE_LOADING = 'OR_ED_CHANGE_LOADING';
export const OR_ED_CHANGE_VISIBLE = 'OR_ED_CHANGE_VISIBLE';
export const OR_ED_ADD_TABLE_RECORD = 'OR_ED_ADD_TABLE_RECORD';
export const OR_ED_CHANGE_BTN_LOADING = 'OR_ED_CHANGE_BTN_LOADING';

export const orEdGetTableData = (params) => ({ type: OR_ED_GET_TABLE_DATA, params });
export const orEdSetTableData = (data) => ({ type: OR_ED_SET_TABLE_DATA, data });
export const orEdChangeLoading = (option) => ({ type: OR_ED_CHANGE_LOADING, option });
export const orEdChangeVisible = (option) => ({ type: OR_ED_CHANGE_VISIBLE, option });
export const orEdAddTableRecord = (params, callback) => ({ type: OR_ED_ADD_TABLE_RECORD, params, callback });
export const orEdChangeBtnLoading = (option) => ({ type: OR_ED_CHANGE_BTN_LOADING, option });