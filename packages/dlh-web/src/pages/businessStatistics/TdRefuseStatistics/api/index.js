import { axios } from 'utils';
const api = {
    listData: '/hs/admin/statistics/refusedReason',
};

const getListData = (params) => {
    return axios.get(api.listData, { params: params });
}

export { getListData };