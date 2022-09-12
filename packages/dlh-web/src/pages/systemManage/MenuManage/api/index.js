/*
* api
* */
import { axios } from 'utils';
const api = {
    treeList: '/hs/admin/menu/AllList',
    addTree: '/hs/admin/menu/add',
    delTree: '/hs/admin/menu/del',
    updateTree: '/hs/admin/menu/update'
};
const getTreeList = (params) => {
    return axios.post(api.treeList, params);
}
const postAddTree = (params) => {
    return axios.post(api.addTree, params);
}
const postDelTree = (params) => {
    return axios.post(api.delTree, params);
}
const postUpdateTree = (params) => {
    return axios.post(api.updateTree, params);
}

export { getTreeList, postAddTree, postDelTree, postUpdateTree };