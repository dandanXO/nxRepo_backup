/*
* api
* */
import { axios } from 'utils';
const api = {
    userInfoManageData: '/hs/admin/user-manage/user-list',
    goBlackList: '/hs/admin/black/setBlack',
    pushBlackList: '/hs/admin/black/pushBlack',
    userDetail: '/hs/admin/userDetails/findUserDetailsInfo',
    applyRecord: '/hs/admin/userDetails/findOrderList',
    operatorRecord: '/hs/admin/userDetails/findUserContactDetail',
    contactsRecord: '/hs/admin/userDetails/findUserContacts',
    smsLogRecord: '/hs/admin/userDetails/findUserSMSLogs',
    importTelSale:'/hs/admin/user-manage/tel-sale'
};
const getUserInfoManageData = (params) => {
    return axios.get(api.userInfoManageData, {params});
}
const goBlackList = (params) => {
    return axios.post(api.goBlackList, params);
}
const pushBlackList = (params) => {
    return axios.post(api.pushBlackList, params);
}
const userDetail = (params) => {
    return axios.post(api.userDetail, params);
}
const applyRecord = (params) => {
    return axios.post(api.applyRecord, params);
}
const operatorRecord = (params) => {
    return axios.post(api.operatorRecord, params);
}
const contactsRecord = (params) => {
    return axios.post(api.contactsRecord, params);
}
const smsLogRecord = (params) => {
    return axios.post(api.smsLogRecord, params);
}

const importTelSaleList = (params) => {
    return axios.post(api.importTelSale, params);
}

export { getUserInfoManageData, goBlackList, pushBlackList, userDetail, applyRecord, operatorRecord, contactsRecord, smsLogRecord, importTelSaleList };