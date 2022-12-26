/*
* api
* */
import { axios } from 'utils';
const api = {
    orderListData: '/hs/admin/orderOverdue/list',
    // getUrgePerson: '/hs/admin/user/cslist',
    // distributeOrder: '/hs/admin/orderOverdue/distribution'
    getUrgePerson: '/hs/admin/orderOverdue/getDisPerOrGroup',
    distributeOrder: '/hs/admin/orderOverdue/distribution',
    // 獲取催收分配紀錄
    orderOverdueGetCollectStreamList: '/hs/admin/orderOverdue/collect-stream/list'

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
  return axios.get(api.orderOverdueGetCollectStreamList, { params: { overdueId: params.id } });
}

export { getOrderListData, getUrgePersonData, distributeOrder, collectorGetDetail };
