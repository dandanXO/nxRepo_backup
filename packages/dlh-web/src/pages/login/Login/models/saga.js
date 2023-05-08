import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  LG_POST_LOGIN,
  LG_GET_CODE,
  lgCancelTimer,
  lgChangeLoading, lgSetGoogleAuth, lgSetGoogleAuthUrl
} from './actions';
import {getGoogleAuthQRCodeUrl, postLogin, postLoginVerifyCodeData} from '../api';
import { axios, history } from 'utils';
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

        const { googleAuthFlag, passGoogleAuth } = res.data;
        if((googleAuthFlag && passGoogleAuth) || !googleAuthFlag) {
          // 無需Google驗證，直接導轉到Index
          yield put(lgChangeLoading(false))
          history.push("/index")
        } else {
          // 需要Google Auth
          // 取得google驗證碼QR Code URL，若googleAuthUrl為空表示已綁定過裝置。
          const googleAuthQRCodeUrlRes = yield call(getGoogleAuthQRCodeUrl)
          const { googleAuthUrl } = googleAuthQRCodeUrlRes;
          if(googleAuthUrl) {
            // 需要綁定裝置，跳轉至google auth 頁面
            yield put(lgSetGoogleAuthUrl(googleAuthUrl))
            history.push("/googleauth")
          } else {
            // 已綁定過裝置，驗證Google Auth Code
            yield put(lgSetGoogleAuth(true))
          }
        }

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
