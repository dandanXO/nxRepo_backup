import { PayloadAction } from "@reduxjs/toolkit";
import { UserReserveActionPayload } from ".";
import { put, race, take } from "redux-saga/effects";
import { APIV3 } from "../../../../externel/backend/rtk";
import { modalInitialState, modalSlice } from "apps/app/src/app/reduxStore/modalSlice";
import { catchSagaError } from "../../../../uiFlowUsecase/utils/catchSagaError";
import {getOrderNo} from "../../../../presentation/querystring/getOrderNo";

export function* userReserveSaga(action: PayloadAction<UserReserveActionPayload>) {
    // console.log("userReserveSaga.payload-------", action.payload);
    try {
        const reserveOrderNo = getOrderNo();
        yield put(
            APIV3.endpoints.postReservationSubmit.initiate({
                details: action.payload.reservationDetail,
                reserveOrderNo
            }) as any
        );

        const { success, failure } = yield race({
            success: take(APIV3.endpoints.postReservationSubmit.matchFulfilled),
            failure: take(APIV3.endpoints.postReservationSubmit.matchRejected),
        })

        if (success) {
            yield put(modalSlice.actions.updateReservationProductsModal({
                ...modalInitialState.reservationProductsModal
            }))
            yield put(modalSlice.actions.updateReservationSuccessModal({
                show: true,
            }))
        }
    } catch (error) {
        yield catchSagaError(error);
    }
}
