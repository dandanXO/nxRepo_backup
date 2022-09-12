/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/recoveryGoods/getRecoveryOrderList',
    followOrder: '/hs/admin/recoveryGoods/waitRecieveOrder'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
};
const followOrder = (params) => {
    return axios.post(api.followOrder, params);
}

export { getOrderListData, followOrder };