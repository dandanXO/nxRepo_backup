export const CHL_GET_TABLE_DATA = 'CHL_GET_TABLE_DATA';
export const CHL_SET_TABLE_DATA = 'CHL_SET_TABLE_DATA';
export const CHL_CHANGE_TABLE_LOADING = 'CHL_CHANGE_TABLE_LOADING';
export const CHL_CHANGE_MODAL_VISIBLE = 'CHL_CHANGE_MODAL_VISIBLE';
export const CHL_ADD_TABLE_DATA = 'CHL_ADD_TABLE_DATA';
export const CHL_UPDATE_TABLE_DATA = 'CHL_UPDATE_TABLE_DATA';
export const CHL_CHANGE_MODAL_INFO = 'CHL_CHANGE_MODAL_INFO';
export const CHL_GET_ROLE_DATA = 'CHL_GET_ROLE_DATA';
export const CHL_SET_ROLE_DATA = 'CHL_SET_ROLE_DATA';


export const chlGetTableData = (params) => ({ type: CHL_GET_TABLE_DATA, params });
export const chlSetTableData = (data) => ({ type: CHL_SET_TABLE_DATA, data });
export const chlChangeTableLoading = (option) => ({ type: CHL_CHANGE_TABLE_LOADING, option });
export const chlChangeModalVisible = (option) => ({ type: CHL_CHANGE_MODAL_VISIBLE, option });
export const chlAddTableData = (params) => ({ type: CHL_ADD_TABLE_DATA, params });
export const chlUpdateTableData = (params) => ({ type: CHL_UPDATE_TABLE_DATA, params});
export const chlChangeModalInfo = (info) => ({ type: CHL_CHANGE_MODAL_INFO, info });
export const chlGetRoleData = (params) => ({ type: CHL_GET_ROLE_DATA, params });
export const chlSetRoleData = (data) => ({ type: CHL_SET_ROLE_DATA, data });
