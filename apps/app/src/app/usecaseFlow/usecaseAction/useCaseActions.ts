import {createAction} from "@reduxjs/toolkit";
import {LoanServiceRequest} from "../../services/loanService/loanServiceRequest";

export type UserApplyProductActionPayload = Pick<LoanServiceRequest, "applyAmount" | "details">;

export const UseCaseActions = {
  UserViewIndexPageAction: createAction("userViewIndexPage"),
  // UserApplyProductAction: createAction<LoanServiceRequest>("userApplyProduct"),
  // NOTICE: REFACTOR ME
  UserApplyProductAction: createAction<UserApplyProductActionPayload>("userApplyProduct"),
  UserReacquireCreditAction: createAction<null>("userReacquireCredit"),
}
