import { axios } from 'utils';
const api = {
    channelListData: '/hs/admin/channel/getChannelList',
    addChannelList: '/hs/admin/channel/add',
    updateChannelList: '/hs/admin/channel/update',
    roleList: '/hs/admin/channel/getModelList'
    //roleList: '/hs/admin/role/list'
};
const getChannelListData = (params) => {
    return axios.post(api.channelListData, params);
}
const addChannelList = (params) => {
    return axios.post(api.addChannelList, params);
}
const updateChannelList = (params) => {
    return axios.post(api.updateChannelList, params);
}
const roleList = (params) => {
    return axios.post(api.roleList, params);
}

export { getChannelListData, addChannelList, updateChannelList, roleList };