export const OOD_GET_TABLE_DATA = 'OOD_GET_TABLE_DATA';
export const OOD_SET_TABLE_DATA = 'OOD_SET_TABLE_DATA';
export const OOD_CHANGE_TABLE_LOADING = 'OOD_CHANGE_TABLE_LOADING';
export const OOD_CHANGE_MODAL_VISIBLE = 'OOD_CHANGE_MODAL_VISIBLE';
export const OOD_GET_PERSON_DATA = 'OOD_GET_PERSON_DATA';
export const OOD_SET_PERSON_DATA = 'OOD_SET_PERSON_DATA';
export const OOD_DISTRIBUTE_ORDER = 'ODD_DISTRIBUTE_ORDER';
export const OOD_CHANGE_SELECT_KEY = 'OOD_CHANGE_SELECT_KEY';
export const OOD_CHANGE_PERSON_TYPE = 'OOD_CHANGE_PERSON_TYPE';


export const oodGetTableData = (params) => ({ type: OOD_GET_TABLE_DATA, params });
export const oodSetTableData = (data) => ({ type: OOD_SET_TABLE_DATA, data });
export const oodChangeTableLoading = (option) => ({ type: OOD_CHANGE_TABLE_LOADING, option });
export const oodChangeModalVisible = (option) => ({ type: OOD_CHANGE_MODAL_VISIBLE, option });
export const oodGetPersonData = (params) => ({ type: OOD_GET_PERSON_DATA, params });
export const oodSetPersonData = (data) => ({ type: OOD_SET_PERSON_DATA, data });
export const oodDistributeOrder = (params, callBack) => ({ type: OOD_DISTRIBUTE_ORDER, params, callBack });
export const oodChangeSelectKey = (data) => ({ type: OOD_CHANGE_SELECT_KEY, data });
export const oodChangePersonType = (option) => ({ type: OOD_CHANGE_PERSON_TYPE, option });