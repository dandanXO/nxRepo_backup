import {PayloadAction} from "@reduxjs/toolkit";
import {put, take} from "redux-saga/effects";
import {APIV3, LoginResponse} from "../../../../api/rtk";
import {AppRunningModeEnum, appSlice} from "../../../reduxStore/appSlice";
import {push} from "@lagunovsky/redux-react-router";
import {catchSagaError} from "../../../utils/catchSagaError";
import {UserLoginActionPayload} from "./index";

export function* userLoginSaga(action: PayloadAction<UserLoginActionPayload>) {
  try {
    // console.log("userLoginSaga")
    yield put(APIV3.endpoints.login.initiate({
      phoneNo: action.payload.phone,
      msgCode: action.payload.otp,
    }) as any)

    const data: { meta: any, payload: LoginResponse, type: string } = yield take(APIV3.endpoints.login.matchFulfilled);
    if (data.payload.token) {
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
