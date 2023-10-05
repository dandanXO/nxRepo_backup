import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { GetLoanRecordListReponse } from "../../../../externel/loanService/GetLoanRecordListReponse";
import { GetLoanRecordListRequest } from "../../../../externel/loanService/GetLoanRecordListRequest";
import { APIV3 } from "../../../../externel/rtk";
import { loadingSlice } from "apps/app/src/app/reduxStore/loadingSlice";
import { RepaymentPageActionPayload, repaymentPageSlice } from "apps/app/src/app/reduxStore/repaymentPageSlice";
import moment from "moment";
import { all, call, fork, put, race, select, take } from "redux-saga/effects";

const statusEnum = {
    Overdue: 'OVERDUE',
    Done: 'DONE',
    Unpaid: 'UNPAID',
    Processing: 'PROCESSING',
    Rejected: 'REJECTED',
    Expend: 'EXTEND',
} as { [key: string]: string };

export function* userRepaymentPageSaga(action: PayloadAction<RepaymentPageActionPayload>) {
    try {

        yield put(loadingSlice.actions.updatePageLoading(true));

        yield put(
            APIV3.endpoints.getLoanRecordList.initiate({
                pageNumber: 0,
                pageSize: 500,
                status: statusEnum[action.payload.paymentType] as GetLoanRecordListRequest['status'],
                // @ts-ignore
                timestamp: moment().format('HH:mm:ss')
            }) as any
        );

        const { success, failure } = yield race({
            success: take(APIV3.endpoints.getLoanRecordList.matchFulfilled),
            failure: take(APIV3.endpoints.getLoanRecordList.matchRejected),
        })

        if (success) {
            yield put(repaymentPageSlice.actions.updateRepaymentRecord(success.payload.content || []));
            yield put(repaymentPageSlice.actions.updateRepaymentPage({
                paymentType: action.payload.paymentType,
                scrollPosition: action.payload.scrollPosition,
            }))
        }

    } catch {
        //

    } finally {
        yield put(loadingSlice.actions.updatePageLoading(false));
    }
}



