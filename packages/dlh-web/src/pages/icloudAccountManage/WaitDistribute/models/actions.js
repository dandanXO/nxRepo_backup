export const WDB_CHANGE_MODAL_VISIBLE = 'WDB_CHANGE_MODAL_VISIBLE';
export const WDB_CHANGE_MODAL_LOADING = 'WDB_CHANGE_MODAL_LOADING';
export const WDB_UPLOAD_ICLOUD = 'WDB_UPLOAD_ICLOUD';

export const WDB_GET_TABLE_DATA = 'WDB_GET_TABLE_DATA';
export const WDB_SET_TABLE_DATA = 'WDB_SET_TABLE_DATA';
export const WDB_CHANGE_TABLE_LOADING = 'WDB_CHANGE_TABLE_LOADING';

export const wdbChangeModalVisible = (option) => ({ type: WDB_CHANGE_MODAL_VISIBLE, option });
export const wdbChangeModalLoading = (option) => ({ type: WDB_CHANGE_MODAL_LOADING, option });
export const wdbUploadIcloud = (params) => ({ type: WDB_UPLOAD_ICLOUD, params });

export const wdbGetTableData = (params) => ({ type: WDB_GET_TABLE_DATA, params });
export const wdbSetTableData = (data) => ({ type: WDB_SET_TABLE_DATA, data });
export const wdbChangeTableLoading = (option) => ({ type: WDB_CHANGE_TABLE_LOADING, option });
