export const RVB_REMOVE_BILL = 'RVB_REMOVE_BILL';
export const RVB_CHANGE_BTN_OPTION = 'RVB_CHANGE_BTN_OPTION';

export const rvbRemoveBill = (params, callback) => ({ type: RVB_REMOVE_BILL, params, callback });
export const rvbChangeBtnOption = (option) => ({ type: RVB_CHANGE_BTN_OPTION, option });