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

function* postLoginData (action) {

    const res = yield call(postLogin, action.params);
    if (Number(res.code) === 200) {
        Cookies.set('loginInfo', res);
        res.data.googleAuthFlag && !res.data.passGoogleAuth ? history.push('/googleauth') : history.push('/index');
        axios.defaults.headers["Authorization"] = res.data.token;
    }
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
