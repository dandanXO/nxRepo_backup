import { axios } from 'utils';
const api = {
    channelUserListData: '/hs/admin/channel/getChannelUserList',
    addChannelUserList: '/hs/admin/channel/addChannelUser',
    updateChannelUserList: '/hs/admin/channel/updateChannelUser'
};
const getChannelUserListData = (params) => {
    return axios.post(api.channelUserListData, params);
}
const addChannelUserList = (params) => {
    return axios.post(api.addChannelUserList, params);
}
const updateChannelUserList = (params) => {
    return axios.post(api.updateChannelUserList, params);
}

export { getChannelUserListData, addChannelUserList, updateChannelUserList };