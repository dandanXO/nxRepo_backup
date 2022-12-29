import { axios } from 'utils';
const api = {
    listData: '/hs/admin/statistics/order/refuse-reason',
};

const getListData = (params) => {
    return axios.get(api.listData, { params: params });
}

export { getListData };