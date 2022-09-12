import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { lgGetCode,lgPostLogin, LG_POST_LOGIN, LG_GET_CODE, lgCancelTimer } from './actions';
import { postLogin, postLoginVerifyCodeData } from '../api';
import { axios } from 'utils';
import { history } from 'utils';
import Cookies from 'js-cookie';


function* getCodeData(action) {
    const res = yield call(postLoginVerifyCodeData, action.params);
    const { code } = res;
    if(Number(code) !== 200) {
        yield put(lgCancelTimer(true));
    }
}

function* watchGetCodeData() {
    yield takeEvery(LG_GET_CODE, getCodeData);
}
function* postLoginData(action) {
    console.log(1);
    const res = yield call(postLogin,action.params);
    console.log(res);
    if(Number(res.code) === 200) {
        Cookies.set('isLogin', 'ok');
        history.push('/index');
    }
    axios({
        url: '/hs/admin/auth/getInfo',
        method: 'post'
    }).then((res) => {
     
        if(res && res.code == '200') {
            let { data } = res;
          
            sessionStorage.setItem("adminUser", JSON.stringify(data));
            if(data.googleAuthFlag==0){
              Cookies.set('isGoogleAuth', 'ok');
            }else{
                if(!Cookies.get("isGoogleAuth")){
                    history.push('/googleauth');
                }
            }
        
        }
    });
}
function* watchPostLoginData() {
    yield takeEvery(LG_POST_LOGIN, postLoginData);
}
export default function* root() {
    yield all([
        fork(watchGetCodeData),
        fork(watchPostLoginData)
    ])
}
