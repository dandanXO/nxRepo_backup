export const ASSET_DETAIL_GET_TABLE_DATA = 'ASSET_DETAIL_GET_TABLE_DATA';
export const ASSET_DETAIL_SET_TABLE_DATA = 'ASSET_DETAIL_SET_TABLE_DATA';
export const ASSET_DETAIL_CHANGE_TABLE_LOADING = 'ASSET_DETAIL_CHANGE_TABLE_LOADING';


export const assetDetailGetTableData = (params) => ({ type: ASSET_DETAIL_GET_TABLE_DATA, params });
export const assetDetailSetTableData = (data) => ({ type: ASSET_DETAIL_SET_TABLE_DATA, data });
export const assetDetailChangeTableLoading = (option) => ({ type: ASSET_DETAIL_CHANGE_TABLE_LOADING, option });