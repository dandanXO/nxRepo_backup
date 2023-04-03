import {takeLatest} from "redux-saga/effects";
import {userApplyProductsSaga} from "./usecaseSaga/userApplyProductsSaga";
import {userReacquireCreditSaga} from "./usecaseSaga/userReacquireCreditSaga";
import {createAction} from "@reduxjs/toolkit";
import {LoanServiceRequest} from "../services/loanService/loanService";
import {userViewIndexPageSaga} from "./usecaseSaga/userViewIndexPageSaga";
import {systemCountdownSaga} from "./usecaseSaga/systemCountdownSaga";


export type UserApplyProductActionPayload = Pick<LoanServiceRequest, "applyAmount" | "details">;

export const UseCaseActions = {
  UserViewIndexPageAction: createAction("userViewIndexPage"),
  // UserApplyProductAction: createAction<LoanServiceRequest>("userApplyProduct"),
  // NOTICE: REFACTOR ME
  UserApplyProductAction: createAction<UserApplyProductActionPayload>("userApplyProduct"),
  UserReacquireCreditAction: createAction<null>("userReacquireCredit"),
}

export const SystemCaseActions = {
  SystemCountdownSaga: createAction<string>("SystemCountdownSaga"),
}

export function *AppSaga() {
  // yield all([
  //   userViewIndexPageSaga,
  // ])
  // NOTICE: 暫時註解變成 stubbing mode
  // yield userViewIndexPageSaga();
  yield takeLatest(UseCaseActions.UserViewIndexPageAction.type, userViewIndexPageSaga);
  yield takeLatest(UseCaseActions.UserApplyProductAction.type, userApplyProductsSaga)
  yield takeLatest(UseCaseActions.UserReacquireCreditAction.type, userReacquireCreditSaga)
  yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, systemCountdownSaga)

}
