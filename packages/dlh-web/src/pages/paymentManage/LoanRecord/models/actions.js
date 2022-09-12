export const LRD_GET_TABLE_DATA = 'LRD_GET_TABLE_DATA';
export const LRD_SET_TABLE_DATA = 'LRD_SET_TABLE_DATA';
export const LRD_CHANGE_TABLE_LOADING = 'LRD_CHANGE_TABLE_LOADING';
export const LRD_PAY_MONEY = 'LRD_PAY_MONEY';
export const LRD_GET_MODAL_DATA = 'LRD_GET_MODAL_DATA';
export const LRD_SET_MODAL_DATA = 'LRD_SET_MODAL_DATA';
export const LRD_CHANGE_MODAL_LOADING = 'LRD_CHANGE_MODAL_LOADING';
export const LRD_CHANGE_MODAL_VISIBLE = 'LRD_CHANGE_MODAL_VISIBLE';


export const lrdGetTableData = (params) => ({ type: LRD_GET_TABLE_DATA, params });
export const lrdSetTableData = (data) => ({ type: LRD_SET_TABLE_DATA, data });
export const lrdChangeTableLoading = (option) => ({ type: LRD_CHANGE_TABLE_LOADING, option });
export const lrdPayMoney = (params, callback) => ({ type: LRD_PAY_MONEY, params, callback });
export const lrdGetModalData = (params) => ({ type: LRD_GET_MODAL_DATA, params });
export const lrdSetModalData = (data) => ({ type: LRD_SET_MODAL_DATA, data });
export const lrdChangeModalLoading = (option) => ({ type: LRD_CHANGE_MODAL_LOADING, option });
export const lrdChangeModalVisible = (option) => ({ type: LRD_CHANGE_MODAL_VISIBLE, option });