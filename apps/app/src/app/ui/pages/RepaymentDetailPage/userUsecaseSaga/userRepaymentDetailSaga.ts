import { PayloadAction } from "@reduxjs/toolkit";
import { put, race, take } from "redux-saga/effects";
import { API, APIV3 } from "../../../../externel/backend/rtk";
import { modalInitialState, modalSlice } from "apps/app/src/app/reduxStore/modalSlice";
import { catchSagaError } from "../../../../uiFlowUsecase/utils/catchSagaError";
import { repaymentDetailPageInitialStateType, repaymentDetailPageSlice } from "apps/app/src/app/reduxStore/repaymentDetailPageSlice";
import { rtkPendingSlice } from "apps/app/src/app/reduxStore/rtkPendingSlice";
import moment from 'moment';
import {getOrderNo} from "../../../../externel/window/querystring/getOrderNo";


export function* userRepaymentDetailSaga() {
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
