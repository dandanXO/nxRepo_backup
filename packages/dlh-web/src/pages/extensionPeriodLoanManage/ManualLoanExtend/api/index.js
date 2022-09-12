import { axios } from 'utils';
const api = {
    listData: '/hs/admin/order/getManualLoanExtendList',
    addRecord: '/hs/admin/order/doManualLoanExtend'
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}
const addRecord = (params) => {
    return axios.post(api.addRecord, params);
}

export { getListData, addRecord };