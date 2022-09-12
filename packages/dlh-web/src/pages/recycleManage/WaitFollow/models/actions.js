export const WFW_GET_TABLE_DATA = 'WFW_GET_TABLE_DATA';
export const WFW_SET_TABLE_DATA = 'WFW_SET_TABLE_DATA';
export const WFW_CHANGE_TABLE_LOADING = 'WFW_CHANGE_TABLE_LOADING';
export const WFW_CHANGE_MODAL_VISIBLE = 'WFW_CHANGE_MODAL_VISIBLE';
export const WFW_CHANGE_ROWID = 'WFW_CHANGE_ROWID';
export const WFW_SUBMIT_RESULT = 'WFW_SUBMIT_RESULT';


export const wfwGetTableData = (params) => ({ type: WFW_GET_TABLE_DATA, params });
export const wfwSetTableData = (data) => ({ type: WFW_SET_TABLE_DATA, data });
export const wfwChangeTableLoading = (option) => ({ type: WFW_CHANGE_TABLE_LOADING, option });
export const wfwChangeModalVisible = (option) => ({ type: WFW_CHANGE_MODAL_VISIBLE, option });
export const wfwChangeRowId = (id) => ({ type: WFW_CHANGE_ROWID, id });
export const wfwSubmitResult = (params, callback) => ({ type: WFW_SUBMIT_RESULT, params, callback });