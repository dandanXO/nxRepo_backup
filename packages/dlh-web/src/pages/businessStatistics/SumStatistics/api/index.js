import { axios } from 'utils';
const api = {
    tableList: '/hs/admin/statistics/summaryStatistic',
};

const tableList = (params) => {
    return axios.post(api.tableList, params);
}

export { tableList };