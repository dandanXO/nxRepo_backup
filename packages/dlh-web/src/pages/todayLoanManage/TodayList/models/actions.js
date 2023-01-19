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
export const TODL_GET_PRODUCT_SELECT= 'TODL_GET_PRODUCT_SELECT';
export const TODL_SET_PRODUCT_SELECT= 'TODL_SET_PRODUCT_SELECT';
// 催收人紀錄
export const TODL_COLLECTOR_CHANGE_MODAL_LOADING = 'TODL_COLLECTOR_CHANGE_MODAL_LOADING';
export const TODL_COLLECTOR_CHANGE_MODAL_VISIBLE = 'TODL_COLLECTOR_CHANGE_MODAL_VISIBLE';
export const TODL_COLLECTOR_GET_MODAL_DATA = 'TODL_COLLECTOR_GET_MODAL_DATA';
export const TODL_COLLECTOR_SET_MODAL_DATA = 'TODL_COLLECTOR_SET_MODAL_DATA';
// 催收人員列表
export const TODL_GET_TODAY_COLLECTOR = 'TOOD_GET_TODAY_COLLECTOR';
export const TODL_SET_TODAY_COLLECTOR = 'TOOD_SET_TODAY_COLLECTOR';
export const TODL_GET_COLLECTOR_LIST = 'TODL_GET_COLLECTOR_LIST';
export const TODL_SET_COLLECTOR_LIST = 'TODL_SET_COLLECTOR_LIST';

export const todlGetTableData = (params) => ({ type: TODL_GET_TABLE_DATA, params });
export const todlSetTableData = (data) => ({ type: TODL_SET_TABLE_DATA, data });
export const todlChangeTableLoading = (option) => ({ type: TODL_CHANGE_TABLE_LOADING, option });
export const todlChangeSearchParams = (params) => ({ type: TODL_CHANGE_SEARCH_PARAMS, params });
export const todlGetPerson = (params, callback) => ({ type: TODL_GET_PERSON, params, callback });
export const todlSetPerson = (data) => ({ type: TODL_SET_PERSON, data });
export const todlChangeModalVisible = (option) => ({ type: TODL_CHANGE_MODAL_VISIBLE, option });
export const todlDistributeOrder = (params, callBack) => ({ type: TODL_DISTRIBUTE_ORDER, params, callBack });
export const todlChangeSelectKey = (data) => ({ type: TODL_CHANGE_SELECT_KEY, data });
export const todlChangePersonType = (option) => ({ type: TODL_CHANGE_PERSON_TYPE, option });
export const todlGetProductSelect = (params) => ({ type: TODL_GET_PRODUCT_SELECT, params });
export const todlSetProductSelect = (data) => ({ type: TODL_SET_PRODUCT_SELECT, data });
// 催收人紀錄
export const todlColleterChangeModalVisible = (option) => ({ type: TODL_COLLECTOR_CHANGE_MODAL_VISIBLE, option });
export const todlColleterChangeModalLoading = (option) => ({ type: TODL_COLLECTOR_CHANGE_MODAL_LOADING, option });
export const todlColletorGetModalData = (params) => ({ type: TODL_COLLECTOR_GET_MODAL_DATA, params });
export const todlColletorSetModalData = (data) => ({ type: TODL_COLLECTOR_SET_MODAL_DATA, data });
// 催收人員列表
export const todlGetTodayCollector = () => ({ type: TODL_GET_TODAY_COLLECTOR });
export const todlSetTodayCollector = (data) => ({ type: TODL_SET_TODAY_COLLECTOR, data });
export const todlGetCollectorList = () => ({ type: TODL_GET_COLLECTOR_LIST });
export const todlSetCollectorList = (data) => ({ type: TODL_SET_COLLECTOR_LIST, data });
