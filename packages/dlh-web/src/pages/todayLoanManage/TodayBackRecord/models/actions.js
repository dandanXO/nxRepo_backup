export const TOBR_GET_TABLE_DATA = 'TOBR_GET_TABLE_DATA';
export const TOBR_SET_TABLE_DATA = 'TOBR_SET_TABLE_DATA';
export const TOBR_CHANGE_TABLE_LOADING = 'TOBR_CHANGE_TABLE_LOADING';
export const TOBR_GET_PAYMENT_DATA = 'TOBR_GET_PAYMENT_DATA';
export const TOBR_SET_PAYMENT_DATA = 'TOBR_SET_PAYMENT_DATA';

export const tobrGetTableData = (params) => ({ type: TOBR_GET_TABLE_DATA, params });
export const tobrSetTableData = (data) => ({ type: TOBR_SET_TABLE_DATA, data });
export const tobrChangeTableLoading = (option) => ({ type: TOBR_CHANGE_TABLE_LOADING, option });
export const tobrGetPaymentData = (params) => ({ type: TOBR_GET_PAYMENT_DATA, params });
export const tobrSetPaymentData = (data) => ({ type: TOBR_SET_PAYMENT_DATA, data });
