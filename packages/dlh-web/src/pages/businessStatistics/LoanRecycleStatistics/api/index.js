import { axios } from 'utils';
const api = {
    listData: '/hs/admin/statistics/s1',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

export { getListData };