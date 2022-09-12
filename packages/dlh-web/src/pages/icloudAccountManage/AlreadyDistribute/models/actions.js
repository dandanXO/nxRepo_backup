export const ADB_GET_TABLE_DATA = 'ADB_GET_TABLE_DATA';
export const ADB_SET_TABLE_DATA = 'ADB_SET_TABLE_DATA';
export const ADB_CHANGE_TABLE_LOADING = 'ADB_CHANGE_TABLE_LOADING';
export const ADB_SET_NEW_PASSWORD = 'ADB_SET_NEW_PASSWORD';


export const adbGetTableData = (params) => ({ type: ADB_GET_TABLE_DATA, params });
export const adbSetTableData = (data) => ({ type: ADB_SET_TABLE_DATA, data });
export const adbChangeTableLoading = (option) => ({ type: ADB_CHANGE_TABLE_LOADING, option });
export const adbSetNewPassword = (params, callback) => ({ type: ADB_SET_NEW_PASSWORD, params, callback });