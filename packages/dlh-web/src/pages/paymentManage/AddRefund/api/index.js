import { axios } from 'utils';
const api = {
    listData: '/hs/admin/order/getRemainToPayOrderList',
    addRecord: '/hs/admin/order/addPayRecords'
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}
const addRecord = (params) => {
    return axios.post(api.addRecord, params);
}

export { getListData, addRecord };