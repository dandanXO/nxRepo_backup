import {createAction} from "@reduxjs/toolkit";
import {takeLatest} from "redux-saga/effects";
import {errorFallback} from "../../../utils/errorFallback";
import {userGetOTPSaga} from "./userGetOTPSaga";
import {userLoginSaga} from "./userLoginSaga";

// NOTE: REFACTOR ME
export const LoginPageSagaActions = {
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

export function *watchLoginPageSaga() {
  console.log("[app][appSaga] 1.3")
  // try {
  // NOTE: takeLatest 的 saga 壞過，就算裡面用 catch 之後還是無法重新啟用了. example: data.payload.token is undefined, need to use errorFallback,
  // NOTE: even use try-catch in loginPageSaga, even use try-catch in userGetOTPSaga or userLoginSaga
  // yield takeLatest(LoginPageSataActions.user.getOTP.type, userGetOTPSaga);
  // yield takeLatest(LoginPageSataActions.user.login.type, userLoginSaga);
  yield takeLatest(LoginPageSagaActions.user.getOTP.type, errorFallback, userGetOTPSaga)
  yield takeLatest(LoginPageSagaActions.user.login.type, errorFallback, userLoginSaga)
  // } catch (error) {
  //   yield catchSagaError(error)
  // }
}




