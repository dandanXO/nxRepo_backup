/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */

import { axios } from 'utils';
const api = {
    tableList: '/hs/admin/statistics/atosStatistic',
};

const tableList = (params) => {
    return axios.post(api.tableList, params);
}

export { tableList };