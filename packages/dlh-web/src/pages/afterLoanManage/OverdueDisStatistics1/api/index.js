import { axios } from 'utils';
const api = {
    listData: '/hs/admin/newStatistics/overdueCollectionStatistics1',
};

const getListData = (params) => {
    return axios.get(api.listData, { params: params });
}

export { getListData };