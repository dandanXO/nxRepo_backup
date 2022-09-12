/*
* api
* */
import {axios} from 'utils';

const api = {
    orderListData: '/hs/admin/recoveryGoods/getRecoveryOrderList',
    checkSuccess: '/hs/admin/recoveryGoods/inspectRecieveOrder'
};
const getOrderListData = (params) => {
    return axios.post(api.orderListData, params);
};

const checkExpress = (params) => {
    return axios.post(api.checkSuccess, params);
}


export { getOrderListData, checkExpress };