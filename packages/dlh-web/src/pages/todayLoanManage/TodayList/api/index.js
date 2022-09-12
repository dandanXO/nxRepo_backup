/*
* api
* */
import { axios } from 'utils';
const api = {
    orderListData: '/hs/admin/orderToday/list',
    // getUrgePerson: '/hs/admin/user/cslist',
    // distributeOrder: '/hs/admin/orderOverdue/distribution'
    getUrgePerson: '/hs/admin/orderToday/getDisPerOrGroup',
    distributeOrder: '/hs/admin/orderToday/todayDistribution'
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