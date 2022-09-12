import { axios } from 'utils';
const api = {
    listData: '/hs/admin/order/getPayFailedOrder',
    listDetail: '/hs/admin/order/getOrderLoanInfo',
    listPay: '/hs/admin/order/reLoanPay',
    listBatchPay: '/hs/admin/order/loan/repay',
    refuseLoan: '/hs/admin/order/loan/refuse',
};

const listData = (params) => {
    return axios.post(api.listData, params);
}
const listDetail = (params) => {
    return axios.post(api.listDetail, params);
}
const listPay = (params) => {
    return axios.post(api.listPay, params);
}
const listBatchPay = (params) => {
    return axios.post(api.listBatchPay, params);
}
const refuseLoan = (params) => {
    return axios.post(api.refuseLoan, params);
}
export { listData, listDetail, listPay, listBatchPay, refuseLoan };