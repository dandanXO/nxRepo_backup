export const PAY_TYPE_GET_TABLE_DATA = 'PAY_TYPE_GET_TABLE_DATA';
export const PAY_TYPE_SET_TABLE_DATA = 'PAY_TYPE_SET_TABLE_DATA';
export const PAY_TYPE_CHANGE_TABLE_LOADING = 'PAY_TYPE_CHANGE_TABLE_LOADING';
export const PAY_TYPE_CHANGE_MODAL_VISIBLE = 'PAY_TYPE_CHANGE_MODAL_VISIBLE';
export const PAY_TYPE_ADD_TABLE_DATA = 'PAY_TYPE_ADD_TABLE_DATA';
export const PAY_TYPE_UPDATE_TABLE_DATA = 'PAY_TYPE_UPDATE_TABLE_DATA';
export const PAY_TYPE_CHANGE_MODAL_INFO = 'PAY_TYPE_CHANGE_MODAL_INFO';
export const PAY_TYPE_DELETE_MODEL = 'PAY_TYPE_DELETE_MODEL';


export const payTypeGetTableData = (params) => ({ type: PAY_TYPE_GET_TABLE_DATA, params });
export const payTypeSetTableData = (data) => ({ type: PAY_TYPE_SET_TABLE_DATA, data });
export const payTypeChangeTableLoading = (option) => ({ type: PAY_TYPE_CHANGE_TABLE_LOADING, option });
export const payTypeChangeModalVisible = (option) => ({ type: PAY_TYPE_CHANGE_MODAL_VISIBLE, option });
export const payTypeAddTableData = (params) => ({ type: PAY_TYPE_ADD_TABLE_DATA, params });
export const payTypeUpdateTableData = (params) => ({ type: PAY_TYPE_UPDATE_TABLE_DATA, params});
export const payTypeChangeModalInfo = (info) => ({ type: PAY_TYPE_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: PAY_TYPE_DELETE_MODEL,params});