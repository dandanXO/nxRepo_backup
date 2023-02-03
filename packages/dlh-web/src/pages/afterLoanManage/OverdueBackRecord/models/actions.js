export const OBR_GET_TABLE_DATA = 'OBR_GET_TABLE_DATA';
export const OBR_SET_TABLE_DATA = 'OBR_SET_TABLE_DATA';
export const OBR_CHANGE_TABLE_LOADING = 'OBR_CHANGE_TABLE_LOADING';
export const OBR_GET_PAYMENT_DATA = 'OBR_GET_PAYMENT_DATA';
export const OBR_SET_PAYMENT_DATA = 'OBR_SET_PAYMENT_DATA';


export const obrGetTableData = (params) => ({ type: OBR_GET_TABLE_DATA, params });
export const obrSetTableData = (data) => ({ type: OBR_SET_TABLE_DATA, data });
export const obrChangeTableLoading = (option) => ({ type: OBR_CHANGE_TABLE_LOADING, option });
export const obrGetPaymentData = (params) => ({ type: OBR_GET_PAYMENT_DATA, params });
export const obrSetPaymentData = (data) => ({ type: OBR_SET_PAYMENT_DATA, data });
