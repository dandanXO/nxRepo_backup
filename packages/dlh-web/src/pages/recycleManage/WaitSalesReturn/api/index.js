/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/recoveryGoods/getRecoveryOrderList',
    salesReturn: '/hs/admin/recoveryGoods/submitRefundOrder'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
};
const salesReturn = (params) => {
    return axios.post(api.salesReturn, params);
}

export { getOrderListData, salesReturn };