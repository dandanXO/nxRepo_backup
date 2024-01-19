import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'apps/app/src/app/reduxStore';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import {
  repaymentDetailPageInitialStateType,
  repaymentDetailPageSlice,
} from 'apps/app/src/app/reduxStore/repaymentDetailPageSlice';
import moment from 'moment';
import { call, put, race, select, take } from 'redux-saga/effects';

import { API } from '../../../../externel/backend/rtk';
import { getOrderNo } from '../../../../externel/window/querystring/getOrderNo';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';
import { userRepaymentDetailSaga } from './userRepaymentDetailSaga';

export function* userRepayDataSaga(action: PayloadAction) {
  // console.log("userRepayDataSaga.payload-------", action.payload);
  try {
    yield put(loadingSlice.actions.updatePageLoading(true));
    yield call(userRepaymentDetailSaga);
    const { balance, orderNo = getOrderNo() } = yield select(
      (state: RootState) => state.repaymentDetailPage.repaymentDetail
    );
    const repayData: repaymentDetailPageInitialStateType['repaymentData'] =
      yield select(
        (state: RootState) => state.repaymentDetailPage.repaymentData
      );
    yield put(
      API.endpoints.getRepayTypes.initiate({
        orderNo,
        // @ts-ignore
        timestamp: moment().format('HH:mm:ss'),
      }) as any
    );

    const { success, failure } = yield race({
      success: take(API.endpoints.getRepayTypes.matchFulfilled),
      failure: take(API.endpoints.getRepayTypes.matchRejected),
    });

    if (success) {
      const repayTypeList =
        success.payload.length > 0 &&
        success.payload?.map((item: any) => {
          return { value: item.payType, label: item.payTypeAlias };
        });

      yield put(
        repaymentDetailPageSlice.actions.updateRepaymentData({
          ...repayData,
          balance: balance,
          repayAmount: repayData.repayAmount || balance,
          orderNo: orderNo,
          repayTypeList,
          payType: repayTypeList[0].value,
        })
      );
    }
  } catch (error) {
    yield catchSagaError(error);
  } finally {
    yield put(loadingSlice.actions.updatePageLoading(false));
  }
}
