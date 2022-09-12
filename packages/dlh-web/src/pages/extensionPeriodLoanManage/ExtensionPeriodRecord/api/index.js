import { axios } from 'utils';
const api = {
    listData: '/hs/admin/order/getExtendOrderRecordList',
    listDetail: '/hs/admin/order/getExtendOrderRecordHistory',
};

const getListData = (params) => {
    return axios.post(api.listData, params);
}

const listDetail = (params) => {
    return axios.post(api.listDetail, params);
}

export { getListData,listDetail };