import { axios } from 'utils';
const api = {
    listData: '/hs/admin/loan/getLoanList',
    listDetail: '/hs/admin/order/getOrderLoanInfo',
    payMoney: '/hs/admin/loan/confirmPay'
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}
const payMoney = (params) => {
    return axios.post(api.payMoney, params);
}
const listDetail = (params) => {
    return axios.post(api.listDetail, params);
}

export { getListData, payMoney, listDetail };