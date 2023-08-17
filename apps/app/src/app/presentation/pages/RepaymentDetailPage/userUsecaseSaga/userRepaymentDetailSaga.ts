import { PayloadAction } from "@reduxjs/toolkit";
import { put, race, take } from "redux-saga/effects";
import { API, APIV3 } from "apps/app/src/app/api/rtk";
import { getOrderNo } from "apps/app/src/app/modules/querystring/getOrderNo";
import { modalInitialState, modalSlice } from "apps/app/src/app/reduxStore/modalSlice";
import { catchSagaError } from "apps/app/src/app/usecaseFlow/utils/catchSagaError";
import { repaymentDetailPageInitialStateType, repaymentDetailPageSlice } from "apps/app/src/app/reduxStore/repaymentDetailPageSlice";
import { rtkPendingSlice } from "apps/app/src/app/reduxStore/rtkPendingSlice";
import moment from 'moment';


export function* userRepaymentDetailSaga(action: PayloadAction<repaymentDetailPageInitialStateType['repaymentDetail']>) {
    // console.log("userReserveSaga.payload-------", action.payload);
    try {
        yield put(rtkPendingSlice.actions.updateRtkPending(true));
        yield put(
            API.endpoints.getLoanDetail.initiate({
                orderNo: getOrderNo(),
                // @ts-ignore
                timestamp: moment().format('HH:mm:ss')
            }) as any
        );

        const { success, failure } = yield race({
            success: take(API.endpoints.getLoanDetail.matchFulfilled),
            failure: take(API.endpoints.getLoanDetail.matchRejected),
        })

        if (success) {
            yield put(repaymentDetailPageSlice.actions.updateRepaymentDetail(success.payload))
        }


    } catch (error) {
        yield catchSagaError(error);
    } finally {
        yield put(rtkPendingSlice.actions.updateRtkPending(false))
    }
}