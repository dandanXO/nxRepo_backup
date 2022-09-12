import {TODL_CHANGE_SEARCH_PARAMS} from "../../TodayList/models/actions";

export const TPUL_GET_TABLE_DATA = 'TPUL_GET_TABLE_DATA';
export const TPUL_SET_TABLE_DATA = 'TPUL_SET_TABLE_DATA';
export const TPUL_CHANGE_TABLE_LOADING = 'TPUL_CHANGE_TABLE_LOADING';
export const TPUL_CHANGE_SEARCH_PARAMS = 'TODL_CHANGE_SEARCH_PARAMS';


export const tpulGetTableData = (params) => ({ type: TPUL_GET_TABLE_DATA, params });
export const tpulSetTableData = (data) => ({ type: TPUL_SET_TABLE_DATA, data });
export const tpulChangeTableLoading = (option) => ({ type: TPUL_CHANGE_TABLE_LOADING, option });
export const tpulChangeSearchParams = (params) => ({ type: TODL_CHANGE_SEARCH_PARAMS, params });