import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {put, take, takeLatest, call, all} from "redux-saga/effects";
import {API, APIV3, LoginResponse} from "../../../../api/rtk";
import {Md5} from 'ts-md5';
import {AppRunningModeEnum, appSlice} from "../../../reduxStore/appSlice";
import { push } from '@lagunovsky/redux-react-router'

import {catchSagaError} from "../../../utils/catchSagaError";
import {errorFallback} from "../../../utils/errorFallback";

export const LoginPageSataActions = {
  user: {
    getOTP: createAction<UserGetOTPActionPayload>("LoginPageSataActions-getOTP"),
    login: createAction<UserLoginActionPayload>("LoginPageSataActions-user-login"),
  },
  system: {
    init: createAction("LoginPageSataActions-system-init"),
  }
}

export function *loginPageSaga() {
  // try {
  // NOTE: takeLatest 的 saga 壞過，就算裡面用 catch 之後還是無法重新啟用了. example: data.payload.token is undefined, need to use errorFallback,
  // NOTE: even use try-catch in loginPageSaga, even use try-catch in userGetOTPSaga or userLoginSaga
  // yield takeLatest(LoginPageSataActions.user.getOTP.type, userGetOTPSaga);
  // yield takeLatest(LoginPageSataActions.user.login.type, userLoginSaga);
  yield takeLatest(LoginPageSataActions.user.getOTP.type, errorFallback, userGetOTPSaga)
  yield takeLatest(LoginPageSataActions.user.login.type, errorFallback, userLoginSaga)
  // } catch (error) {
  //   yield catchSagaError(error)
  // }
}

export type UserGetOTPActionPayload = {
   phone: string;
}

export type UserLoginActionPayload = {
  phone: string;
  otp: string;
}

export function *userGetOTPSaga(action: PayloadAction<UserLoginActionPayload>) {
  try {
    const BACKED_KEY = "e330e6942a706cea2f89901e2c758443";

    const deviceCode = "WebApp".toLowerCase()
    const phoneNo = action.payload.phone
    const tm = new Date().getTime();
    const firstSignSection = Md5.hashStr(`${deviceCode}${phoneNo}${tm}`)
    const sign = Md5.hashStr(`${firstSignSection}${BACKED_KEY}`);

    yield put(API.endpoints.getOTPCode.initiate({
      appName: "",
      deviceCode,
      phoneNo,
      sign,
      tm,
    }) as any);
  } catch (error) {
    yield catchSagaError(error)
  }

}

export function *userLoginSaga(action: PayloadAction<UserLoginActionPayload>) {
  try {
    // console.log("userLoginSaga")
    yield put(APIV3.endpoints.login.initiate({
      phoneNo: action.payload.phone,
      msgCode: action.payload.otp,
    }) as any)

    const data: {meta: any, payload: LoginResponse, type: string} = yield take(APIV3.endpoints.login.matchFulfilled);
    if(data.payload.token) {
      const token = data.payload.token;
      // console.log("data.payload.token", data.payload.token)
      yield put(appSlice.actions.updateMode(AppRunningModeEnum.WEB))
      yield put(appSlice.actions.updateToken(token))
      yield put(push('/'));
    }
  } catch (error) {
    // console.log("userLoginSaga.error", error);
    yield catchSagaError(error)
  }
}



