import { push } from '@lagunovsky/redux-react-router';
import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { call, put, race, take } from 'redux-saga/effects';

import { APIV3 } from '../../../../externel/rtk';
import { catchSagaError } from '../../../../uiUsecaseFlow/utils/catchSagaError';
import { InitialStateType, modalInitialState, modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';
import { getOrderNo } from 'apps/app/src/app/modules/querystring/getOrderNo';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import moment from 'moment';



export function* systemShowReservationSaga(action: PayloadAction) {
    // console.log("action.payload-------", action.payload);
    try {
        yield put(loadingSlice.actions.updatePageLoading(true));

        const reserveOrderNo = getOrderNo();

        yield put(
            APIV3.endpoints.getReservation.initiate({
                reserveOrderNo: reserveOrderNo,
                // @ts-ignore
                timestamp: moment().format('HH:mm:ss')
            }) as any
        )
        const { success, failure } = yield race({
            success: take(APIV3.endpoints.getReservation.matchFulfilled),
            failure: take(APIV3.endpoints.getReservation.matchRejected),
        })
        if (success) {
            if (success.payload.available) {
                yield put(modalSlice.actions.updateReservationProductsModal({
                    show: true,
                    confirm: false,
                    reservationDetail: [],
                    availableAmount: success.payload.availableAmount,
                    products: success.payload.products
                }))
            }
        }

    } catch (error) {
        yield catchSagaError(error);
    } finally {
        yield put(loadingSlice.actions.updatePageLoading(false));
    }
}
