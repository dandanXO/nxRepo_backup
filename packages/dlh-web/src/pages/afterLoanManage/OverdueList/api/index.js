/*
* api
* */
import { axios } from 'utils';
const api = {
    orderListData: '/hs/admin/collect-overdue/list',
    // getUrgePerson: '/hs/admin/user/cslist',
    // distributeOrder: '/hs/admin/orderOverdue/distribution'
    // getUrgePerson: '/hs/admin/orderOverdue/getDisPerOrGroup',

    // /hs/admin/collect-overdue/stage
    getOverdueCollectorStage: '/hs/admin/collect-overdue/stage',

    // 获取催收阶段的催收员 (下拉選單)
    getOverdueCollector: '/hs/admin/collect-overdue/collector',
    distributeOrder: '/hs/admin/orderOverdue/distribution',

    // 獲取催收分配紀錄
    orderOverdueGetCollectStreamList: '/hs/admin/orderOverdue/collect-stream/list',
    productList:'/hs/admin/commons/product-names',

    // 获取逾期催收阶段 (下拉選單)
    overdueStageList:'/hs/admin/collect-overdue/stages-options',
    
};
const getOrderListData = (params) => {
    return axios.get(api.orderListData, {params});
}
const getOverdueCollectorStageData = (params) => {
    return axios.get(api.getOverdueCollectorStage);
}
const distributeOrder = (params) => {
    return axios.post(api.distributeOrder, params);
}

const getOverdueCollectorData = (params) => {
    return axios.get(api.getOverdueCollector);
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

const getProductList = (params) => {
    return axios.get(api.productList);
}

const getOverdueStageList = (params) => {
    return axios.get(api.overdueStageList);
}



export { getOrderListData, getOverdueCollectorStageData, getOverdueCollectorData, distributeOrder, collectorGetDetail, getProductList ,getOverdueStageList };
