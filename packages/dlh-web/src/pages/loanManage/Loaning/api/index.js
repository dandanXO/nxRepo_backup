/*
* api
* */
import { axios } from 'utils';
const api = {
    loaningData: '/news'
};
const getLoaningData = (params) => {
    return axios.get(api.loaningData, { params });
}

export { getLoaningData };