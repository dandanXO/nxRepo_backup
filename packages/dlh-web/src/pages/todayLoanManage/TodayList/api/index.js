/*
* api
* */
import { axios } from 'utils';
const api = {
    orderListData: '/hs/admin/collect-today/list',
    // getUrgePerson: '/hs/admin/user/cslist',
    // distributeOrder: '/hs/admin/orderOverdue/distribution'
    getUrgePerson: '/hs/admin/orderToday/getDisPerOrGroup',
    distributeOrder: '/hs/admin/orderToday/todayDistribution',
    // 獲取催收分配紀錄
    orderTodayGetCollectStreamList: '/hs/admin/orderToday/collect-stream/list',
    getTodayCollector: '/hs/admin/collect-today/stage',
    getCollectorList: '/hs/admin/collect-today/collector',
    productList:'/hs/admin/commons/product-names'
};
const getOrderListData = (params) => {
    return axios.get(api.orderListData, {params});
}
const getUrgePersonData = (params) => {
    return axios.post(api.getUrgePerson, params);
}
const distributeOrder = (params) => {
    return axios.post(api.distributeOrder, params);
}
const getTodayCollector = () => {
  return axios.get(api.getTodayCollector);
}
const getCollectorList = () => {
  return axios.get(api.getCollectorList);
}

/**
 *
 * @param params
 * @returns
 * addTime  string($date-time)
 * 添加时间
 *
 * collector  string
 * 催收人
 *
 * distributor  string
 * 指派人
 */
const collectorGetDetail = (params) => {
  return axios.get(api.orderTodayGetCollectStreamList, { params: { todayId: params.id } });
}

const getProductList = (params) => {
    return axios.get(api.productList);
}


export { getOrderListData, getUrgePersonData, distributeOrder, collectorGetDetail, getTodayCollector, getCollectorList, getProductList };
