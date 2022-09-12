/*
* orderList action
* */

export const ORL_GET_TABLE_DATA = 'ORL_GET_TABLE_DATA';
export const ORL_SET_TABLE_DATA = 'ORL_SET_TABLE_DATA';
export const ORL_CHANGE_TABLE_LOADING = 'ORL_CHANGE_TABLE_LOADING';
export const ORL_GET_ORDER_DETAIL = 'ORL_GET_ORDER_DETAIL';
export const ORL_SET_ORDER_DETAIL = 'ORL_SET_ORDER_DETAIL';
export const ORL_CHANGE_DETAIL_MODAL = 'ORL_CHANGE_DETAIL_MODAL';
export const ORL_CHANGE_AUTH_MODAL = 'ORL_CHANGE_AUTH_MODAL';
export const ORL_GET_AUTH_DATA = 'ORL_GET_AUTH_DATA';
export const ORL_SET_AUTH_DATA = 'ORL_SET_AUTH_DATA';
export const ORL_RESET_OPERATOR = 'ORL_RESET_OPERATOR';

export const orlGetTableData = (params) => ({ type: ORL_GET_TABLE_DATA, params });
export const orlSetTableData = (data) => ({ type: ORL_SET_TABLE_DATA, data });
export const orlChangeTableLoading = (option) => ({ type: ORL_CHANGE_TABLE_LOADING, option });
export const orlGetOrderDetail = (params) => ({ type: ORL_GET_ORDER_DETAIL, params });
export const orlSetOrderDetail = (data) => ({ type: ORL_SET_ORDER_DETAIL, data });
export const orlChangeDetailModal = (option) => ({ type: ORL_CHANGE_DETAIL_MODAL, option });
export const orlChangeAuthModal = (option) => ({ type: ORL_CHANGE_AUTH_MODAL, option });
export const orlGetAuthData = (params) => ({ type: ORL_GET_AUTH_DATA, params });
export const orlSetAuthData = (data) => ({ type: ORL_SET_AUTH_DATA, data });
export const orlResetOperator = (params) => ({ type: ORL_RESET_OPERATOR, params });