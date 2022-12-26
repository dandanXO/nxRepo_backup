/*
* api
* */
import { axios } from 'utils';
const api = {
    orderListData: '/hs/admin/orderToday/list',
    // getUrgePerson: '/hs/admin/user/cslist',
    // distributeOrder: '/hs/admin/orderOverdue/distribution'
    getUrgePerson: '/hs/admin/orderToday/getDisPerOrGroup',
    distributeOrder: '/hs/admin/orderToday/todayDistribution',
    // 獲取催收分配紀錄
    orderTodayGetCollectStreamList: '/hs/admin/orderToday/collect-stream/list',
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

export { getOrderListData, getUrgePersonData, distributeOrder, collectorGetDetail };
