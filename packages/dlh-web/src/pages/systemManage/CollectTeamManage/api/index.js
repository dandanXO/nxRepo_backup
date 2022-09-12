import { axios } from 'utils';
const api = {
    collectTeamsList: '/hs/admin/collect-team/all',
    collectTeam: '/hs/admin/collect-team',
    collectGroup: '/hs/admin/collect-group'
};
const getCollectTeamsList = (params) => {
    return axios.get(api.collectTeamsList, params);
}
const addCollectTeam = (params) => {
    return axios.post(api.collectTeam, params);
}
const updateCollectTeam = (params) => {
    return axios.put(api.collectTeam, params);
}
const deleteCollectTeam = (params) => {
    return axios.delete(api.collectTeam, params ? { params: params } : {});
}
const getCollectGroup = (params) => {
    return axios.get(api.collectGroup, params ? { params: { collectTeamId: params } } : {});
}
const addCollectGroup = (params) => {
    return axios.post(api.collectGroup, params);
}
const updateCollectGroup = (params) => {
    return axios.put(api.collectGroup, params);
}
const deleteCollectGroup = (params) => {
    return axios.request({url:api.collectGroup, data:params, method: 'delete'});
}

export { getCollectTeamsList, addCollectTeam, updateCollectTeam, deleteCollectTeam, getCollectGroup, addCollectGroup, updateCollectGroup, deleteCollectGroup };