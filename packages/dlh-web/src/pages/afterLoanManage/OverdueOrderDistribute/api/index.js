/*
* api
* */
import { axios } from 'utils';
const api = {
    orderListData: '/hs/admin/orderOverdue/unDislist',
    getUrgePerson: '/hs/admin/orderOverdue/getDisPerOrGroup',
    distributeOrder: '/hs/admin/orderOverdue/distribution',
    getOverdueCollector: '/hs/admin/collect-today/stage',
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
const getOverdueCollector = () => {
  return axios.get(api.getOverdueCollector);
}
export { getOrderListData, getUrgePersonData, distributeOrder, getOverdueCollector };
