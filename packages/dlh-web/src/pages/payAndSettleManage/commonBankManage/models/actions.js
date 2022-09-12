export const PAY_COMM_BANK_GET_TABLE_DATA = 'PAY_COMM_BANK_GET_TABLE_DATA';
export const PAY_COMM_BANK_SET_TABLE_DATA = 'PAY_COMM_BANK_SET_TABLE_DATA';
export const PAY_COMM_BANK_CHANGE_TABLE_LOADING = 'PAY_COMM_BANK_CHANGE_TABLE_LOADING';
export const PAY_COMM_BANK_CHANGE_MODAL_VISIBLE = 'PAY_COMM_BANK_CHANGE_MODAL_VISIBLE';
export const PAY_COMM_BANK_ADD_TABLE_DATA = 'PAY_COMM_BANK_ADD_TABLE_DATA';
export const PAY_COMM_BANK_UPDATE_TABLE_DATA = 'PAY_COMM_BANK_UPDATE_TABLE_DATA';
export const PAY_COMM_BANK_CHANGE_MODAL_INFO = 'PAY_COMM_BANK_CHANGE_MODAL_INFO';
export const PAY_COMM_BANK_DELETE_MODEL = 'PAY_COMM_BANK_DELETE_MODEL';


export const payCommBankGetTableData = (params) => ({ type: PAY_COMM_BANK_GET_TABLE_DATA, params });
export const payCommBankSetTableData = (data) => ({ type: PAY_COMM_BANK_SET_TABLE_DATA, data });
export const payCommBankChangeTableLoading = (option) => ({ type: PAY_COMM_BANK_CHANGE_TABLE_LOADING, option });
export const payCommBankChangeModalVisible = (option) => ({ type: PAY_COMM_BANK_CHANGE_MODAL_VISIBLE, option });
export const payCommBankAddTableData = (params) => ({ type: PAY_COMM_BANK_ADD_TABLE_DATA, params });
export const payCommBankUpdateTableData = (params) => ({ type: PAY_COMM_BANK_UPDATE_TABLE_DATA, params});
export const payCommBankChangeModalInfo = (info) => ({ type: PAY_COMM_BANK_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: PAY_COMM_BANK_DELETE_MODEL,params});