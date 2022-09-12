import { axios } from 'utils';
const api = {
    configList: 'hs/admin/system-conf/group-by',
    updateConfig: '/hs/admin/system-conf/config'
};
const configList = () => {
    return axios.get(api.configList);
}

const updateConfig = (params) => {
    return axios.put(api.updateConfig, params);
}

export { configList, updateConfig };
