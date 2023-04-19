import {createAction} from "@reduxjs/toolkit";
import {LoanServiceRequest} from "../../../../api/loanService/LoanServiceRequest";
import {takeEvery, takeLatest} from "redux-saga/effects";
import {errorFallback} from "../../../utils/errorFallback";
import {userViewIndexPageSaga} from "./userViewIndexPageSaga";
import {userApplyProductsSaga} from "./userApplyProductsSaga";
import {userReacquireCreditSaga} from "./userReacquireCreditSaga";

// NOTE: 會 deprecated，global 只會有 systemUsecase, UserUsecase 只會在各頁面，會是 Root Page?
export const IndexPageSagaAction = {
  user: {
    viewIndexPageAction: createAction("userViewIndexPage"),
    applyProductAction: createAction<UserApplyProductActionPayload>("userApplyProduct"),
    reacquireCreditAction: createAction<null>("userReacquireCredit"),
  },
  system: {
    KycBackgroundDataUploadedSaga: createAction<boolean>("SystemKycBackgroundDataUploadedSaga"),
  }
}

export type UserApplyProductActionPayload = Pick<LoanServiceRequest, "applyAmount" | "details">;

export function *watchIndexPageSaga() {
  console.log("[app][appSaga] 1.2")
  yield takeEvery(IndexPageSagaAction.user.viewIndexPageAction.type, errorFallback, userViewIndexPageSaga)
  yield takeLatest(IndexPageSagaAction.user.applyProductAction.type, errorFallback, userApplyProductsSaga)
  yield takeLatest(IndexPageSagaAction.user.reacquireCreditAction.type, errorFallback, userReacquireCreditSaga)

}
