import { axios } from 'utils';
const api = {
    configList: '/hs/admin/systemConf/riskSwitchList',
    updateConfig: '/hs/admin/systemConf/updateConfig'
};
const configList = (params) => {
    return axios.post(api.configList, params);
}
const updateConfig = (params) => {
    return axios.post(api.updateConfig, params);
}

export { configList, updateConfig };
