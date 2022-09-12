/*
* businessLastCheck action
* */

export const ULC_GET_TABLE_DATA = 'ULC_GET_TABLE_DATA';
export const ULC_SET_TABLE_DATA = 'ULC_SET_TABLE_DATA';
export const ULC_CHANGE_TABLE_LOADING = 'ULC_CHANGE_TABLE_LOADING';
export const ULC_CHANGE_DETAIL_DATA = 'ULC_CHANGE_DETAIL_DATA';
// export const ULC_CHANGE_CHECK_STEP = 'ULC_CHANGE_CHECK_STEP';
export const ULC_GET_DETAIL_DATA = 'ULC_GET_DETAIL_DATA';
export const ULC_POST_CHECK_INFO = 'ULC_POST_CHECK_INFO';
export const ULC_BATCH_POST_CHECK_INFO = 'ULC_BATCH_POST_CHECK_INFO';
export const ULC_CHANGE_SUBMIT_LOADING = 'ULC_CHANGE_SUBMIT_LOADING';
export const ULC_CHANGE_BUTTON_LOADING = 'ULC_CHANGE_BUTTON_LOADING';
export const ULC_SET_USER_ID = 'ULC_SET_USER_ID';
export const ULC_MODIFY_ICLOUD_PWD = 'ULC_MODIFY_ICLOUD_PWD';
export const ULC_DISTRIBUTE_USER = 'ULC_DISTRIBUTE_USER';
export const ULC_SET_CURRENT_USER = 'ULC_SET_CURRENT_USER';
export const ULC_GET_DEBTS_DATA = 'ULC_GET_DEBTS_DATA';

export const ulcGetTableData = (params) => ({ type: ULC_GET_TABLE_DATA, params });
export const ulcSetTableData = (data) => ({ type: ULC_SET_TABLE_DATA, data });
export const ulcChangeTableLoading = (option) => ({ type: ULC_CHANGE_TABLE_LOADING, option });
export const ulcChangeDetailData = (data) => ({ type: ULC_CHANGE_DETAIL_DATA, data });
// export const ulcChangeCheckStep = (option) => ({ type: ULC_CHANGE_CHECK_STEP, option });
export const ulcGetDetailData = (params) => ({ type: ULC_GET_DETAIL_DATA, params });
export const ulcPostCheckInfo = (params) => ({ type: ULC_POST_CHECK_INFO, params });
export const ulcBatchPostCheckInfo = (params) => ({ type: ULC_BATCH_POST_CHECK_INFO, params });
export const ulcChangeSubmitLoading = (option) => ({ type: ULC_CHANGE_SUBMIT_LOADING,option });
export const ulcChangeButtonLoading = (option) => ({ type: ULC_CHANGE_BUTTON_LOADING,option });
export const ulcSetUserId = (id) => ({ type: ULC_SET_USER_ID, id });
export const ulcModifyIcloudPwd = (params) => ({ type: ULC_MODIFY_ICLOUD_PWD, params });
export const ulcDistributeUser = (params) => ({ type: ULC_DISTRIBUTE_USER, params });
export const ulcSetCurrentUser = (data) => ({ type: ULC_SET_CURRENT_USER, data });
export const ulcGetDebtsData = (params) => ({ type: ULC_GET_DEBTS_DATA, params });