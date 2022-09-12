/*
* businessRepeatCheck action
* */

export const WCC_GET_TABLE_DATA = 'WCC_GET_TABLE_DATA';
export const WCC_SET_TABLE_DATA = 'WCC_SET_TABLE_DATA';
export const WCC_CHANGE_TABLE_LOADING = 'WCC_CHANGE_TABLE_LOADING';
export const WCC_CHANGE_DETAIL_DATA = 'WCC_CHANGE_DETAIL_DATA';
// export const WCC_CHANGE_CHECK_STEP = 'WCC_CHANGE_CHECK_STEP';
export const WCC_GET_DETAIL_DATA = 'WCC_GET_DETAIL_DATA';
export const WCC_POST_CHECK_INFO = 'WCC_POST_CHECK_INFO';
export const WCC_BATCH_POST_CHECK_INFO = 'WCC_BATCH_POST_CHECK_INFO';
export const WCC_CHANGE_SUBMIT_LOADING = 'WCC_CHANGE_SUBMIT_LOADING';
export const WCC_GET_UPLOAD_TOKEN = 'WCC_GET_UPLOAD_TOKEN';
export const WCC_SET_ORDER_ID = 'WCC_SET_ORDER_ID';
export const WCC_SET_PIC_LIST = 'WCC_SET_PIC_LIST';
export const WCC_DISTRIBUTE_ACCOUNT = 'WCC_DISTRIBUTE_ACCOUNT';
export const WCC_REPEAT_DISTRIBUTE = 'WCC_REPEAT_DISTRIBUTE';
export const WCC_UPLOAD_IMG = 'WCC_UPLOAD_IMG';
export const WCC_DISTRIBUTE_ORDER = 'WCC_DISTRIBUTE_ORDER';
export const WCC_SET_CURRENT_ORDER = 'WCC_SET_CURRENT_ORDER';
export const WCC_SET_BTN_DISABLED = 'WCC_SET_BTN_DISABLED';
export const WCC_GET_DEBTS_DATA = 'WCC_GET_DEBTS_DATA';
// export const WCC_SET_DEBTS_DATA = 'WCC_SET_DEBTS_DATA';

export const wccGetTableData = (params) => ({ type: WCC_GET_TABLE_DATA, params });
export const wccSetTableData = (data) => ({ type: WCC_SET_TABLE_DATA, data });
export const wccChangeTableLoading = (option) => ({ type: WCC_CHANGE_TABLE_LOADING, option });
export const wccChangeDetailData = (data) => ({ type: WCC_CHANGE_DETAIL_DATA, data });
export const wccGetDetailData = (params) => ({ type: WCC_GET_DETAIL_DATA, params });
export const wccPostCheckInfo = (params) => ({ type: WCC_POST_CHECK_INFO, params });
export const wccBatchPostCheckInfo = (params) => ({ type: WCC_BATCH_POST_CHECK_INFO, params });
export const wccChangeSubmitLoading = (option) => ({ type: WCC_CHANGE_SUBMIT_LOADING,option });
export const wccGetUploadToken = (params) =>({ type: WCC_GET_UPLOAD_TOKEN, params });
export const wccSetOrderId = (id) => ({ type: WCC_SET_ORDER_ID, id });
export const wccSetPicList = (file) => ({ type: WCC_SET_PIC_LIST, file });
export const wccDistributeAccount = (params) => ({ type: WCC_DISTRIBUTE_ACCOUNT, params });
export const wccRepeatDistribute = (params) => ({ type: WCC_REPEAT_DISTRIBUTE, params});
export const wccUploadImg = (params) => ({ type: WCC_UPLOAD_IMG, params });
export const wccDistributeOrder = (params) => ({ type: WCC_DISTRIBUTE_ORDER, params });
export const wccSetCurrentOrder = (data) => ({ type: WCC_SET_CURRENT_ORDER, data });
export const wccSetBtnDisabled = (option) => ({ type: WCC_SET_BTN_DISABLED, option });
export const wccGetDebtsData = (params) => ({ type: WCC_GET_DEBTS_DATA, params });
// export const wccSetDebtsData = (data) => ({ type: WCC_SET_DEBTS_DATA, data });
