/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/order/getOrderList',
    orderDetailData: '/hs/admin/orderReview/getOrderInfo',
    authList: '/hs/admin/order/getOrderUserYYSStatus',
    resetOperator: '/hs/admin/order/resetUserYysStatus'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
}
const getOrderDetail = (params) => {
    return axios.post(api.orderDetailData, params);
}
const authList = (params) => {
    return axios.post(api.authList, params);
}
const resetOperator = (params) => {
    return axios.post(api.resetOperator, params);
}
export { getOrderListData, getOrderDetail, authList, resetOperator  };