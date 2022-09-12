export const OL_ARD_GET_TABLE_DATA = 'OL_ARD_GET_TABLE_DATA';
export const OL_ARD_SET_TABLE_DATA = 'OL_ARD_SET_TABLE_DATA';
export const OL_ARD_CHANGE_LOADING = 'OL_ARD_CHANGE_LOADING';
export const OL_ARD_CHANGE_VISIBLE = 'OL_ARD_CHANGE_VISIBLE';
export const OL_ARD_ADD_TABLE_RECORD = 'OL_ARD_ADD_TABLE_RECORD';
export const OL_ARD_CHANGE_BTN_LOADING = 'OL_ARD_CHANGE_BTN_LOADING';

export const olArdGetTableData = (params) => ({ type: OL_ARD_GET_TABLE_DATA, params });
export const olArdSetTableData = (data) => ({ type: OL_ARD_SET_TABLE_DATA, data });
export const olArdChangeLoading = (option) => ({ type: OL_ARD_CHANGE_LOADING, option });
export const olArdChangeVisible = (option) => ({ type: OL_ARD_CHANGE_VISIBLE, option });
export const olArdAddTableRecord = (params, callback) => ({ type: OL_ARD_ADD_TABLE_RECORD, params, callback });
export const olArdChangeBtnLoading = (option) => ({ type: OL_ARD_CHANGE_BTN_LOADING, option });