import { axios } from 'utils';
const api = {
    listUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayMch/list',
    addUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayMch/save',
    updateUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayMch/save',
    deleteUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayMch/delete',
    enabledUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/PayMch/enabled',
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
const toggleEnabled = (params) => {
    return axios.post(api.enabledUrl, params);
}
export { getModelList, addModel, updateModel, deleteModelByIds, toggleEnabled };