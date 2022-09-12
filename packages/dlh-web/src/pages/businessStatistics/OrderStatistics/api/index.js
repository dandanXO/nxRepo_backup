import { axios } from 'utils';
const api = {
    listData: '/hs/admin/newStatistics/orderStatistic',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

export { getListData };