/*
* api
* */
import {axios} from 'utils';

const api = {
    // orderListData: '/hs/admin/order/getOrderList',
    orderListData: '/hs/admin/order/getOrderListReview',
    operatorListData: '/hs/admin/orderReview/getUserYYsInfo',
    orderDetailData: '/hs/admin/orderReview/getOrderInfo',
    postCheckData: '/hs/admin/orderReview/review1',
    batchRepeatChecking:'/hs/admin/orderReview/batchReview1',
    getUploadToken: '/hs/admin/orderReview/getUploadTokenIcloud',
    // distributeICloud: '/hs/admin/icloud/allocationIcloud',
    distributeICloud: '/hs/admin/icloud/allocationActivedIcloud',
    uploadImg: '/hs/admin/icloud/saveIcloudImg',
    distributeOrder: '/hs/admin/orderReview/allocationOrder1',
    repeatDistribute: '/hs/admin/icloud/reAllocationIcloud',
    getUnionDebtsInfo: '/hs/admin/orderReview/getUnionDebtsInfo',
    reloadUnionDebtsInfo: '/hs/admin/orderReview/reloadUnionDebtsInfo',
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
}
const getOperatorListData = (params) => {
    return axios.post(api.operatorListData,params);
}
const getOrderDetailData = (params) => {
    return axios.post(api.orderDetailData, params);
}
const postCheckData = (params) => {
    return axios.post(api.postCheckData, params);
}
const batchRepeatChecking = (params) => {
    return axios.post(api.batchRepeatChecking, params);
}
const getUploadToken = (params) => {
    return axios.post(api.getUploadToken, params);
}
const postDistributeAccount = (params) => {
    return axios.post(api.distributeICloud, params);
}
const postUploadImg = (params) => {
    return axios.post(api.uploadImg, params);
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
    batchRepeatChecking,
    getUploadToken,
    getOperatorListData,
    postDistributeAccount,
    postUploadImg,
    distributeOrder,
    reapeatDistribute,
    getUnionDebtsInfo,
    reloadUnionDebtsInfo,

};