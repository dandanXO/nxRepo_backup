/*
* api
* */
import { axios } from 'utils';
const api = {
    scheduleJobList: '/hs/admin/scheduleJob/list',
    addScheduleJobList: '/hs/admin/scheduleJob/add',
    delScheduleJobList: '/hs/admin/scheduleJob/del',
    updateScheduleJobList: '/hs/admin/scheduleJob/update',
    executeScheduleJob: '/hs/admin/scheduleJob/run'
};
const scheduleJobList = (params) => {
    return axios.post(api.scheduleJobList, params);
}
const addScheduleJobList = (params) => {
    return axios.post(api.addScheduleJobList, params);
}
const delScheduleJobList = (params) => {
    return axios.post(api.delScheduleJobList, params);
}
const updateScheduleJobList = (params) => {
    return axios.post(api.updateScheduleJobList, params);
}

const executeScheduleJobList = (params) => {
    return axios.post(api.executeScheduleJob, params);
}

export { scheduleJobList, addScheduleJobList, delScheduleJobList, updateScheduleJobList, executeScheduleJobList};
