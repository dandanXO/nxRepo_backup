/*
* api
* */
import { axios } from 'utils';
const api = {
    waitRepaymentData: '/news'
};
const getWaitRepaymentData = (params) => {
    return axios.get(api.waitRepaymentData, { params });
}

export { getWaitRepaymentData };