/*
* businessRepeatCheck action
* */

export const URC_GET_TABLE_DATA = 'URC_GET_TABLE_DATA';
export const URC_SET_TABLE_DATA = 'URC_SET_TABLE_DATA';
export const URC_CHANGE_TABLE_LOADING = 'URC_CHANGE_TABLE_LOADING';
export const URC_CHANGE_DETAIL_DATA = 'URC_CHANGE_DETAIL_DATA';
// export const URC_CHANGE_CHECK_STEP = 'URC_CHANGE_CHECK_STEP';
export const URC_GET_DETAIL_DATA = 'URC_GET_DETAIL_DATA';
export const URC_POST_CHECK_INFO = 'URC_POST_CHECK_INFO';
export const URC_BATCH_POST_CHECK_INFO = 'URC_BATCH_POST_CHECK_INFO';
export const URC_CHANGE_SUBMIT_LOADING = 'URC_CHANGE_SUBMIT_LOADING';
export const URC_GET_UPLOAD_TOKEN = 'URC_GET_UPLOAD_TOKEN';
export const URC_SET_USER_ID = 'URC_SET_USER_ID';
export const URC_SET_PIC_LIST = 'URC_SET_PIC_LIST';
export const URC_DISTRIBUTE_ACCOUNT = 'URC_DISTRIBUTE_ACCOUNT';
export const URC_REPEAT_DISTRIBUTE = 'URC_REPEAT_DISTRIBUTE';
export const URC_UPLOAD_IMG = 'URC_UPLOAD_IMG';
export const URC_DISTRIBUTE_USER = 'URC_DISTRIBUTE_USER';
export const URC_SET_CURRENT_USER = 'URC_SET_CURRENT_USER';
export const URC_SET_BTN_DISABLED = 'URC_SET_BTN_DISABLED';
export const URC_GET_DEBTS_DATA = 'URC_GET_DEBTS_DATA';
// export const URC_SET_DEBTS_DATA = 'URC_SET_DEBTS_DATA';

export const urcGetTableData = (params) => ({ type: URC_GET_TABLE_DATA, params });
export const urcSetTableData = (data) => ({ type: URC_SET_TABLE_DATA, data });
export const urcChangeTableLoading = (option) => ({ type: URC_CHANGE_TABLE_LOADING, option });
export const urcChangeDetailData = (data) => ({ type: URC_CHANGE_DETAIL_DATA, data });
export const urcGetDetailData = (params) => ({ type: URC_GET_DETAIL_DATA, params });
export const urcPostCheckInfo = (params) => ({ type: URC_POST_CHECK_INFO, params });
export const urcBatchPostCheckInfo = (params) => ({ type: URC_BATCH_POST_CHECK_INFO, params });
export const urcChangeSubmitLoading = (option) => ({ type: URC_CHANGE_SUBMIT_LOADING,option });
export const urcGetUploadToken = (params) =>({ type: URC_GET_UPLOAD_TOKEN, params });
export const urcSetUserId = (id) => ({ type: URC_SET_USER_ID, id });
export const urcSetPicList = (file) => ({ type: URC_SET_PIC_LIST, file });
export const urcDistributeAccount = (params) => ({ type: URC_DISTRIBUTE_ACCOUNT, params });
export const urcRepeatDistribute = (params) => ({ type: URC_REPEAT_DISTRIBUTE, params});
export const urcUploadImg = (params) => ({ type: URC_UPLOAD_IMG, params });
export const urcDistributeUser = (params) => ({ type: URC_DISTRIBUTE_USER, params });
export const urcSetCurrentUser = (data) => ({ type: URC_SET_CURRENT_USER, data });
export const urcSetBtnDisabled = (option) => ({ type: URC_SET_BTN_DISABLED, option });
export const urcGetDebtsData = (params) => ({ type: URC_GET_DEBTS_DATA, params });
// export const urcSetDebtsData = (data) => ({ type: URC_SET_DEBTS_DATA, data });
