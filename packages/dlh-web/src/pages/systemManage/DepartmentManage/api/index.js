/*
* api
* */
import { axios } from 'utils';
const api = {
    departmentList: '/hs/admin/department/list',
    addDepartment: '/hs/admin/department/add',
    delDepartment: '/hs/admin/department/del',
    updateDepartment: '/hs/admin/department/update',
    personData: '/hs/admin/user/list'
};
const departmentList = (params) => {
    return axios.post(api.departmentList, params);
}
const addDepartment = (params) => {
    return axios.post(api.addDepartment, params);
}
const delDepartment = (params) => {
    return axios.post(api.delDepartment, params);
}
const updateDepartment = (params) => {
    return axios.post(api.updateDepartment, params);
}
const personData = (params) => {
    return axios.post(api.personData, params);
}

export { departmentList, addDepartment, delDepartment, updateDepartment, personData };