/*
* api
* */
import { axios } from 'utils';
const api = {
    whiteListManageData: '/hs/admin/white/getWhiteList',
    addWhiteList: '/hs/admin/white/add',
    updateWhiteList: '/hs/admin/white/update'
};
const getWhiteListManageData = (params) => {
    return axios.post(api.whiteListManageData, params );
}

const addWhiteList = (params) => {
    return axios.post(api.addWhiteList, params);
}
const updateWhiteList = (params) => {
    return axios.post(api.updateWhiteList, params);
}

export { getWhiteListManageData,addWhiteList,updateWhiteList };