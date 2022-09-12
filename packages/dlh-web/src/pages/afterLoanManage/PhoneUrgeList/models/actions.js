import {ODL_CHANGE_SEARCH_PARAMS} from "../../OverdueList/models/actions";

export const PUL_GET_TABLE_DATA = 'PUL_GET_TABLE_DATA';
export const PUL_SET_TABLE_DATA = 'PUL_SET_TABLE_DATA';
export const PUL_CHANGE_TABLE_LOADING = 'PUL_CHANGE_TABLE_LOADING';
export const PUL_CHANGE_SEARCH_PARAMS = 'ODL_CHANGE_SEARCH_PARAMS';


export const pulGetTableData = (params) => ({ type: PUL_GET_TABLE_DATA, params });
export const pulSetTableData = (data) => ({ type: PUL_SET_TABLE_DATA, data });
export const pulChangeTableLoading = (option) => ({ type: PUL_CHANGE_TABLE_LOADING, option });
export const pulChangeSearchParams = (params) => ({ type: ODL_CHANGE_SEARCH_PARAMS, params });