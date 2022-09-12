/*
* api
* */
import { axios } from 'utils';
const api = {
    uploadToken: '/hs/admin/loanPlatform/getUploadImgToken',
    addItem: '/hs/admin/loanPlatform/add',
    tableData: '/hs/admin/loanPlatform/newlist',
    sortData: '/hs/admin/loanPlatform/sort',
    deleteData: '/hs/admin/loanPlatform/del',
    modifyData: '/hs/admin/loanPlatform/update'
};
const getUploadToken = (params) => {
    return axios.post(api.uploadToken, params);
};
const addItem = (params) => {
    return axios.post(api.addItem, params);
}
const getTableData = (params) => {
    return axios.post(api.tableData, params);
}
const sortData = (params) => {
    return axios.post(api.sortData, params);
};
const deleteData = (params) => {
    return axios.post(api.deleteData, params);
}
const modifyData = (params) => {
    return axios.post(api.modifyData, params);
}
export { getUploadToken, addItem, getTableData, sortData, deleteData, modifyData };