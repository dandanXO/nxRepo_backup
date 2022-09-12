export const CHL_U_GET_TABLE_DATA = 'CHL_U_GET_TABLE_DATA';
export const CHL_U_SET_TABLE_DATA = 'CHL_U_SET_TABLE_DATA';
export const CHL_U_CHANGE_TABLE_LOADING = 'CHL_U_CHANGE_TABLE_LOADING';
export const CHL_U_CHANGE_MODAL_VISIBLE = 'CHL_U_CHANGE_MODAL_VISIBLE';
export const CHL_U_ADD_TABLE_DATA = 'CHL_U_ADD_TABLE_DATA';
export const CHL_U_UPDATE_TABLE_DATA = 'CHL_U_UPDATE_TABLE_DATA';
export const CHL_U_CHANGE_MODAL_INFO = 'CHL_U_CHANGE_MODAL_INFO';
export const CHL_U_SET_CHANNEL_DATA = 'CHL_U_SET_CHANNEL_DATA';
export const CHL_U_GET_CHANNEL_DATA = 'CHL_U_GET_CHANNEL_DATA';


export const chlUGetTableData = (params) => ({ type: CHL_U_GET_TABLE_DATA, params });
export const chlUSetTableData = (data) => ({ type: CHL_U_SET_TABLE_DATA, data });
export const chlUChangeTableLoading = (option) => ({ type: CHL_U_CHANGE_TABLE_LOADING, option });
export const chlUChangeModalVisible = (option) => ({ type: CHL_U_CHANGE_MODAL_VISIBLE, option });
export const chlUAddTableData = (params) => ({ type: CHL_U_ADD_TABLE_DATA, params });
export const chlUUpdateTableData = (params) => ({ type: CHL_U_UPDATE_TABLE_DATA, params});
export const chlUChangeModalInfo = (info) => ({ type: CHL_U_CHANGE_MODAL_INFO, info });
export const chalUGetChannelData = (params) => ({ type: CHL_U_GET_CHANNEL_DATA, params });
export const chalUSetChannelData = (data) => ({ type: CHL_U_SET_CHANNEL_DATA, data });
