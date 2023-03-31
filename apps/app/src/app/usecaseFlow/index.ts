import {takeLatest} from "redux-saga/effects";
import moment from "moment-timezone";
import {UseCaseActions} from "./UseCaseActions";
import {userApplyProductsSaga} from "./usecaseSaga/userApplyProductsSaga";
import {userReacquireCreditSaga} from "./usecaseSaga/userReacquireCreditSaga";

const INDIA_TIME_ZONE = "Asia/Kolkata";


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


export function *AppSaga() {
  // yield all([
  //   userViewIndexPageSaga,
  // ])

  // yield takeLatest(UseCaseActions.UserViewIndexPageAction.type, userViewIndexPageSaga);
  // NOTICE: 暫時註解變成 stubbing mode
  // yield userViewIndexPageSaga();
  // yield all([
  //   userApplyProductsSaga,
  // ])
  yield takeLatest(UseCaseActions.UserApplyProductAction.type, userApplyProductsSaga)
  yield takeLatest(UseCaseActions.UserReacquireCreditAction.type, userReacquireCreditSaga)
}
