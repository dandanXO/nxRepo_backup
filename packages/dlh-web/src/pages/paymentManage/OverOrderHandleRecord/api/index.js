import { axios } from 'utils';
const api = {
    listData: '/hs/admin/orderEdit/getResetOrderRecordList',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

export { getListData };