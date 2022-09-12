/*
* api
* */
import { axios } from 'utils';
const api = {
    siteBlackList: '/hs/admin/siteBlack/list',
    addSiteBlackList: '/hs/admin/siteBlack/add',
    delSiteBlackList: '/hs/admin/siteBlack/del',
    updateSiteBlackList: '/hs/admin/siteBlack/update'
};
const siteBlackList = (params) => {
    return axios.post(api.siteBlackList, params);
}
const addSiteBlackList = (params) => {
    return axios.post(api.addSiteBlackList, params);
}
const delSiteBlackList = (params) => {
    return axios.post(api.delSiteBlackList, params);
}
const updateSiteBlackList = (params) => {
    return axios.post(api.updateSiteBlackList, params);
}

export { siteBlackList, addSiteBlackList, delSiteBlackList, updateSiteBlackList};
