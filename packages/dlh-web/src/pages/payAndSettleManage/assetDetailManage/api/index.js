import { axios } from 'utils';
const api = {
    listUrl: '/hs/payCenter/jsonGateWay?tar=/api/v1/AssetDetail/list',
};
const getModelList = (params) => {
    return axios.post(api.listUrl, params);
}
export { getModelList};