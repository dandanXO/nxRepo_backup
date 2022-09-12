export const CSF_GET_TABLE_DATA = 'CSF_GET_TABLE_DATA';
export const CSF_SET_TABLE_DATA = 'CSF_SET_TABLE_DATA';
export const CSF_CHANGE_TABLE_LOADING = 'CSF_CHANGE_TABLE_LOADING';
export const CSF_CHANGE_MODAL_VISIBLE = 'CSF_CHANGE_MODAL_VISIBLE';
export const CSF_UPDATE_TABLE_DATA = 'CSF_UPDATE_TABLE_DATA';
export const CSF_CHANGE_MODAL_INFO = 'CSF_CHANGE_MODAL_INFO';


export const csfGetTableData = (params) => ({ type: CSF_GET_TABLE_DATA, params });
export const csfSetTableData = (data) => ({ type: CSF_SET_TABLE_DATA, data });
export const csfChangeTableLoading = (option) => ({ type: CSF_CHANGE_TABLE_LOADING, option });
export const csfChangeModalVisible = (option) => ({ type: CSF_CHANGE_MODAL_VISIBLE, option });
export const csfUpdateTableData = (params) => ({ type: CSF_UPDATE_TABLE_DATA, params});
export const csfChangeModalInfo = (info) => ({ type: CSF_CHANGE_MODAL_INFO, info });