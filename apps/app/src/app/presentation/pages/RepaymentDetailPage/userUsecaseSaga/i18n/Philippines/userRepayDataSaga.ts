import { PayloadAction } from "@reduxjs/toolkit";
import { put, race, select, take ,call } from "redux-saga/effects";
import { API } from "apps/app/src/app/api/rtk";
import { getOrderNo } from "apps/app/src/app/modules/querystring/getOrderNo";
import { catchSagaError } from "apps/app/src/app/usecaseFlow/utils/catchSagaError";
import { repaymentDetailPageInitialStateType, repaymentDetailPageSlice } from "apps/app/src/app/reduxStore/repaymentDetailPageSlice";
import moment from 'moment';
import { RootState } from "apps/app/src/app/reduxStore";
import { userRepaymentDetailSaga } from "../../userRepaymentDetailSaga";
import { loadingSlice } from "apps/app/src/app/reduxStore/loadingSlice";


export function* userRepayDataSaga(action:PayloadAction) {
  // console.log("userRepayDataSaga.payload-------", action.payload);
  try {

    yield put(loadingSlice.actions.updatePageLoading(true));
    yield call(userRepaymentDetailSaga);
    const { balance, orderNo = getOrderNo() } = yield select((state: RootState) => state.repaymentDetailPage.repaymentDetail);
    const repayData: repaymentDetailPageInitialStateType['repaymentData'] = yield select((state: RootState) => state.repaymentDetailPage.repaymentData);
    yield put(
      API.endpoints.getRepayTypes.initiate({
        orderNo,
        // @ts-ignore
        timestamp: moment().format('HH:mm:ss')
      }) as any
    );

    const { success, failure } = yield race({
      success: take(API.endpoints.getRepayTypes.matchFulfilled),
      failure: take(API.endpoints.getRepayTypes.matchRejected),
    })



    if (success) {
      const repayTypeList: {
        payType: string;
        payTypeAlias: string;
        payTypeNote: string;
      }[] = success.payload || [];

      const onlineRepayTypeList = repayTypeList
        ?.filter((repayType) => repayType.payTypeNote === 'Online Payment')
        .map((item) => ({ value: item.payType, label: item.payTypeAlias }));

      const offlineRepayTypeList = repayTypeList
        ?.filter(
          (repayType) => repayType.payTypeNote === 'Pay over the counter'
        )
        .map((item) => ({ value: item.payType, label: item.payTypeAlias }));

      let payType = '';
      let payTypeNoteList: { label: string; value: string }[] = [];

      if (onlineRepayTypeList?.length) {
        payType = onlineRepayTypeList[0].value;
        payTypeNoteList = [
          ...payTypeNoteList,
          {
            label: 'Online Payment',
            value: 'Online Payment',
          },
        ];
      }

      if (offlineRepayTypeList?.length) {
        if (!onlineRepayTypeList?.length) {
          payType = offlineRepayTypeList[0].value;
        }
        payTypeNoteList = [
          ...payTypeNoteList,
          {
            label: 'Pay over the counter',
            value: 'Pay over the counter',
          },
        ];
      }

      yield put(
        repaymentDetailPageSlice.actions.updateRepaymentData({
          ...repayData,
          balance: balance,
          repayAmount: balance,
          orderNo: orderNo,
          payType: payType,
          payTypeNote: payTypeNoteList[0],
          payTypeNoteList,
          offlineRepayTypeList,
          onlineRepayTypeList,
        })
      );
    }


  } catch (error) {
    yield catchSagaError(error);
  } finally {
    yield put(loadingSlice.actions.updatePageLoading(false));
  }
}
