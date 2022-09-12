/*
* api
* */
import { axios } from 'utils';

const api = {
    manageResource: '/hs/admin/ad-manage/management',
    adRecordResource: '/hs/admin/ad-manage/list',
    addDataResource: '/hs/admin/ad-manage/add',
    modifyDataResource: '/hs/admin/ad-manage/modify',
    deleteDataResource: '/hs/admin/ad-manage/delete',
    displaySwitch: '/hs/admin/ad-manage/display-switch',
    enabledSwitch: '/hs/admin/ad-manage/enabled'
};

const getViewData = (params) => {
    return axios.get(api.manageResource, params);
}
const getAdRecord = (params) => {
    return axios.get(api.adRecordResource, { params: params });
}
const addData = (params) => {
    return axios.post(api.addDataResource, params);
}
const deleteData = (params) => {
    return axios.delete(api.deleteDataResource, { params: params });
}
const modifyData = (params) => {
    return axios.put(api.modifyDataResource, params);
}
const displaySwitch = (params) => {
    return axios.post(api.displaySwitch, params);
}
const enabledSwitch = (params) => {
    return axios.post(api.enabledSwitch, params);
}
export { getViewData, getAdRecord, addData, deleteData, modifyData, displaySwitch, enabledSwitch };