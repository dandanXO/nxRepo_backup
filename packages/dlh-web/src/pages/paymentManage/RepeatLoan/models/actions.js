/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
export const RPL_GET_TABLE_DATA = 'RPL_GET_TABLE_DATA';
export const RPL_SET_TABLE_DATA = 'RPL_SET_TABLE_DATA';
export const RPL_CHANGE_TABLE_LOADING = 'RPL_CHANGE_TABLE_LOADING';
export const RPL_CHANGE_MODAL_VISIBLE = 'RPL_CHANGE_MODAL_VISIBLE';
export const RPL_GET__MODAL_DATA = 'RPL_GET__MODAL_DATA';
export const RPL_SET_MODAL_DATA = 'RPL_SET_MODAL_DATA';
export const RPL_CHANGE_MODAL_LOADING = 'RPL_SET_MODAL_LOADING';
export const RPL_REPEAT_PAY = 'RPL_REPEAT_PAY';
export const RPL_CHANGE_SELECTED_KEY = 'RPL_CHANGE_SELECTED_KEY';
export const RPL_BATCH_RELOAN = 'RPL_BATCH_RELOAN';
export const RPL_REFUSE_LOAN = 'RPL_REFUSE_LOAN';

export const rplGetTableData = (params, callback) => ({ type: RPL_GET_TABLE_DATA, params, callback });
export const rplSetTableData = (data) => ({ type: RPL_SET_TABLE_DATA, data });
export const rplChangeTableLoading = (option) => ({ type: RPL_CHANGE_TABLE_LOADING, option });
export const rplChangeModalVisible = (option) => ({ type: RPL_CHANGE_MODAL_VISIBLE, option });
export const rplGetModalData = (params) => ({ type: RPL_GET__MODAL_DATA, params });
export const rplSetModalData = (data) => ({ type: RPL_SET_MODAL_DATA, data });
export const rplChangeModalLoading = (option) => ({ type: RPL_CHANGE_MODAL_LOADING, option });
export const rplRepeatPay = (params, callback) => ({ type: RPL_REPEAT_PAY, params, callback });
export const rplChangeSelectKey = (data) => ({ type: RPL_CHANGE_SELECTED_KEY, data });
export const rplBatchReLoan = (params, callback) => ({ type: RPL_BATCH_RELOAN, params, callback });
export const rplRefuseLoan = (params, callback) => ({ type: RPL_REFUSE_LOAN, params, callback });
