import { axios } from 'utils';
const api = {
    removeBill: '/hs/admin/TestFCStatusAction/manualCheckBill',
};

const postRemoveBill = (params) => {
    return axios.post(api.removeBill, params);
}

export { postRemoveBill };
