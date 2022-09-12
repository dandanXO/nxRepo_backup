/*
* userInfoManage action
* */

export const UIM_GET_TABLE_DATA = 'UIM_GET_TABLE_DATA';
export const UIM_SET_TABLE_DATA = 'UIM_SET_TABLE_DATA';
export const UIM_CHANGE_TABLE_LOADING = 'UIM_CHANGE_TABLE_LOADING';
export const UIM_GO_BLACK_LIST = 'UIM_GO_BLACK_LIST';
export const UIM_PUSH_BLACK_LIST = 'UIM_PUSH_BLACK_LIST';
export const UIM_CHANGE_VISIBLE = 'UIM_CHANGE_VISIBLE';
export const UIM_CHANGE_ADD_MODAL_VISIBLE = 'UIM_CHANGE_ADD_MODAL_VISIBLE';
export const UIM_DETAIL_VISIBLE = 'UIM_DETAIL_VISIBLE';
export const UIM_GET_DETAIL_DATA = 'UIM_GET_DETAIL_DATA';
export const UIM_SET_DETAIL_DATA = 'UIM_SET_DETAIL_DATA';
export const UIM_GET_APPLY_DATA = 'UIM_GET_APPLY_DATA';
export const UIM_SET_APPLY_DATA = 'UIM_SET_APPLY_DATA';
export const UIM_GET_OPERATOR_DATA = 'UIM_GET_OPERATOR_DATA';
export const UIM_SET_OPERATOR_DATA = 'UIM_SET_OPERATOR_DATA';
export const UIM_GET_CONTACTS_DATA = 'UIM_GET_CONTACTS_DATA';
export const UIM_SET_CONTACTS_DATA = 'UIM_SET_CONTACTS_DATA';
export const UIM_CHANGE_MODAL_LOADING = 'UIM_CHANGE_MODAL_LOADING';
export const UIM_GET_SMS_LOG_DATA = 'UIM_GET_SMS_LOG_DATA';
export const UIM_SET_SMS_LOG_DATA = 'UIM_SET_SMS_LOG_DATA';
export const UIM_IMPORT_TEL_SALE_DATA = 'UIM_IMPORT_TEL_SALE_DATA';


export const uimGetTableData = (params) => ({ type: UIM_GET_TABLE_DATA, params });
export const uimSetTableData = (data) => ({ type: UIM_SET_TABLE_DATA, data });
export const uimChangeTableLoading = (option) => ({ type: UIM_CHANGE_TABLE_LOADING, option });
export const uimGoBlackList = (params, callback) => ({ type: UIM_GO_BLACK_LIST, params, callback });
export const uimPushBlackList = (params, callback) => ({ type: UIM_PUSH_BLACK_LIST, params, callback });
export const uimChangeVisible = (option) => ({ type: UIM_CHANGE_VISIBLE, option }); 
export const uimChangeAddModalVisible = (option) => ({ type: UIM_CHANGE_ADD_MODAL_VISIBLE, option }); 
export const uimDetailVisible = (option) => ({ type: UIM_DETAIL_VISIBLE, option });
export const uimGetDetailData = (params) => ({ type: UIM_GET_DETAIL_DATA, params });
export const uimSetDetailData = (data) => ({ type: UIM_SET_DETAIL_DATA, data });
export const uimGetApplyData = (params) => ({ type: UIM_GET_APPLY_DATA, params });
export const uimSetApplyData = (data) => ({ type: UIM_SET_APPLY_DATA, data });
export const uimGetOperatorData = (params) => ({ type: UIM_GET_OPERATOR_DATA, params });
export const uimSetOperatorData = (data) => ({ type: UIM_SET_OPERATOR_DATA, data });
export const uimGetContactsData = (params) => ({ type: UIM_GET_CONTACTS_DATA, params });
export const uimSetContactsData = (data) => ({ type: UIM_SET_CONTACTS_DATA, data });
export const uimChangeModalLoading = (option) => ({ type: UIM_CHANGE_MODAL_LOADING, option });
export const uimGetSMSLogData = (params) => ({ type: UIM_GET_SMS_LOG_DATA, params });
export const uimSetSMSLogData = (data) => ({ type: UIM_SET_SMS_LOG_DATA, data });
export const uimImportTelSaleData = (params) => ({ type: UIM_IMPORT_TEL_SALE_DATA, params });