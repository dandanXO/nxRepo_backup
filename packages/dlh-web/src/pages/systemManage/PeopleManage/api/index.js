/*
* api
* */
import { axios } from 'utils';
const api = {
    peopleList: '/hs/admin/user/list',
    addPeopleList: '/hs/admin/user/add',
    delPeopleList: '/hs/admin/user/del',
    updatePeopleList: '/hs/admin/user/update',
    roleList: '/hs/admin/role/assignList',
    departmentList: '/hs/admin/department/list',
    collectTeamsList: '/hs/admin/user/collect-teams',
    collectGroup: '/hs/admin/user/collect-groups'
};
const peopleList = (params) => {
    return axios.post(api.peopleList, params);
}
const addPeopleList = (params) => {
    return axios.post(api.addPeopleList, params);
}
const delPeopleList = (params) => {
    return axios.post(api.delPeopleList, params);
}
const updatePeopleList = (params) => {
    return axios.post(api.updatePeopleList, params);
}
const roleList = (params) => {
    return axios.post(api.roleList, params);
}
const departmentList = (params) => {
    return axios.post(api.departmentList, params);
}

const getCollectTeamsList = (params) => {
    return axios.get(api.collectTeamsList, params);
}

const getCollectGroup = (params) => {
    return axios.get(api.collectGroup, params ? { params: { collectTeamId: params } } : {});
}

export { peopleList, addPeopleList, delPeopleList, updatePeopleList, roleList, departmentList, getCollectTeamsList, getCollectGroup };
