// NOTE: Action: UserApplyProduct
import {PayloadAction} from "@reduxjs/toolkit";
import {LoanServiceRequest, LoanServiceResponse} from "../../services/loanService/loanService";
import {call} from "redux-saga/effects";
import {Service} from "../../services";
import {catchSagaError} from "../utils/catchSagaError";

export function* userApplyProductsSaga(action: PayloadAction<LoanServiceRequest>) {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    const response: LoanServiceResponse = yield call(Service.LoanService.applyLoan, action.payload);
    console.log("response", response);
  } catch (error: any) {
    yield catchSagaError(error);
  }
}
