export const SITE_BLACK_GET_TABLE_DATA = 'SITE_BLACK_GET_TABLE_DATA';
export const SITE_BLACK_SET_TABLE_DATA = 'SITE_BLACK_SET_TABLE_DATA';
export const SITE_BLACK_CHANGE_TABLE_LOADING = 'SITE_BLACK_CHANGE_TABLE_LOADING';
export const SITE_BLACK_CHANGE_MODAL_VISIBLE = 'SITE_BLACK_CHANGE_MODAL_VISIBLE';
export const SITE_BLACK_ADD_LIST = 'SITE_BLACK_ADD_SCHEDULE_JOB_LIST';
export const SITE_BLACK_UPDATE_LIST = 'SITE_BLACK_UPDATE_SCHEDULE_JOB_LIST';
export const SITE_BLACK_DEL_LIST = 'SITE_BLACK_DEL_SCHEDULE_JOB_LIST';

export const siteBlackGetTableData = (params) => ({ type: SITE_BLACK_GET_TABLE_DATA, params });
export const siteBlackSetTableData = (data) => ({ type: SITE_BLACK_SET_TABLE_DATA, data });
export const siteBlackChangeTableLoading = (option) => ({ type: SITE_BLACK_CHANGE_TABLE_LOADING, option });
export const siteBlackChangeModalVisible = (option) => ({ type: SITE_BLACK_CHANGE_MODAL_VISIBLE, option });
export const siteBlackAddList = (params, callback) => ({ type: SITE_BLACK_ADD_LIST, params, callback });
export const siteBlackUpdateList = (params, callback) => ({ type: SITE_BLACK_UPDATE_LIST, params, callback });
export const siteBlackDelList = (params, callback) => ({ type: SITE_BLACK_DEL_LIST, params, callback });