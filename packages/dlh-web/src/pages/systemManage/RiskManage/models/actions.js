export const CFR_GET_TABLE_DATA = 'CFR_GET_TABLE_DATA';
export const CFR_SET_TABLE_DATA = 'CFR_SET_TABLE_DATA';
export const CFR_CHANGE_TABLE_LOADING = 'CFR_CHANGE_TABLE_LOADING';
export const CFR_CHANGE_MODAL_VISIBLE = 'CFR_CHANGE_MODAL_VISIBLE';
export const CFR_UPDATE_TABLE_DATA = 'CFR_UPDATE_TABLE_DATA';
export const CFR_CHANGE_MODAL_INFO = 'CFR_CHANGE_MODAL_INFO';


export const cfrGetTableData = (params) => ({ type: CFR_GET_TABLE_DATA, params });
export const cfrSetTableData = (data) => ({ type: CFR_SET_TABLE_DATA, data });
export const cfrChangeTableLoading = (option) => ({ type: CFR_CHANGE_TABLE_LOADING, option });
export const cfrChangeModalVisible = (option) => ({ type: CFR_CHANGE_MODAL_VISIBLE, option });
export const cfrUpdateTableData = (params) => ({ type: CFR_UPDATE_TABLE_DATA, params});
export const cfrChangeModalInfo = (info) => ({ type: CFR_CHANGE_MODAL_INFO, info });