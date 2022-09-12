
export const LOI_GET_TABLE_DATA = 'LOI_GET_TABLE_DATA';
export const LOI_SET_TABLE_DATA = 'LOI_SET_TABLE_DATA';
export const LOI_CHANGE_TABLE_LOADING = 'LOI_CHANGE_TABLE_LOADING';



export const loiGetTableData = (params) => ({ type: LOI_GET_TABLE_DATA, params });
export const loiSetTableData = (data) => ({ type: LOI_SET_TABLE_DATA, data });
export const loiChangeTableLoading = (option) => ({ type: LOI_CHANGE_TABLE_LOADING, option });
