import { axios } from 'utils';
const api = {
    riskControlConfigList: '/hs/admin/systemConf/configList',
    riskControlUpdateConfig: '/hs/admin/systemConf/updateConfig'
};
const riskControlConfigList = (params) => {
    return axios.post(api.riskControlConfigList, params);
}
const riskControlUpdateConfig = (params) => {
    return axios.post(api.riskControlUpdateConfig, params);
}

export { riskControlConfigList, riskControlUpdateConfig };
