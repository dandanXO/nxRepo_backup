/*
* api
* */
import { axios } from 'utils';
const api = {
    orderDetail: '/hs/admin/orderOverdue/detail',
    userContacts: '/hs/admin/collect-overdue/user-contacts',
    userSmsLogs: '/hs/admin/collect-overdue/user-sms-logs',
    operator: '/hs/admin/user/contactDetail',
    urgeRecord: '/hs/admin/collect-overdue/collect-records',
    addRecord: '/hs/admin/overdueCollection/add',
    partialRepayment: '/hs/admin/orderOverdue/partial-repayment',
    detailTabControl: '/hs/admin/commons/admin-switch'

};
const getOrderDetail = (params) => {
    return axios.post(api.orderDetail, params);
}
const getUserContacts = (params) => {
    return axios.get(api.userContacts, { params: params });
}
const getUserSmsLogs = (params) => {
    return axios.get(api.userSmsLogs,  {params: params });
}
const getOperator = (params) => {
    return axios.post(api.operator, params);
}
const getUrgeRecord = (params) => {
    return axios.get(`${api.urgeRecord}/${params.overdueId}`, { params: { pageSize: 300 } });
}
const addUrgeRecord = (params) => {
    return axios.post(api.addRecord, params);
}

const partialRepayment = (params) => {
    return axios.post(api.partialRepayment, params);
}

const getDetailTabControl = () => {
    return axios.get(api.detailTabControl);
}

export { getOrderDetail, getUserContacts, getUserSmsLogs, getOperator, getUrgeRecord, addUrgeRecord, partialRepayment, getDetailTabControl };
