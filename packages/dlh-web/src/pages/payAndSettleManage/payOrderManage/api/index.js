import { axios } from 'utils';
const api = {
    listUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayOrder/list',
    addUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayOrder/save',
    updateUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayOrder/save',
    deleteUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayOrder/delete'
};
const getModelList = (params) => {
    return axios.post(api.listUrl, params);
}
const addModel = (params) => {
    return axios.post(api.addUrl, params);
}
const updateModel = (params) => {
    return axios.post(api.updateUrl, params);
}
const deleteModelByIds = (params) => {
    return axios.post(api.deleteUrl, params);
}

export { getModelList, addModel, updateModel, deleteModelByIds };