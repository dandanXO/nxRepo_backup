/*
* api
* */
import {axios} from 'utils';

// {"code":200,"data":{"newPawd":"OPtOfE"}}
const api = {
    orderListData: '/hs/admin/order/getOrderListFinalReview',
    orderDetailData: '/hs/admin/orderReview/getOrderInfo',
    postCheckData: '/hs/admin/orderReview/review2yee',
    batchPostCheckData: '/hs/admin/orderReview/batchReview2yee',
    operatorListData: '/hs/admin/orderReview/getUserYYsInfo',
    modifyPwd: '/hs/admin/icloud/newPawd',
    distributeOrder: '/hs/admin/orderReview/allocationOrder2',
    getUnionDebtsInfo: '/hs/admin/orderReview/getUnionDebtsInfo',
    reloadUnionDebtsInfo: '/hs/admin/orderReview/reloadUnionDebtsInfo',
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
}
const getOrderDetailData = (params) => {
    return axios.post(api.orderDetailData, params);
}
const postCheckData = (params) => {
    return axios.post(api.postCheckData, params);
}
const batchPostCheckData = (params) => {
    return axios.post(api.batchPostCheckData, params);
}
const getOperatorListData = (params) => {
    return axios.post(api.operatorListData,params);
}
const postModifyPwd = (params) => {
    return axios.post(api.modifyPwd, params);
}
const distributeOrder = (params) => {
    return axios.post(api.distributeOrder, params);
}

const reapeatDistribute = (params) => {
    return axios.post(api.repeatDistribute, params);
}
const getUnionDebtsInfo = (params) => {
    return axios.post(api.getUnionDebtsInfo, params);
}
const reloadUnionDebtsInfo = (params) => {
    return axios.post(api.reloadUnionDebtsInfo, params);
}
export {
    getOrderListData,
    getOrderDetailData,
    postCheckData,
    batchPostCheckData,
    getOperatorListData,
    postModifyPwd,
    distributeOrder,
    getUnionDebtsInfo,
    reloadUnionDebtsInfo
};