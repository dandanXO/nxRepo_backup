/*
* api
* */
import {axios} from 'utils';

const api = {
    iCloudList: '/hs/admin/icloud/getClosedIcloudList',
    newPassword: '/hs/admin/icloud/getNewPawd',
    savePassword: '/hs/admin/icloud/submitClosedNewPawd'
};
const getICloudList = (params) => {
    return axios.post(api.iCloudList, params);
}
const getNewPassword = (params) => {
    return axios.post(api.newPassword, params);
}
const savePasswrod = (params) => {
    return axios.post(api.savePassword, params);
}

export { getICloudList, getNewPassword, savePasswrod };