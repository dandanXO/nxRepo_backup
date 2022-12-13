import { axios } from 'utils';
const api = {
    loginVerifyCodeData: '/hs/admin/auth/sendVerifyCode',
    login: '/hs/admin/auth/login',

};
// 取得登入驗證碼
const postLoginVerifyCodeData = (params) => {
    return axios.post(api.loginVerifyCodeData, params);
}

// 登入
const postLogin = (params) => {
    return axios.post(api.login, params)
}

export { postLoginVerifyCodeData, postLogin };
