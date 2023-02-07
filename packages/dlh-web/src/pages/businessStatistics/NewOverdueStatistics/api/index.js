import { axios } from 'utils';
const api = {
    listData: '/hs/admin/newStatistics/overdueRepayStatistics',
};

const getListData = (params) => {
    return axios.get(api.listData, {params:params});
}

export { getListData };