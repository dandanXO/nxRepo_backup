import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {put, take, takeLatest, call} from "redux-saga/effects";
import {API, APIV3, LoginResponse} from "../../../../api/rtk";
import {Md5} from 'ts-md5';
import {AppRunningModeEnum, appSlice} from "../../../reduxStore/appSlice";
import { push } from 'connected-react-router'
import {catchSagaError} from "../../../utils/catchSagaError";

export const LoginPageSataActions = {
  user: {
    getOTP: createAction<UserGetOTPActionPayload>("LoginPageSataActions-getOTP"),
    login: createAction<UserLoginActionPayload>("LoginPageSataActions-user-login"),
  },
  system: {
    init: createAction("LoginPageSataActions-system-init"),
  }
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
    yield put(APIV3.endpoints.login.initiate({
      phoneNo: action.payload.phone,
      msgCode: action.payload.otp,
    }) as any)

    const data: {meta: any, payload: LoginResponse, type: string} = yield take(APIV3.endpoints.login.matchFulfilled);
    const token = data.payload.token;
    if(token) {
      // console.log("data.payload.token", data.payload.token)
      yield put(appSlice.actions.updateMode(AppRunningModeEnum.WEB))
      yield put(appSlice.actions.updateToken(token))
      yield put(push('/'));
    }
  } catch (error) {
    yield catchSagaError(error)
  }
}

export function *loginPageSaga() {
  yield takeLatest(LoginPageSataActions.user.getOTP.type, userGetOTPSaga);
  yield takeLatest(LoginPageSataActions.user.login.type, userLoginSaga);
}

