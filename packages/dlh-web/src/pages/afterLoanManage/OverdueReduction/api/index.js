import { axios } from 'utils';
const api = {
    listData: '/hs/admin/order/can-reduction',
    addRecord: '/hs/admin/order/overdue-reduction'
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}
const addRecord = (params) => {
    return axios.post(api.addRecord, params);
}

export { getListData, addRecord };