/*
* api
* */
import { axios } from 'utils';
const api = {
    overduePayOrderList: 'hs/admin/orderOverdue/overduePayOrderList',
    paymentList: '/hs/admin/commons/payment-names'
};
const getOverdueList = (params) => {
    return axios.post(api.overduePayOrderList, params);
}

const getPaymentList = (params) => {
    return axios.get(api.paymentList, params);
}


export { getOverdueList, getPaymentList };