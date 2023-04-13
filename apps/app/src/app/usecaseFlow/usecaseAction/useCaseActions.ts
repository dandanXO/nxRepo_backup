import {createAction} from "@reduxjs/toolkit";
import {LoanServiceRequest} from "../../api/loanService/LoanServiceRequest";

export type UserApplyProductActionPayload = Pick<LoanServiceRequest, "applyAmount" | "details">;

// NOTE: 會 deprecated，global 只會有 systemUsecase, UserUsecase 只會在各頁面，會是 Root Page?
export const UseCaseActions = {
  UserViewIndexPageAction: createAction("userViewIndexPage"),
  // UserApplyProductAction: createAction<LoanServiceRequest>("userApplyProduct"),
  // NOTICE: REFACTOR ME
  UserApplyProductAction: createAction<UserApplyProductActionPayload>("userApplyProduct"),
  UserReacquireCreditAction: createAction<null>("userReacquireCredit"),
}
