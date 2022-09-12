export const TOOD_GET_TABLE_DATA = 'TOOD_GET_TABLE_DATA';
export const TOOD_SET_TABLE_DATA = 'TOOD_SET_TABLE_DATA';
export const TOOD_CHANGE_TABLE_LOADING = 'TOOD_CHANGE_TABLE_LOADING';
export const TOOD_CHANGE_MODAL_VISIBLE = 'TOOD_CHANGE_MODAL_VISIBLE';
export const TOOD_GET_PERSON_DATA = 'TOOD_GET_PERSON_DATA';
export const TOOD_SET_PERSON_DATA = 'TOOD_SET_PERSON_DATA';
export const TOOD_DISTRIBUTE_ORDER = 'TODD_DISTRIBUTE_ORDER';
export const TOOD_CHANGE_SELECT_KEY = 'TOOD_CHANGE_SELECT_KEY';
export const TOOD_CHANGE_PERSON_TYPE = 'TOOD_CHANGE_PERSON_TYPE';


export const toodGetTableData = (params) => ({ type: TOOD_GET_TABLE_DATA, params });
export const toodSetTableData = (data) => ({ type: TOOD_SET_TABLE_DATA, data });
export const toodChangeTableLoading = (option) => ({ type: TOOD_CHANGE_TABLE_LOADING, option });
export const toodChangeModalVisible = (option) => ({ type: TOOD_CHANGE_MODAL_VISIBLE, option });
export const toodGetPersonData = (params) => ({ type: TOOD_GET_PERSON_DATA, params });
export const toodSetPersonData = (data) => ({ type: TOOD_SET_PERSON_DATA, data });
export const toodDistributeOrder = (params, callBack) => ({ type: TOOD_DISTRIBUTE_ORDER, params, callBack });
export const toodChangeSelectKey = (data) => ({ type: TOOD_CHANGE_SELECT_KEY, data });
export const toodChangePersonType = (option) => ({ type: TOOD_CHANGE_PERSON_TYPE, option });