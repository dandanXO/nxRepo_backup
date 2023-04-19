import {PayloadAction, createAction, createSlice} from "@reduxjs/toolkit";
import {takeLatest} from "redux-saga/effects";
import {errorFallback} from "../../../utils/errorFallback";
import {userGetOTPSaga} from "./userGetOTPSaga";
import {userLoginSaga} from "./userLoginSaga";
import { userResendSaga } from "./userResendSaga";
export type UserGetOTPActionPayload = {
  phone: string;
}

export type UserLoginActionPayload = {
  phone: string;
  otp: string;
}

export type UserResendSecondsActionPayload={
    resendSeconds:number;
}
const initialState = {
    resendSeconds: 60,
}
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateResendSeconds: (state, action: PayloadAction<UserResendSecondsActionPayload['resendSeconds']>) => {
            state.resendSeconds = action.payload;
        },
    }
})
  
export const LoginPageSataActions = {
  user: {
    getOTP: createAction<UserGetOTPActionPayload>("LoginPageSataActions-getOTP"),
    login: createAction<UserLoginActionPayload>("LoginPageSataActions-user-login"),
  },
  system: {
    init: createAction("LoginPageSataActions-system-init"),
    resendSeconds:createAction<UserResendSecondsActionPayload>("LoginPageSataActions-resend-seconds"),
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
  yield takeLatest(LoginPageSataActions.system.resendSeconds.type, errorFallback, userResendSaga)
  // } catch (error) {
  //   yield catchSagaError(error)
  // }
}




