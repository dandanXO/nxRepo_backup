import { push } from '@lagunovsky/redux-react-router';
import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { call, put, race, take } from 'redux-saga/effects';

import { APIV3 } from '../../../../api/rtk';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { InitialStateType, modalInitialState, modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';
import { getOrderNo } from 'apps/app/src/app/modules/querystring/getOrderNo';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import moment from 'moment';
import { IReservationProps } from './reservationAction';


export function* reservationSaga(action: PayloadAction<IReservationProps>) {
    // console.log("action.payload-------", action.payload);
    try {
        yield put(loadingSlice.actions.updatePageLoading(true));

        const reserveOrderNo = getOrderNo();

        if (!action.payload.confirm) {
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
                } else {
                    yield put(loadingSlice.actions.updatePageLoading(false));
                }
            }
        } else {
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

        }
    } catch (error) {
        yield catchSagaError(error);
    } finally {
        yield put(loadingSlice.actions.updatePageLoading(false));
    }
}
