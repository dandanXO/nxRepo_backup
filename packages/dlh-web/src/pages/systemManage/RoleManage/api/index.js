/*
* api
* */
import { axios } from 'utils';
const api = {
    roleList: '/hs/admin/role/list',
    addRoleList: '/hs/admin/role/add',
    delRoleList: '/hs/admin/role/del',
    updateRoleList: '/hs/admin/role/update',
    menuList: '/hs/admin/menu/AllListNoTree'
};
const roleList = (params) => {
    return axios.post(api.roleList, params);
}
const addRoleList = (params) => {
    return axios.post(api.addRoleList, params);
}
const delRoleList = (params) => {
    return axios.post(api.delRoleList, params);
}
const updateRoleList = (params) => {
    return axios.post(api.updateRoleList, params);
}
const menuList = (params) => {
    return axios.post(api.menuList, params);
}

export { roleList, addRoleList, delRoleList, updateRoleList, menuList };
