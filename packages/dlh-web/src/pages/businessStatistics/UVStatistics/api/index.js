import { axios } from 'utils';
const api = {
    listData: '/hs/admin/statistics/channel-visitor-page',
};

const getListData = (params) => {
    return axios({
        url: api.listData,
        method: 'get',
        params: params
    });
};

export { getListData };