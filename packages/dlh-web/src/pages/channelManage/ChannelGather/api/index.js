import { axios } from 'utils';
const api = {
    channelGatherData: '/news'
};
const getChannelGatherData = (params) => {
    return axios.get(api.channelGatherData, { params });
}

export { getChannelGatherData };