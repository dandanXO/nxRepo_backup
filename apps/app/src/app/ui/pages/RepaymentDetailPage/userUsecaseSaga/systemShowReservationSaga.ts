import { PayloadAction } from '@reduxjs/toolkit';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import { modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';
import moment from 'moment';
import { put, race, take } from 'redux-saga/effects';

import { APIV3 } from '../../../../externel/backend/rtk';
import { getOrderNo } from '../../../../externel/window/querystring/getOrderNo';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';

export function* systemShowReservationSaga(action: PayloadAction) {
  // console.log("action.payload-------", action.payload);
  try {
    yield put(loadingSlice.actions.updatePageLoading(true));

    const reserveOrderNo = getOrderNo();

    yield put(
      APIV3.endpoints.getReservation.initiate({
        reserveOrderNo: reserveOrderNo,
        // @ts-ignore
        timestamp: moment().format('HH:mm:ss'),
      }) as any
    );
    const { success } = yield race({
      success: take(APIV3.endpoints.getReservation.matchFulfilled),
      failure: take(APIV3.endpoints.getReservation.matchRejected),
    });
    if (success) {
      if (success.payload.available) {
        yield put(
          modalSlice.actions.updateReservationProductsModal({
            show: true,
            confirm: false,
            reservationDetail: [],
            availableAmount: success.payload.availableAmount,
            products: success.payload.products,
          })
        );
      }
    }
  } catch (error) {
    yield catchSagaError(error);
  } finally {
    yield put(loadingSlice.actions.updatePageLoading(false));
  }
}