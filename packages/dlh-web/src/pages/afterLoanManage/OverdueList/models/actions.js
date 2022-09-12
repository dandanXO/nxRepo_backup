export const ODL_GET_TABLE_DATA = 'ODL_GET_TABLE_DATA';
export const ODL_SET_TABLE_DATA = 'ODL_SET_TABLE_DATA';
export const ODL_CHANGE_TABLE_LOADING = 'ODL_CHANGE_TABLE_LOADING';
export const ODL_CHANGE_SEARCH_PARAMS = 'ODL_CHANGE_SEARCH_PARAMS';
export const ODL_GET_PERSON = 'ODL_GET_PERSON';
export const ODL_SET_PERSON = 'ODL_SET_PERSON';
export const ODL_CHANGE_MODAL_VISIBLE = 'ODL_CHANGE_MODAL_VISIBLE';
export const ODL_DISTRIBUTE_ORDER = 'ODL_DISTRIBUTE_ORDER';
export const ODL_CHANGE_SELECT_KEY = 'ODL_CHANGE_SELECT_KEY';
export const ODL_CHANGE_PERSON_TYPE = 'ODL_CHANGE_PERSON_TYPE';

export const odlGetTableData = (params) => ({ type: ODL_GET_TABLE_DATA, params });
export const odlSetTableData = (data) => ({ type: ODL_SET_TABLE_DATA, data });
export const odlChangeTableLoading = (option) => ({ type: ODL_CHANGE_TABLE_LOADING, option });
export const odlChangeSearchParams = (params) => ({ type: ODL_CHANGE_SEARCH_PARAMS, params });
export const odlGetPerson = (params, callback) => ({ type: ODL_GET_PERSON, params, callback });
export const odlSetPerson = (data) => ({ type: ODL_SET_PERSON, data });
export const odlChangeModalVisible = (option) => ({ type: ODL_CHANGE_MODAL_VISIBLE, option });
export const odlDistributeOrder = (params, callBack) => ({ type: ODL_DISTRIBUTE_ORDER, params, callBack });
export const odlChangeSelectKey = (data) => ({ type: ODL_CHANGE_SELECT_KEY, data });
export const odlChangePersonType = (option) => ({ type: ODL_CHANGE_PERSON_TYPE, option })