import { axios } from 'utils';
const api = {
    listData: '/hs/admin/newStatistics/autoDeductionsStatistic',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

export { getListData };