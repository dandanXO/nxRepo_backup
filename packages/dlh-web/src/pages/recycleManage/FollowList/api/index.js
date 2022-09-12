/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/recoveryGoods/getRecoveryOrderList'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
};

export { getOrderListData };