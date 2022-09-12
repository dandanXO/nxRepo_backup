import { axios } from 'utils';
const api = {
    listData: '/hs/admin/orderEdit/getOverOrderList',
    addRecord: '/hs/admin/orderEdit/updateOverOrder'
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}
const addRecord = (params) => {
    return axios.post(api.addRecord, params);
}

export { getListData, addRecord };