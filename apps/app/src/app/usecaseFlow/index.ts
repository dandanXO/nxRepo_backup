import {takeLatest} from "redux-saga/effects";
import {createAction, PayloadAction} from "@reduxjs/toolkit";
import moment from "moment-timezone";
import {UseCaseActions} from "./UseCaseActions";
import {userApplyProductsSaga} from "./usecaseSaga/userApplyProductsSaga";

const INDIA_TIME_ZONE = "Asia/Kolkata";

// NOTE: 使用者瀏覽頁面
export const userViewIndexPageAction = createAction("userViewIndexPage");

// type STATE = "ready" | "pending"| "success" | "reject";
export enum USER_AUTH_STATE {
  "ready",
  "success",
  "authing",
  "reject",
}

export enum ORDER_STATE {
  "empty",
  "reviewing",
  "normal",
  "hasInComingOverdueOrder",
  "hasOverdueOrder",
  "reject",
}

export enum RISK_CONTROL_STATE {
  "unknow",
  "expired_refresh_able",
  "expired_refresh_one_time",
  "expired_refresh_over_3",
  "empty_quota", // NOTE: 風控取得就為零，不是已經借完
  "valid" ,
}

// NOTICE: refactor me
moment.tz.setDefault(INDIA_TIME_ZONE);


function *userReacquireCredit(action: PayloadAction<null>) {

}

export function *AppSaga() {
  // yield all([
  //   userViewIndexPageSaga,
  // ])

  // yield takeEvery(userViewIndexPageAction().type, userViewIndexPageSaga);
  // NOTICE: 暫時註解變成 stubbing mode
  // yield userViewIndexPageSaga();
  // yield all([
  //   userApplyProductsSaga,
  // ])
  yield takeLatest(UseCaseActions.UserApplyProductAction.type, userApplyProductsSaga)
  yield takeLatest(UseCaseActions.UserReacquireCreditAction.type, userReacquireCredit)
}
