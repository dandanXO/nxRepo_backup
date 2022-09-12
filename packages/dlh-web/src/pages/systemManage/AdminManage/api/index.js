/*
* api
* */
import { axios } from 'utils';
const api = {
    adminManageData: '/news'
};
const getAdminManageData = (params) => {
    return axios.get(api.adminManageData, { params });
}

export { getAdminManageData };