export const WQC_GET_TABLE_DATA = 'WQC_GET_TABLE_DATA';
export const WQC_SET_TABLE_DATA = 'WQC_SET_TABLE_DATA';
export const WQC_CHANGE_TABLE_LOADING = 'WQC_CHANGE_TABLE_LOADING';
export const WQC_CHANGE_MODAL_VISIBLE = 'WQC_CHANGE_MODAL_VISIBLE';
export const WQC_CHANGE_ROWID = 'WQC_CHANGE_ROWID';
export const WQC_SUMIT_CHECK_RESULT = 'WQC_SUMIT_CHECK_RESULT';

export const wqcGetTableData = (params) => ({ type: WQC_GET_TABLE_DATA, params });
export const wqcSetTableData = (data) => ({ type: WQC_SET_TABLE_DATA, data });
export const wqcChangeTableLoading = (option) => ({ type: WQC_CHANGE_TABLE_LOADING, option });
export const wqcChangeModalVisible = (option) => ({ type: WQC_CHANGE_MODAL_VISIBLE, option });
export const wqcChangeRowId = (id) => ({ type: WQC_CHANGE_ROWID, id });
export const wqcSubmitCheckResult = (params, callback) => ({ type: WQC_SUMIT_CHECK_RESULT, params, callback });