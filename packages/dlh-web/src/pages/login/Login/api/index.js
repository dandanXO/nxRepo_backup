import { axios } from 'utils';
const api = {
    loginVerifyCodeData: '/hs/admin/auth/sendVerifyCode',
    login: '/hs/admin/auth/login',

};
const postLoginVerifyCodeData = (params) => {
    return axios.post(api.loginVerifyCodeData, params);
}
const postLogin = (params) => {
    return axios.post(api.login, params)
}

export { postLoginVerifyCodeData, postLogin };