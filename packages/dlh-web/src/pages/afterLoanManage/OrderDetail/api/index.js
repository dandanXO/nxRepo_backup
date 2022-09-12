/*
* api
* */
import { axios } from 'utils';
const api = {
    orderDetail: '/hs/admin/orderOverdue/detail',
    userContacts: '/hs/admin/user/contacts',
    operator: '/hs/admin/user/contactDetail',
    urgeRecord: '/hs/admin/overdueCollection/list',
    addRecord: '/hs/admin/overdueCollection/add',
    partialRepayment: '/hs/admin/orderOverdue/partial-repayment'
};
const getOrderDetail = (params) => {
    return axios.post(api.orderDetail, params);
}
const getUserContacts = (params) => {
    return axios.post(api.userContacts, params);
}
const getOperator = (params) => {
    return axios.post(api.operator, params);
}
const getUrgeRecord = (params) => {
    return axios.post(api.urgeRecord, params);
}
const addUrgeRecord = (params) => {
    return axios.post(api.addRecord, params);
}

const partialRepayment = (params) => {
    return axios.post(api.partialRepayment, params);
}

export { getOrderDetail, getUserContacts, getOperator, getUrgeRecord, addUrgeRecord, partialRepayment };