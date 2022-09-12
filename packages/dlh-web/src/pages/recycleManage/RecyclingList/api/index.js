/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/recoveryGoods/getRecoveryOrderList',
    confirm: '/hs/admin/recoveryGoods/submitRecieveOrder',
    close: '/hs/admin/recoveryGoods/CloseRecieveOrder',
    detail: '/hs/admin/recoveryGoods/GetRecieveOrderDetail',
    expressCompany: '/hs/admin/recoveryGoods/getExpressList',
    refuseReason: '/hs/admin/recoveryGoods/getExpressRefuseReasonList'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
};
const postConfirm = (params) => {
    return axios.post(api.confirm, params);
};
const postClose = (params) => {
    return axios.post(api.close, params);
};
const postDetail = (params) => {
    return axios.post(api.detail, params);
};
const getExpressCompany = (params) => {
    return axios.post(api.expressCompany, params);
};
const getRefuseReason = (params) => {
    return axios.post(api.refuseReason, params);
}

export { getOrderListData, postConfirm, postClose, postDetail, getExpressCompany, getRefuseReason };