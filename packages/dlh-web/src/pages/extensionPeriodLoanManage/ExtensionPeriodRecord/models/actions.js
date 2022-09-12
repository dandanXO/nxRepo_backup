export const EP_RED_GET_TABLE_DATA = 'EP_RED_GET_TABLE_DATA';
export const EP_RED_SET_TABLE_DATA = 'EP_RED_SET_TABLE_DATA';
export const EP_RED_CHANGE_TABLE_LOADING = 'EP_RED_CHANGE_TABLE_LOADING';
export const EP_RED_GET_MODAL_DATA = 'EP_RED_GET_MODAL_DATA';
export const EP_RED_SET_MODAL_DATA = 'EP_RED_SET_MODAL_DATA';
export const EP_RED_CHANGE_MODAL_LOADING = 'EP_RED_CHANGE_MODAL_LOADING';
export const EP_RED_CHANGE_MODAL_VISIBLE = 'EP_RED_CHANGE_MODAL_VISIBLE';

export const epRedGetTableData = (params) => ({ type: EP_RED_GET_TABLE_DATA, params });
export const epRedSetTableData = (data) => ({ type: EP_RED_SET_TABLE_DATA, data });
export const epRedChangeTableLoading = (option) => ({ type: EP_RED_CHANGE_TABLE_LOADING, option });
export const epRedGetModalData = (params) => ({ type: EP_RED_GET_MODAL_DATA, params });
export const epRedSetModalData = (data) => ({ type: EP_RED_SET_MODAL_DATA, data });
export const epRedChangeModalLoading = (option) => ({ type: EP_RED_CHANGE_MODAL_LOADING, option });
export const epRedChangeModalVisible = (option) => ({ type: EP_RED_CHANGE_MODAL_VISIBLE, option });