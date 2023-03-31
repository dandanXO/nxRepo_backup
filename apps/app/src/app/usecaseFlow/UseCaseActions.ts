// NOTICE:
import {createAction} from "@reduxjs/toolkit";
import {LoanServiceRequest} from "../services/loanService/loanService";

export const UseCaseActions = {
  UserApplyProductAction: createAction<LoanServiceRequest>("userApplyProduct"),
  UserReacquireCreditAction: createAction<null>("userReacquireCredit"),
  UserViewIndexPageAction: createAction("userViewIndexPage"),
}
