/*
* api
* */
import { axios } from 'utils';
const api = {
    // orderListData: '/hs/admin/orderOverdue/list',
    orderListData: '/hs/admin/orderOverdue/dclist',
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
}

export { getOrderListData };