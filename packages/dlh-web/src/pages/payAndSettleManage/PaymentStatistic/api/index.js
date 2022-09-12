import { axios } from 'utils';
const api = {
    paymentStatisticList: '/hs/admin/payment/statistic',
};
const getPaymentStatisticList = (params) => {
    return axios.get(api.paymentStatisticList, { params: params });
}


export { getPaymentStatisticList };