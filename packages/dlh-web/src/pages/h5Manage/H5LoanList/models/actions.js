export const HLL_GET_TABLE_DATA = 'HLL_GET_TABLE_DATA';
export const HLL_SET_TABLE_DATA = 'HLL_SET_TABLE_DATA';
export const HLL_CHANGE_MODAL_VISIBLE = 'HLL_CHANGE_MODAL_VISIBLE';
export const HLL_SET_UPLOAD_FILE = 'HLL_SET_UPLOAD_FILE';
export const HLL_GET_UPLOAD_TOKEN = 'HLL_GET_UPLOAD_TOKEN';
export const HLL_ADD_ITEM = 'HLL_ADD_ITEM';
export const HLL_UPDATE_ITEM = 'HLL_UPDATE_ITEM';
export const HLL_SORT_DATA = 'HLL_SORT_DATA';
export const HLL_DELETE_DATA = 'HLL_DELETE_DATA';


export const hllGetTableData = (params) => ({ type: HLL_GET_TABLE_DATA, params });
export const hllSetTableData = (data) => ({ type: HLL_SET_TABLE_DATA, data });
export const hllChangeModalVisible = (option) => ({ type: HLL_CHANGE_MODAL_VISIBLE, option });
export const hllSetUploadFile = (data) => ({ type: HLL_SET_UPLOAD_FILE, data });
export const hllGetUploadToken = (params) => ({ type: HLL_GET_UPLOAD_TOKEN, params });
export const hllAddItem = (params) => ({ type: HLL_ADD_ITEM, params });
export const hllUpdateItem = (params) => ({ type: HLL_UPDATE_ITEM, params });
export const hllSortData = (params, callback) => ({ type: HLL_SORT_DATA, params, callback });
export const hllDeleteData = (params) => ({ type: HLL_DELETE_DATA, params });