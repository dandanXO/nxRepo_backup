export const ADS_GET_TABLE_DATA = 'ADS_GET_TABLE_DATA';
export const ADS_SET_TABLE_DATA = 'ADS_SET_TABLE_DATA';
export const ADS_CHANGE_TABLE_LOADING = 'ADS_CHANGE_TABLE_LOADING';

export const adsGetTableData = (params) => ({ type: ADS_GET_TABLE_DATA, params });
export const adsSetTableData = (data) => ({ type: ADS_SET_TABLE_DATA, data });
export const adsChangeTableLoading = (option) => ({ type: ADS_CHANGE_TABLE_LOADING, option });