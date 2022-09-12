/*
* api
* */
import { axios } from 'utils';
const api = {
    feedBackData: '/hs/admin/feedback/getFeedBackList',
    typeData: '/hs/api/v1/getFeedBackTitle'
};
const feedBackData = (params) => {
    return axios.post(api.feedBackData, params);
}
const typeData = (params) => {
    return axios.get(api.typeData, { params });
}
export { feedBackData, typeData };