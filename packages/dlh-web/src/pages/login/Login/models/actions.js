export const LG_GET_CODE = 'LG_GET_CODE';
export const LG_POST_LOGIN = 'LG_POST_LOGIN';
export const LG_CANCEL_TIMER = 'LG_CANCEL_TIMER';
export const LG_CHANGE_LOADING = 'LG_CHANGE_LOADING';

export const lgGetCode = (params) => ({
    type: LG_GET_CODE,
    params,
});
export const lgPostLogin = (params) => ({
    type: LG_POST_LOGIN,
    params
});
export const lgCancelTimer = (option) => ({
    type: LG_CANCEL_TIMER,
    option
})
export const lgChangeLoading = (option) => ({
    type: LG_CHANGE_LOADING,
    option
})
