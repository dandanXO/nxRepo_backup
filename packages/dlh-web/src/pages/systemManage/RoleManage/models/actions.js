export const RLM_GET_TABLE_DATA = 'RLM_GET_TABLE_DATA';
export const RLM_SET_TABLE_DATA = 'RLM_SET_TABLE_DATA';
export const RLM_CHANGE_TABLE_LOADING = 'RLM_CHANGE_TABLE_LOADING';
export const RLM_CHANGE_MODAL_VISIBLE = 'RMM_CHANGE_MODAL_VISIBLE';
export const RLM_GET_MENU_LIST = 'RLM_GET_MENU_LIST';
export const RLM_SET_MENU_LIST = 'RLM_SET_MENU_LIST';
export const RLM_ADD_ROLE_LIST = 'RLM_ADD_ROLE_LIST';
export const RLM_UPDATE_ROLE_LIST = 'RLM_UPDATE_ROLE_LIST';
export const RLM_DEL_ROLE_LIST = 'RLM_DEL_ROLE_LIST';

export const rlmGetTableData = (params) => ({ type: RLM_GET_TABLE_DATA, params });
export const rlmSetTableData = (data) => ({ type: RLM_SET_TABLE_DATA, data });
export const rlmChangeTableLoading = (option) => ({ type: RLM_CHANGE_TABLE_LOADING, option });
export const rlmChangeModalVisible = (option) => ({ type: RLM_CHANGE_MODAL_VISIBLE, option });
export const rlmGetMenuList = (params) => ({ type: RLM_GET_MENU_LIST, params });
export const rlmSetMenuList = (data) => ({ type: RLM_SET_MENU_LIST, data });
export const rlmAddRoleList = (params) => ({ type: RLM_ADD_ROLE_LIST, params });
export const rlmUpdateRoleList = (params) => ({ type: RLM_UPDATE_ROLE_LIST, params });
export const rlmDelRoleList = (params) => ({ type: RLM_DEL_ROLE_LIST, params });