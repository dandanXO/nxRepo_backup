/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */

import { axios } from 'utils';
const api = {
    tableList: '/hs/admin/orderToday/getDayOrderSummaryReport',
    collectorList: 'hs/admin/orderToday/getDayOrderCollectorReport',
};

const tableList = (params) => {
    return axios.get(api.tableList, { params });
}

const collectorList = (params) => {
    return axios.get(api.collectorList, { params });
}

export { tableList, collectorList };