/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/recoveryGoods/getRefundOrderList'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
};

export { getOrderListData };