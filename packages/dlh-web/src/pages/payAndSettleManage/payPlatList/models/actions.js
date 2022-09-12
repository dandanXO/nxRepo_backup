export const PAY_PLAT_GET_TABLE_DATA = 'PAY_PLAT_GET_TABLE_DATA';
export const PAY_PLAT_SET_TABLE_DATA = 'PAY_PLAT_SET_TABLE_DATA';
export const PAY_PLAT_CHANGE_TABLE_LOADING = 'PAY_PLAT_CHANGE_TABLE_LOADING';
export const PAY_PLAT_CHANGE_MODAL_VISIBLE = 'PAY_PLAT_CHANGE_MODAL_VISIBLE';
export const PAY_PLAT_ADD_TABLE_DATA = 'PAY_PLAT_ADD_TABLE_DATA';
export const PAY_PLAT_UPDATE_TABLE_DATA = 'PAY_PLAT_UPDATE_TABLE_DATA';
export const PAY_PLAT_CHANGE_MODAL_INFO = 'PAY_PLAT_CHANGE_MODAL_INFO';
export const PAY_PLAT_DELETE_MODEL = 'PAY_PLAT_DELETE_MODEL';


export const payPlatGetTableData = (params) => ({ type: PAY_PLAT_GET_TABLE_DATA, params });
export const payPlatSetTableData = (data) => ({ type: PAY_PLAT_SET_TABLE_DATA, data });
export const payPlatChangeTableLoading = (option) => ({ type: PAY_PLAT_CHANGE_TABLE_LOADING, option });
export const payPlatChangeModalVisible = (option) => ({ type: PAY_PLAT_CHANGE_MODAL_VISIBLE, option });
export const payPlatAddTableData = (params) => ({ type: PAY_PLAT_ADD_TABLE_DATA, params });
export const payPlatUpdateTableData = (params) => ({ type: PAY_PLAT_UPDATE_TABLE_DATA, params});
export const payPlatChangeModalInfo = (info) => ({ type: PAY_PLAT_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: PAY_PLAT_DELETE_MODEL,params});