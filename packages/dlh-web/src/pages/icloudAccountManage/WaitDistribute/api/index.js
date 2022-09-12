/*
* api
* */
import {axios} from 'utils';

const api = {
    uploadIcloud: '/hs/admin/icloud/uploadIcloud',
    iCloudList: '/hs/admin/icloud/getIcloudList'
};
const postUploadIcloud = (params) => {
    return axios.post(api.uploadIcloud, params);
}
const getICloudList = (params) => {
    return axios.post(api.iCloudList, params);
}


export { postUploadIcloud, getICloudList };