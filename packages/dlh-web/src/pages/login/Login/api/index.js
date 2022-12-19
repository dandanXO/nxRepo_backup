import { axios } from 'utils';

// NOTE: '/hs/admin/auth/login'
// Response
// {
//   "code":200,
//   "data":{
//       "passGoogleAuth":false,
//       "role":"MERCHANT_ADMIN",
//       "merchantId":5,
//       "appName":"",
//       "loginIp":"36.228.214.152",
//       "googleAuthFlag":true,
//       "operatorId":35,
//       "phoneNo":"12341234",
//       "token":"2815c854ebd445d8ac0eba809187cc6a"
//   }
// }

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
