/*
* api
* */
import { axios } from 'utils';
const api = {
    riskFeeDepositManageData: '/hs/admin/riskFee/getList',
    riskFeeDeposit: '/hs/admin/riskFee/deposit',
};
const getRiskFeeDepositManageData = (params) => {
    return axios.post(api.riskFeeDepositManageData, params );
}

const addRiskFeeDeposit = (params) => {
    return axios.post(api.riskFeeDeposit, params);
}

export { getRiskFeeDepositManageData , addRiskFeeDeposit };

