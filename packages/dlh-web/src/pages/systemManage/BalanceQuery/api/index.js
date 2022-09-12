import { axios } from 'utils';
const api = {
    balanceQuery: '/hs/admin/sms/balance'
};
const getBalanceQuery = (params) => {
    return axios.get(api.balanceQuery, { params:{...params} });
}

export { getBalanceQuery };