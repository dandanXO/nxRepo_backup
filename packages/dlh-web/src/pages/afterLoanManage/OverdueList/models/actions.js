import {
  TODL_COLLECTOR_CHANGE_MODAL_LOADING, TODL_COLLECTOR_CHANGE_MODAL_VISIBLE,
  TODL_COLLECTOR_GET_MODAL_DATA,
  TODL_COLLECTOR_SET_MODAL_DATA
} from "../../../todayLoanManage/TodayList/models/actions";

export const ODL_GET_TABLE_DATA = 'ODL_GET_TABLE_DATA';
export const ODL_SET_TABLE_DATA = 'ODL_SET_TABLE_DATA';
export const ODL_CHANGE_TABLE_LOADING = 'ODL_CHANGE_TABLE_LOADING';
export const ODL_CHANGE_SEARCH_PARAMS = 'ODL_CHANGE_SEARCH_PARAMS';
export const ODL_GET_PERSON = 'ODL_GET_PERSON';
export const ODL_SET_PERSON = 'ODL_SET_PERSON';
export const ODL_CHANGE_MODAL_VISIBLE = 'ODL_CHANGE_MODAL_VISIBLE';
export const ODL_DISTRIBUTE_ORDER = 'ODL_DISTRIBUTE_ORDER';
export const ODL_CHANGE_SELECT_KEY = 'ODL_CHANGE_SELECT_KEY';
export const ODL_GET_COLLECTOR_SELECT= 'ODL_GET_COLLECTOR_SELECT';
export const ODL_SET_COLLECTOR_SELECT= 'ODL_SET_COLLECTOR_SELECT';
export const ODL_GET_PRODUCT_SELECT= 'ODL_GET_PRODUCT_SELECT';
export const ODL_SET_PRODUCT_SELECT= 'ODL_SET_PRODUCT_SELECT';

// 催收人紀錄
export const ODL_COLLECTOR_CHANGE_MODAL_LOADING = 'ODL_COLLECTOR_CHANGE_MODAL_LOADING';
export const ODL_COLLECTOR_CHANGE_MODAL_VISIBLE = 'ODL_COLLECTOR_CHANGE_MODAL_VISIBLE';
export const ODL_COLLECTOR_GET_MODAL_DATA = 'ODL_COLLECTOR_GET_MODAL_DATA';
export const ODL_COLLECTOR_SET_MODAL_DATA = 'ODL_COLLECTOR_SET_MODAL_DATA';

export const odlGetTableData = (params) => ({ type: ODL_GET_TABLE_DATA, params });
export const odlSetTableData = (data) => ({ type: ODL_SET_TABLE_DATA, data });
export const odlChangeTableLoading = (option) => ({ type: ODL_CHANGE_TABLE_LOADING, option });
export const odlChangeSearchParams = (params) => ({ type: ODL_CHANGE_SEARCH_PARAMS, params });
export const odlGetPerson = (params, callback) => ({ type: ODL_GET_PERSON, params, callback });
export const odlSetPerson = (data) => ({ type: ODL_SET_PERSON, data });
export const odlChangeModalVisible = (option) => ({ type: ODL_CHANGE_MODAL_VISIBLE, option });
export const odlDistributeOrder = (params, callBack) => ({ type: ODL_DISTRIBUTE_ORDER, params, callBack });
export const odlChangeSelectKey = (data) => ({ type: ODL_CHANGE_SELECT_KEY, data });
export const odlGetCollectorSelect = (params) => ({ type: ODL_GET_COLLECTOR_SELECT, params });
export const odlSetCollectorSelect = (data) => ({ type: ODL_SET_COLLECTOR_SELECT, data });
export const odlGetProductSelect = (params) => ({ type: ODL_GET_PRODUCT_SELECT, params });
export const odlSetProductSelect = (data) => ({ type: ODL_SET_PRODUCT_SELECT, data });

// 催收人紀錄
export const odlColleterChangeModalLoading = (option) => ({ type: ODL_COLLECTOR_CHANGE_MODAL_LOADING, option });
export const odlColleterChangeModalVisible = (option) => ({ type: ODL_COLLECTOR_CHANGE_MODAL_VISIBLE, option });
export const odlColletorGetModalData = (params) => ({ type: ODL_COLLECTOR_GET_MODAL_DATA, params });
export const odlColletorSetModalData = (data) => ({ type: ODL_COLLECTOR_SET_MODAL_DATA, data });

