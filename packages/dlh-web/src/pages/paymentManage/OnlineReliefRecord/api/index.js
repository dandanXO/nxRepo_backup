import { axios } from 'utils';
const api = {
    listData: '/hs/admin/order/getOnlineReliefList',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

export { getListData };