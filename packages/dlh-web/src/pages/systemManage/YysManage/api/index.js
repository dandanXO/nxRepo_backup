import { axios } from 'utils';
const api = {
    yysConfigList: '/hs/admin/systemConf/yysList',
    updateYysConfig: '/hs/admin/systemConf/updateYysConfig'
};
const yysConfigList = (params) => {
    return axios.post(api.yysConfigList, params);
}
const updateYysConfig = (params) => {
    return axios.post(api.updateYysConfig, params);
}

export { yysConfigList, updateYysConfig };
