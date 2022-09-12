/*
* api
* */
import {axios} from 'utils';

// {"code":200,"data":{"newPawd":"OPtOfE"}}
const api = {
    userListData: '/hs/admin/userReview/getUserListFinalReview',
    userDetailData: '/hs/admin/userReview/getUserInfo',
    postCheckData: '/hs/admin/userReview/review2yee',
    batchPostCheckData: '/hs/admin/userReview/batchReview2yee',
    operatorListData: '/hs/admin/userReview/getUserYYsInfo',
    modifyPwd: '/hs/admin/icloud/newPawd',
    distributeUser: '/hs/admin/userReview/allocationUser2',
    getUnionDebtsInfo: '/hs/admin/userReview/getUnionDebtsInfo',
    reloadUnionDebtsInfo: '/hs/admin/userReview/reloadUnionDebtsInfo',
};
const getUserListData = (params) => {
    return axios.post(api.userListData, params);
}
const getUserDetailData = (params) => {
    return axios.post(api.userDetailData, params);
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
const distributeUser = (params) => {
    return axios.post(api.distributeUser, params);
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
    getUserListData,
    getUserDetailData,
    postCheckData,
    batchPostCheckData,
    getOperatorListData,
    postModifyPwd,
    distributeUser,
    getUnionDebtsInfo,
    reloadUnionDebtsInfo
};