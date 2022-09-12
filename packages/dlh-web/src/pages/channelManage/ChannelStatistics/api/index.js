import { axios } from 'utils';
const api = {
    channelStatisticsData: '/hs/admin/channel/statistics',
    sourceData: '/hs/admin/channel/getChannelList'
};
const getChannelStatisticsData = (params) => {
    return axios.get(api.channelStatisticsData, { params });
}
const getSourceData = (params) => {
    return axios.post(api.sourceData, params);
}

export { getChannelStatisticsData, getSourceData };