import { axios } from 'utils';
const api = {
    listUrl: '/hs/admin/pay-center/settle-merchant',
    addUrl: '/hs/admin/pay-center/settle-merchant',
    updateUrl: '/hs/admin/pay-center/settle-merchant',
    deleteUrl: '/hs/admin/pay-center/settle-merchant',
    enabledUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/SettleMch/enabled',
};
const getModelList = (params) => {
    return axios.get(api.listUrl, {params: params});
}
const addModel = (params) => {
    return axios.post(api.addUrl, params);
}
const updateModel = (params) => {
    return axios.put(api.updateUrl, params);
}
const deleteModelByIds = (params) => {
    return axios.delete(api.deleteUrl + `/${params.id}`);
}
const toggleEnabled = (params) => {
    return axios.post(api.enabledUrl, params);
}
export { getModelList, addModel, updateModel, deleteModelByIds, toggleEnabled };
