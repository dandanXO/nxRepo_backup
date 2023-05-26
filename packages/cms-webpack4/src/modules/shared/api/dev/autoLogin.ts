import axios from 'axios';
import Cookies from 'js-cookie';

// const api = {
//     loginVerifyCodeData: '/hs/admin/auth/sendVerifyCode',
//     login: '/hs/admin/auth/login',
// };

export async function login() {
    try {
        const { data: loginData } = await axios.post('/hs/admin/auth/login', {
            phoneNo: '19888888888',
            code: '123456',
        });

        if (Number(loginData.code) === 200) {
            console.log('[login] success');
            // console.log("[login] res: ", loginData);
            // Cookies.set('isLogin', 'ok');
            // history.push('/index');
        }
    } catch (e) {
        console.log('[error][login] e', e);
    }
}

export async function getInfo() {
    try {
        const { data: getInfoData } = await axios({
            url: '/hs/admin/auth/getInfo',
            method: 'post',
        });
        if (getInfoData && getInfoData.code === 200) {
            console.log('[getInfo] success');
            // console.log("[getInfo] res: ", getInfoData);
            const { data } = getInfoData;
            // console.log("data", data);
            window.sessionStorage.setItem('adminUser', JSON.stringify(data));
            // console.log("window.sessionStorage.getItem:", window.sessionStorage.getItem("adminUser"));
            if (data.googleAuthFlag == 0) {
                console.log('[getInfo] isGoogleAuth: ok');
                Cookies.set('isGoogleAuth', 'ok');
            } else {
                if (!Cookies.get('isGoogleAuth')) {
                    //   history.push('/googleauth');
                }
            }
        }
    } catch (e) {
        console.log('[error][getInfo] e', e);
    }
}

export async function getProductList() {
    try {
        const getProductManageListRes = await axios({
            url: '/hs/admin/product-manage/list',
            method: 'get',
        });
        console.log('[getProductManageListRes] res');
        console.log(getProductManageListRes);
    } catch (e) {
        console.log('[error][getProductList] e', e);
    }
}
