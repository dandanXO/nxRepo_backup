/*
* api
* */
import { axios } from 'utils';
const api = {
    blackListManageData: '/hs/admin/black/getBlackList',
    addblackListManageData:'/hs/admin/black/add'
};
const getBlackListManageData = (params) => {
    return axios.post(api.blackListManageData, params );
}

const addBlackListManageData = (params) => {
    return axios.post(api.addblackListManageData, params );
}

export { getBlackListManageData ,addBlackListManageData};