import {createAction} from "@reduxjs/toolkit";
import {LoanServiceRequest} from "../../../../api/loanService/LoanServiceRequest";
import {SystemCaseActions} from "../../systemUsecaseSaga/systemCaseActions";
import {takeEvery} from "redux-saga/effects";
import {errorFallback} from "../../../utils/errorFallback";
import {userViewIndexPageSaga} from "./userViewIndexPageSaga";

// NOTE: 會 deprecated，global 只會有 systemUsecase, UserUsecase 只會在各頁面，會是 Root Page?
export const IndexPageSagaAction = {
  UserViewIndexPageAction: createAction("userViewIndexPage"),
  // UserApplyProductAction: createAction<LoanServiceRequest>("userApplyProduct"),
  // NOTICE: REFACTOR ME
  UserApplyProductAction: createAction<UserApplyProductActionPayload>("userApplyProduct"),
  UserReacquireCreditAction: createAction<null>("userReacquireCredit"),
}

export type UserApplyProductActionPayload = Pick<LoanServiceRequest, "applyAmount" | "details">;

export function *watchIndexPageSaga() {
  yield takeEvery(IndexPageSagaAction.UserViewIndexPageAction.type, errorFallback, userViewIndexPageSaga)

}
