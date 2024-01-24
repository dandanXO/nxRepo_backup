import {
  repaymentDetailPageInitialStateType,
  repaymentDetailPageSlice
} from 'apps/app/src/app/reduxStore/repaymentDetailPageSlice';
import {rtkPendingSlice} from 'apps/app/src/app/reduxStore/rtkPendingSlice';
import moment from 'moment';
import {put, race, select, take} from 'redux-saga/effects';

import {API} from '../../../../externel/backend/rtk';
import {getOrderNo} from '../../../../externel/window/querystring/getOrderNo';
import {catchSagaError} from '../../../../uiFlowUsecase/utils/catchSagaError';
import {RootState} from "../../../../reduxStore";

export function* userRepaymentDetailSaga() {
  // console.log("userReserveSaga.payload-------", action.payload);
  try {

    const repayData: repaymentDetailPageInitialStateType['repaymentData'] =
      yield select(
        (state: RootState) => state.repaymentDetailPage.repaymentData
      );

    yield put(rtkPendingSlice.actions.updateRtkPending(true));
    yield put(
      API.endpoints.getLoanDetail.initiate({
        orderNo: getOrderNo(),
        // @ts-ignore
        timestamp: moment().format('HH:mm:ss'),
      }) as any
    );

    const {success} = yield race({
      success: take(API.endpoints.getLoanDetail.matchFulfilled),
      failure: take(API.endpoints.getLoanDetail.matchRejected),
    });

    if (success) {
      const loanAmount = success.payload.loanAmount
      const bankTransCost = Number((loanAmount * 0.03).toFixed(0));
      const cibCost = 19;
      const nadraVerysisCost = 40;
      const repaymentAmountForDemo =
        loanAmount + bankTransCost + cibCost + nadraVerysisCost;

      yield put(
        repaymentDetailPageSlice.actions.updateRepaymentDetail(success.payload)
      );

      yield put(
        repaymentDetailPageSlice.actions.updateRepaymentData({
          ...repayData,
          repaymentAmountForDemo: repaymentAmountForDemo,
        })
      );
    }
  } catch (error) {
    yield catchSagaError(error);
  } finally {
    yield put(rtkPendingSlice.actions.updateRtkPending(false));
  }
}
