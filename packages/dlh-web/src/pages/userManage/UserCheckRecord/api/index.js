/*
* api
* */
import {axios} from 'utils';

const api = {
    ListData: '/hs/admin/riskReview/getUserRiskReviewList',
    operatorList: '/hs/admin/riskReview/getOperatorList'
};
const getListData = (params) => {
    return axios.post(api.ListData, params);
};
const getOperator = (params) => {
    return axios.post(api.operatorList, params);
}

export { getListData, getOperator };