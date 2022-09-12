/*
* api
* */
import {axios} from 'utils';

const api = {
    // userListData: '/hs/admin/user/getUserList',
    userListData: '/hs/admin/userReview/getUserListReview',
    operatorListData: '/hs/admin/userDetails/findUserContacts',
    userDetailData: '/hs/admin/userReview/getUserInfo',
    postCheckData: '/hs/admin/userReview/review1',
    batchRepeatChecking:'/hs/admin/userReview/batchReview1',
    getUploadToken: '/hs/admin/userReview/getUploadTokenIcloud',
    // distributeICloud: '/hs/admin/icloud/allocationIcloud',
    distributeICloud: '/hs/admin/icloud/allocationActivedIcloud',
    uploadImg: '/hs/admin/icloud/saveIcloudImg',
    distributeUser: '/hs/admin/userReview/allocationUser1',
    repeatDistribute: '/hs/admin/icloud/reAllocationIcloud',
    getUnionDebtsInfo: '/hs/admin/userReview/getUnionDebtsInfo',
    reloadUnionDebtsInfo: '/hs/admin/userReview/reloadUnionDebtsInfo',
};
const getUserListData = (params) => {
    return axios.post(api.userListData, params);
}
const getOperatorListData = (params) => {
    return axios.post(api.operatorListData,params);
}
const getUserDetailData = (params) => {
    return axios.post(api.userDetailData, params);
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
    batchRepeatChecking,
    getUploadToken,
    getOperatorListData,
    postDistributeAccount,
    postUploadImg,
    distributeUser,
    reapeatDistribute,
    getUnionDebtsInfo,
    reloadUnionDebtsInfo,

};