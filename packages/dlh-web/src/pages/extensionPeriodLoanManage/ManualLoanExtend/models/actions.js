export const MLE_GET_TABLE_DATA = 'MLE_GET_TABLE_DATA';
export const MLE_SET_TABLE_DATA = 'MLE_SET_TABLE_DATA';
export const MLE_CHANGE_LOADING = 'MLE_CHANGE_LOADING';
export const MLE_CHANGE_VISIBLE = 'MLE_CHANGE_VISIBLE';
export const MLE_ADD_TABLE_RECORD = 'MLE_ADD_TABLE_RECORD';
export const MLE_CHANGE_BTN_LOADING = 'MLE_CHANGE_BTN_LOADING';

export const mLoanExtendGetTableData = (params) => ({ type: MLE_GET_TABLE_DATA, params });
export const mLoanExtendSetTableData = (data) => ({ type: MLE_SET_TABLE_DATA, data });
export const mLoanExtendChangeLoading = (option) => ({ type: MLE_CHANGE_LOADING, option });
export const mLoanExtendChangeVisible = (option) => ({ type: MLE_CHANGE_VISIBLE, option });
export const mLoanExtendAddTableRecord = (params, callback) => ({ type: MLE_ADD_TABLE_RECORD, params, callback });
export const mLoanExtendChangeBtnLoading = (option) => ({ type: MLE_CHANGE_BTN_LOADING, option });