import { axios } from 'utils';
const api = {
    listData: '/hs/admin/risk/control-repayment',
};

const getListData = (params) => {
    return axios.get(api.listData, { params: params });
}

export { getListData };