export const CFY_GET_TABLE_DATA = 'CFY_GET_TABLE_DATA';
export const CFY_SET_TABLE_DATA = 'CFY_SET_TABLE_DATA';
export const CFY_CHANGE_TABLE_LOADING = 'CFY_CHANGE_TABLE_LOADING';
export const CFY_CHANGE_MODAL_VISIBLE = 'CFY_CHANGE_MODAL_VISIBLE';
export const CFY_UPDATE_TABLE_DATA = 'CFY_UPDATE_TABLE_DATA';
export const CFY_CHANGE_MODAL_INFO = 'CFY_CHANGE_MODAL_INFO';


export const cfyGetTableData = (params) => ({ type: CFY_GET_TABLE_DATA, params });
export const cfySetTableData = (data) => ({ type: CFY_SET_TABLE_DATA, data });
export const cfyChangeTableLoading = (option) => ({ type: CFY_CHANGE_TABLE_LOADING, option });
export const cfyChangeModalVisible = (option) => ({ type: CFY_CHANGE_MODAL_VISIBLE, option });
export const cfyUpdateTableData = (params) => ({ type: CFY_UPDATE_TABLE_DATA, params});
export const cfyChangeModalInfo = (info) => ({ type: CFY_CHANGE_MODAL_INFO, info });