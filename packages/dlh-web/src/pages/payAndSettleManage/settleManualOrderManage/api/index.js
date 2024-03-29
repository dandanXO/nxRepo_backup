import { axios } from 'utils';
const api = {
    listUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleOrder/list',
    addUrl: '/hs/payCenterSettleManual/createManualSettle?tar=/api/v1/PayCenter/hsCreateSettle',
    updateUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleOrder/save',
    deleteUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleOrder/delete'
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