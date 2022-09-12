/*
* api
* */
import { axios } from 'utils';
const api = {
    // orderListData: '/hs/admin/orderOverdue/list',
    orderListData: '/hs/admin/orderOverdue/unDislist',
    // getUrgePerson: '/hs/admin/user/cslist',
    // distributeOrder: '/hs/admin/orderOverdue/distribution'
    getUrgePerson: '/hs/admin/orderOverdue/getDisPerOrGroup',
    distributeOrder: '/hs/admin/orderOverdue/distribution'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
}
const getUrgePersonData = (params) => {
    return axios.post(api.getUrgePerson, params);
}
const distributeOrder = (params) => {
    return axios.post(api.distributeOrder, params);
}

export { getOrderListData, getUrgePersonData, distributeOrder };