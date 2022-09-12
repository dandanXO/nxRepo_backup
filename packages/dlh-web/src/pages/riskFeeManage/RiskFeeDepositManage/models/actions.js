
export const RFM2_GET_TABLE_DATA = 'RFM2_GET_TABLE_DATA';
export const RFM2_SET_TABLE_DATA = 'RFM2_SET_TABLE_DATA';
export const RFM2_CHANGE_TABLE_LOADING = 'RFM2_CHANGE_TABLE_LOADING';
export const RFM2_CHANGE_MODAL_VISIBLE = 'RFM2_CHANGE_MODAL_VISIBLE';
export const RFM2_ADD_TABLE_DATA = 'RFM2_ADD_TABLE_DATA';
export const RFM2_CHANGE_MODAL_INFO = 'RFM2_CHANGE_MODAL_INFO';



export const rfm2GetTableData = (params) => ({ type: RFM2_GET_TABLE_DATA, params });
export const rfm2SetTableData = (data) => ({ type: RFM2_SET_TABLE_DATA, data });
export const rfm2ChangeTableLoading = (option) => ({ type: RFM2_CHANGE_TABLE_LOADING, option });
export const rfm2ChangeModalVisible = (option) => ({ type: RFM2_CHANGE_MODAL_VISIBLE, option });
export const rfm2AddTableData = (params) => ({ type: RFM2_ADD_TABLE_DATA, params });
export const rfm2ChangeModalInfo = (info) => ({ type: RFM2_CHANGE_MODAL_INFO, info });