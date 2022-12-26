import {
  LRD_CHANGE_MODAL_LOADING, LRD_CHANGE_MODAL_VISIBLE,
  LRD_GET_MODAL_DATA,
  LRD_SET_MODAL_DATA
} from "../../../paymentManage/LoanRecord/models/actions";

export const TODL_GET_TABLE_DATA = 'TODL_GET_TABLE_DATA';
export const TODL_SET_TABLE_DATA = 'TODL_SET_TABLE_DATA';
export const TODL_CHANGE_TABLE_LOADING = 'TODL_CHANGE_TABLE_LOADING';
export const TODL_CHANGE_SEARCH_PARAMS = 'TODL_CHANGE_SEARCH_PARAMS';
export const TODL_GET_PERSON = 'TODL_GET_PERSON';
export const TODL_SET_PERSON = 'TODL_SET_PERSON';
export const TODL_CHANGE_MODAL_VISIBLE = 'TODL_CHANGE_MODAL_VISIBLE';
export const TODL_DISTRIBUTE_ORDER = 'TODL_DISTRIBUTE_ORDER';
export const TODL_CHANGE_SELECT_KEY = 'TODL_CHANGE_SELECT_KEY';
export const TODL_CHANGE_PERSON_TYPE = 'TODL_CHANGE_PERSON_TYPE';
// 催收人紀錄
export const TODL_COLLECTOR_CHANGE_MODAL_LOADING = 'TODL_COLLECTOR_CHANGE_MODAL_LOADING';
export const TODL_COLLECTOR_CHANGE_MODAL_VISIBLE = 'TODL_COLLECTOR_CHANGE_MODAL_VISIBLE';
export const TODL_COLLECTOR_GET_MODAL_DATA = 'TODL_COLLECTOR_GET_MODAL_DATA';
export const TODL_COLLECTOR_SET_MODAL_DATA = 'TODL_COLLECTOR_SET_MODAL_DATA';

export const todlGetTableData = (params) => ({ type: TODL_GET_TABLE_DATA, params });
export const todlSetTableData = (data) => ({ type: TODL_SET_TABLE_DATA, data });
export const todlChangeTableLoading = (option) => ({ type: TODL_CHANGE_TABLE_LOADING, option });
export const todlChangeSearchParams = (params) => ({ type: TODL_CHANGE_SEARCH_PARAMS, params });
export const todlGetPerson = (params, callback) => ({ type: TODL_GET_PERSON, params, callback });
export const todlSetPerson = (data) => ({ type: TODL_SET_PERSON, data });
export const todlChangeModalVisible = (option) => ({ type: TODL_CHANGE_MODAL_VISIBLE, option });
export const todlDistributeOrder = (params, callBack) => ({ type: TODL_DISTRIBUTE_ORDER, params, callBack });
export const todlChangeSelectKey = (data) => ({ type: TODL_CHANGE_SELECT_KEY, data });
export const todlChangePersonType = (option) => ({ type: TODL_CHANGE_PERSON_TYPE, option })
// 催收人紀錄
export const todlColletorGetModalData = (params) => ({ type: TODL_COLLECTOR_GET_MODAL_DATA, params });
export const todlColletorSetModalData = (data) => ({ type: TODL_COLLECTOR_SET_MODAL_DATA, data });
export const todlColleterChangeModalLoading = (option) => ({ type: TODL_COLLECTOR_CHANGE_MODAL_LOADING, option });
export const todlColleterChangeModalVisible = (option) => ({ type: TODL_COLLECTOR_CHANGE_MODAL_VISIBLE, option });
