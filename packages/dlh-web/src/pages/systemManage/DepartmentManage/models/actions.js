export const DTM_GET_TABLE_DATA = 'DTM_GET_TABLE_DATA';
export const DTM_SET_TABLE_DATA = 'DTM_SET_TABLE_DATA';
export const DTM_CHANGE_TABLE_LOADING = 'DTM_CHANGE_TABLE_LOADING';
export const DTM_CHANGE_MODAL_VISIBLE = 'DTM_CHANGE_MODAL_VISIBLE';
export const DTM_ADD_TABLE_DATA = 'DTM_ADD_TABLE_DATA';
export const DTM_UPDATE_TABLE_DATA = 'DTM_UPDATE_TABLE_DATA';
export const DTM_DEL_TABLE_DATA = 'DTM_DEL_TABLE_DATA';
export const DTM_GET_PERSON_DATA = 'DTM_GET_PERSON_DATA';
export const DTM_SET_PERSON_DATA = 'DTM_SET_PERSON_DATA';

export const dtmGetTableData = (params) => ({ type: DTM_GET_TABLE_DATA, params });
export const dtmSetTableData = (data) => ({ type: DTM_SET_TABLE_DATA, data });
export const dtmChangeTableLoading = (option) => ({ type: DTM_CHANGE_TABLE_LOADING, option });
export const dtmChangeModalVisible = (option) => ({ type: DTM_CHANGE_MODAL_VISIBLE, option });
export const dtmAddTableData = (params) => ({ type: DTM_ADD_TABLE_DATA, params });
export const dtmUpdateTableData = (params) => ({ type: DTM_UPDATE_TABLE_DATA, params });
export const dtmDelTableData = (params) => ({ type: DTM_DEL_TABLE_DATA, params });
export const dtmGetPersonData = (params) => ({ type: DTM_GET_PERSON_DATA, params });
export const dtmSetPersonData = (data) => ({ type: DTM_SET_PERSON_DATA, data });