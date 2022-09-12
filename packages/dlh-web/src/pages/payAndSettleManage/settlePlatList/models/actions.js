export const SETTLE_PLAT_GET_TABLE_DATA = 'SETTLE_PLAT_GET_TABLE_DATA';
export const SETTLE_PLAT_SET_TABLE_DATA = 'SETTLE_PLAT_SET_TABLE_DATA';
export const SETTLE_PLAT_CHANGE_TABLE_LOADING = 'SETTLE_PLAT_CHANGE_TABLE_LOADING';
export const SETTLE_PLAT_CHANGE_MODAL_VISIBLE = 'SETTLE_PLAT_CHANGE_MODAL_VISIBLE';
export const SETTLE_PLAT_ADD_TABLE_DATA = 'SETTLE_PLAT_ADD_TABLE_DATA';
export const SETTLE_PLAT_UPDATE_TABLE_DATA = 'SETTLE_PLAT_UPDATE_TABLE_DATA';
export const SETTLE_PLAT_CHANGE_MODAL_INFO = 'SETTLE_PLAT_CHANGE_MODAL_INFO';
export const SETTLE_PLAT_DELETE_MODEL = 'SETTLE_PLAT_DELETE_MODEL';


export const settlePlatGetTableData = (params) => ({ type: SETTLE_PLAT_GET_TABLE_DATA, params });
export const settlePlatSetTableData = (data) => ({ type: SETTLE_PLAT_SET_TABLE_DATA, data });
export const settlePlatChangeTableLoading = (option) => ({ type: SETTLE_PLAT_CHANGE_TABLE_LOADING, option });
export const settlePlatChangeModalVisible = (option) => ({ type: SETTLE_PLAT_CHANGE_MODAL_VISIBLE, option });
export const settlePlatAddTableData = (params) => ({ type: SETTLE_PLAT_ADD_TABLE_DATA, params });
export const settlePlatUpdateTableData = (params) => ({ type: SETTLE_PLAT_UPDATE_TABLE_DATA, params});
export const settlePlatChangeModalInfo = (info) => ({ type: SETTLE_PLAT_CHANGE_MODAL_INFO, info });
export const deleteModel = (params)=>({ type: SETTLE_PLAT_DELETE_MODEL,params});