export const MMG_GET_TABLE_DATA = 'MMG_GET_TABLE_DATA';
export const MMG_SET_TABLE_DATA = 'MMG_SET_TABLE_DATA';
export const MMG_CHANGE_TABLE_LOADING = 'MMG_CHANGE_TABLE_LOADING';
export const MMG_CHANGE_MODAL_VISIBLE = 'MMG_CHANGE_MODAL_VISIBLE';
export const MMG_ADD_TREE_DATA = 'MMG_ADD_TREE_DATA';
export const MMG_UPDATE_TREE_DATA = 'MMG_UPDATE_TREE_DATA';
export const MMG_DEL_TREE_DATA = 'MMG_DEL_TREE_DATA';


export const mmgGetTableData = (params) => ({ type: MMG_GET_TABLE_DATA, params });
export const mmgSetTableData = (data) => ({ type:MMG_SET_TABLE_DATA, data });
export const mmgChangeTableLoading = (option) => ({ type: MMG_CHANGE_TABLE_LOADING, option });
export const mmgChangeModalVisible = (option) => ({ type: MMG_CHANGE_MODAL_VISIBLE, option });
export const mmgAddTreeData = (params) => ({ type: MMG_ADD_TREE_DATA, params });
export const mmgUpdateTreeData = (params) => ({ type: MMG_UPDATE_TREE_DATA, params });
export const mmgDelTreeData = (params) => ({ type: MMG_DEL_TREE_DATA, params });
