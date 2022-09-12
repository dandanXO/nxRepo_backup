import { axios } from 'utils';
const api = {
    listUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/list',
    addUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/save',
    updateUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/save',
    deleteUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/delete',
    enabledUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/enabled',
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