/*
* businessLastCheck action
* */

export const BLC_GET_TABLE_DATA = 'BLC_GET_TABLE_DATA';
export const BLC_SET_TABLE_DATA = 'BLC_SET_TABLE_DATA';
export const BLC_CHANGE_TABLE_LOADING = 'BLC_CHANGE_TABLE_LOADING';
export const BLC_CHANGE_DETAIL_DATA = 'BLC_CHANGE_DETAIL_DATA';
// export const BLC_CHANGE_CHECK_STEP = 'BLC_CHANGE_CHECK_STEP';
export const BLC_GET_DETAIL_DATA = 'BLC_GET_DETAIL_DATA';
export const BLC_POST_CHECK_INFO = 'BLC_POST_CHECK_INFO';
export const BLC_BATCH_POST_CHECK_INFO = 'BLC_BATCH_POST_CHECK_INFO';
export const BLC_CHANGE_SUBMIT_LOADING = 'BLC_CHANGE_SUBMIT_LOADING';
export const BLC_CHANGE_BUTTON_LOADING = 'BLC_CHANGE_BUTTON_LOADING';
export const BLC_SET_ORDER_ID = 'BLC_SET_ORDER_ID';
export const BLC_MODIFY_ICLOUD_PWD = 'BLC_MODIFY_ICLOUD_PWD';
export const BLC_DISTRIBUTE_ORDER = 'BLC_DISTRIBUTE_ORDER';
export const BLC_SET_CURRENT_ORDER = 'BLC_SET_CURRENT_ORDER';
export const BLC_GET_DEBTS_DATA = 'BLC_GET_DEBTS_DATA';

export const blcGetTableData = (params) => ({ type: BLC_GET_TABLE_DATA, params });
export const blcSetTableData = (data) => ({ type: BLC_SET_TABLE_DATA, data });
export const blcChangeTableLoading = (option) => ({ type: BLC_CHANGE_TABLE_LOADING, option });
export const blcChangeDetailData = (data) => ({ type: BLC_CHANGE_DETAIL_DATA, data });
// export const blcChangeCheckStep = (option) => ({ type: BLC_CHANGE_CHECK_STEP, option });
export const blcGetDetailData = (params) => ({ type: BLC_GET_DETAIL_DATA, params });
export const blcPostCheckInfo = (params) => ({ type: BLC_POST_CHECK_INFO, params });
export const blcBatchPostCheckInfo = (params) => ({ type: BLC_BATCH_POST_CHECK_INFO, params });
export const blcChangeSubmitLoading = (option) => ({ type: BLC_CHANGE_SUBMIT_LOADING,option });
export const blcChangeButtonLoading = (option) => ({ type: BLC_CHANGE_BUTTON_LOADING,option });
export const blcSetOrderId = (id) => ({ type: BLC_SET_ORDER_ID, id });
export const blcModifyIcloudPwd = (params) => ({ type: BLC_MODIFY_ICLOUD_PWD, params });
export const blcDistributeOrder = (params) => ({ type: BLC_DISTRIBUTE_ORDER, params });
export const blcSetCurrentOrder = (data) => ({ type: BLC_SET_CURRENT_ORDER, data });
export const blcGetDebtsData = (params) => ({ type: BLC_GET_DEBTS_DATA, params });