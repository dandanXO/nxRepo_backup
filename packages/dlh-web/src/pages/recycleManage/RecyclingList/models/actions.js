export const RIL_GET_TABLE_DATA = 'RIL_GET_TABLE_DATA';
export const RIL_SET_TABLE_DATA = 'RIL_SET_TABLE_DATA';
export const RIL_CHANGE_TABLE_LOADING = 'RIL_CHANGE_TABLE_LOADING';
export const RIL_CHANGE_MODAL = 'RIL_CHANGE_MODAL';
export const RIL_CONFIRM_RECEIVE = 'RIL_CONFIRM_RECEIVE';
export const RIL_SUBMIT_CLOSE_REASON = 'RIL_SUBMIT_CLOSE_REASON';
export const RIL_CHANGE_DETAIL_MODAL = 'RIL_CHANGE_DETAIL_MODAL';
export const RIL_GET_MODAL_DETAIL = 'RIL_GET_MODAL_DETAIL';
export const RIL_SET_MODAL_DETAIL = 'RIL_SET_MODAL_DETAIL';
export const RIL_CHANGE_TABLE_ROWID = 'RIL_CHANGE_TABLE_ROWID';
export const RIL_GET_EXPRESS_COMPANY = 'RIL_GET_EXPRESS_COMPANY';
export const RIL_SET_EXPRESS_COMPANY = 'RIL_SET_EXPRESS_COMPANY';
export const RIL_GET_REFUSE_REASON = 'RIL_GET_REFUSE_REASON';
export const RIL_SET_REFUSE_REASON = 'RIL_SET_REFUSE_REASON'


export const rilGetTableData = (params) => ({ type: RIL_GET_TABLE_DATA, params });
export const rilSetTableData = (data) => ({ type: RIL_SET_TABLE_DATA, data });
export const rilChangeTableLoading = (option) => ({ type: RIL_CHANGE_TABLE_LOADING, option });
export const rilChangeModal = (option) => ({ type: RIL_CHANGE_MODAL, option });
export const rilConfirmReceive =(params, callback) => ({ type: RIL_CONFIRM_RECEIVE, params, callback });
export const rilSubmitCloseReason = (params, callback) => ({ type: RIL_SUBMIT_CLOSE_REASON, params, callback });
export const rilChangeDetailModal = (option) => ({ type: RIL_CHANGE_DETAIL_MODAL, option });
export const rilSetModalDetail = (data) => ({ type: RIL_SET_MODAL_DETAIL, data });
export const rilGetModalDetail = (params) => ({ type: RIL_GET_MODAL_DETAIL, params });
export const rilChangeTableRowId = (id) => ({ type: RIL_CHANGE_TABLE_ROWID, id });
export const rilGetExpressCompany = (params) => ({ type: RIL_GET_EXPRESS_COMPANY, params });
export const rilSetExpressCompany = (data) => ({ type: RIL_SET_EXPRESS_COMPANY, data });
export const rilGetRefuseReason = (params) => ({ type: RIL_GET_REFUSE_REASON, params });
export const rilSetRefuseReason = (data) => ({ type: RIL_SET_REFUSE_REASON, data });