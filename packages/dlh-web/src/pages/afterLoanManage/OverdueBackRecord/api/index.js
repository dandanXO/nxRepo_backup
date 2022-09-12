/*
* api
* */
import { axios } from 'utils';
const api = {
    overduePayOrderList: 'hs/admin/orderOverdue/overduePayOrderList'
};
const getOverdueList = (params) => {
    return axios.post(api.overduePayOrderList, params);
}

export { getOverdueList };