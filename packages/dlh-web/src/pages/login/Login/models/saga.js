import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  lgGetCode,
  lgPostLogin,
  LG_POST_LOGIN,
  LG_GET_CODE,
  lgCancelTimer,
  lgFirstLogin,
  lgChangeLoading
} from './actions';
import { postLogin, postLoginVerifyCodeData } from '../api';
import { axios } from 'utils';
import Cookies from 'js-cookie';
import {SentryModule} from "../../../../Application";

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
    yield put(lgChangeLoading(true))

    const res = yield call(postLogin, action.params);
    if (Number(res.code) === 200) {
        Cookies.set('loginInfo', res);

        SentryModule.userLogin();

        yield put(lgFirstLogin(true))


        axios.defaults.headers["Authorization"] = res.data.token;
    } else {
      yield put(lgChangeLoading(false))
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
