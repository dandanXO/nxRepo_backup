import { createAction } from "@reduxjs/toolkit";
import { RepaymentPageActionPayload } from "apps/app/src/app/reduxStore/repaymentPageSlice";

export const RepaymentPageSagaActions = {
    user: {
        pageAction: createAction<RepaymentPageActionPayload>('userRepaymentPageAction')
    }
}