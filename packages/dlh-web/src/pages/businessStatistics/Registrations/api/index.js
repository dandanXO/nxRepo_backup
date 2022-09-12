import { axios } from 'utils';
const api = {
    tableList:'/hs/admin/statistics/day-register-page',
    sourceData: '/hs/admin/channel/getChannelList',
};

const tableList = (params) => {
    return axios.get(api.tableList, {params:params});
}

const sourceList = (params) => {
    return axios.post(api.sourceData, params)
}

export { tableList, sourceList };