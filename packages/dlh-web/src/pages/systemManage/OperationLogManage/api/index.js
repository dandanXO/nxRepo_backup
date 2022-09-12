/*
* api
* */
import { axios } from 'utils';
const api = {
    logList: '/hs/admin/operationLog/list',
    mappingList: '/hs/admin/operationLog/mappingList'
};
const logList = (params) => {
    return axios.post(api.logList, params);
}

const mappingList = (params) => {
    return axios.post(api.mappingList, params);
}

export { logList, mappingList };
