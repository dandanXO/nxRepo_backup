/*
* api
* */
import { axios } from 'utils';
const api = {
    riskFeeListManageData: '/hs/admin/riskFee/getList'
};
const getRiskFeeListManageData = (params) => {
    return axios.post(api.riskFeeListManageData, params );
}

export { getRiskFeeListManageData };