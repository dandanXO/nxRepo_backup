import { axios } from 'utils';
const api = {
    listData: '/hs/admin/loan/getRepaymentList',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

export { getListData };