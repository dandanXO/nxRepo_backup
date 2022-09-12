export const RISK_S_GET_TABLE_DATA = 'RISK_S_GET_TABLE_DATA';
export const RISK_S_SET_TABLE_DATA = 'RISK_S_SET_TABLE_DATA';
export const RISK_S_CHANGE_TABLE_LOADING = 'RISK_S_CHANGE_TABLE_LOADING';
export const RISK_S_CHANGE_MODAL_VISIBLE = 'RISK_S_CHANGE_MODAL_VISIBLE';
export const RISK_S_UPDATE_TABLE_DATA = 'RISK_S_UPDATE_TABLE_DATA';
export const RISK_S_CHANGE_MODAL_INFO = 'RISK_S_CHANGE_MODAL_INFO';


export const riskSGetTableData = (params) => ({ type: RISK_S_GET_TABLE_DATA, params });
export const riskSSetTableData = (data) => ({ type: RISK_S_SET_TABLE_DATA, data });
export const riskSChangeTableLoading = (option) => ({ type: RISK_S_CHANGE_TABLE_LOADING, option });
export const riskSChangeModalVisible = (option) => ({ type: RISK_S_CHANGE_MODAL_VISIBLE, option });
export const riskSUpdateTableData = (params) => ({ type: RISK_S_UPDATE_TABLE_DATA, params});
export const riskSChangeModalInfo = (info) => ({ type: RISK_S_CHANGE_MODAL_INFO, info });