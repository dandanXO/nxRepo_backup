import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, take } from 'redux-saga/effects';

import { Service } from '../../../../api';
import { alertModal } from '../../../../api/base/alertModal';
import { GetQuotaModelStatusResponse } from '../../../../api/loanService/GetQuotaModelStatusResponse';
import { AppEnvironment } from '../../../../modules/appEnvironment';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { createRequestAction } from '../../../../usecaseFlow/utils/createRequestAction';
import { IndexPageSagaAction } from './indexPageActions';

// NOTE:
export const getQuotaModelStatusAction = createRequestAction('GGetQuotaModelStatus');

export function* userReacquireCreditSaga(action: PayloadAction<null>) {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    console.log('[app][saga] userReacquireCreditSaga');

    // TODO: PureH5 mode
    // 根據是否擁有裝置權限，來開啟 AuthorizationModal
    // const hasAuthorization =  window.IndexTask.hasAuthorizationToUploadKyc();
    // const hasAuthorization =  false;
    // if(!hasAuthorization) {
    //   // Show Modal
    //   yield put(modalSlice.actions.updateAuthorizationModal({
    //     show: true,
    //     confirm: null,
    //   }))
    // }
    // 等待使用者操作
    // yield take(modalSlice.actions.updateAuthorizationModal);

    // User 是否允許?
    // const hasUserConfirmedAuthorization: boolean = yield select((state: RootState) => state.model.authorizationModal.confirm);
    // if(!hasUserConfirmedAuthorization) {
    //   console.log("不允許權限");
    //   return;
    // } else {
    //   console.log("允許開啟權限");
    //   window["IndexTask"] &&
    //   window["IndexTask"]["uploadKycBackgroundData"] &&
    //   window["IndexTask"]["uploadKycBackgroundData"]();
    // }

    // NOTICE: 本地模式跳過與 Native APP 交互
    if (AppEnvironment.isLocalhost()) {
      // NOTE: 跳過交互
    } else {
      // NOTE: 呼叫 Native APP 進行背景資料上傳
      if (
        window['IndexTask'] &&
        window['IndexTask']['uploadKycBackgroundData'] &&
        window['IndexTask']['uploadKycBackgroundData']
      ) {
        window['IndexTask']['uploadKycBackgroundData']();
      } else {
        const message = 'Native Error: uploadKycBackgroundData function is missing.';
        alertModal(message);
        // NOTICE: 新增邏輯錯誤
        throw new Error(message);
      }

      // NOTE: 監聽 Native 返回的訊息
      const { payload: onUploadKycBackgroundData } = yield take(
        IndexPageSagaAction.system.KycBackgroundDataUploadedSaga
      );
      if (!onUploadKycBackgroundData) {
        // NOTICE: 使用者拒絕授權結束流程
        throw new Error('User refuses to authenticate');
      }
    }

    // NOTE: 第一次取得風控模型資料
    // NOTICE: 要根據此狀態將 UI Blocking
    yield put(getQuotaModelStatusAction.loadingAction());

    let data: GetQuotaModelStatusResponse = yield call(Service.LoanService.getQuotaModelStatus, {});
    console.log("GetQuotaModelStatusResponse", data);

    // NOTE: 系統每 20 秒取得風控模型資料，超過十次則停止請求
    let count = 0;
    const delayMinutesTime = 20;
    const maxRetryTime = 10;

    const isContinuingFetching = data.calculating === true && count <= maxRetryTime;
    while (isContinuingFetching) {
      // console.log("重新獲取中");
      yield delay(delayMinutesTime * 1000);
      data = yield call(Service.LoanService.getQuotaModelStatus, {});
      // console.log("GetQuotaModelStatusResponse", data);
      count++;
    }

    // NOTE: 請求結果
    if (count > maxRetryTime) {
      yield put(getQuotaModelStatusAction.failureAction());
      // yield put(getQuotaModelStatusActions.rejected);
      // NOTICE: 新增業務邏輯錯誤
      throw new Error(`System fetch quotaModalState over ${maxRetryTime} times per ${delayMinutesTime}s`);
    } else {
      yield put(getQuotaModelStatusAction.successAction());
      // yield put(getQuotaModelStatusActions.fulfilled);
      yield put(IndexPageSagaAction.user.viewIndexPageAction());
    }

    // TODO:
    // NOTICE: 要根據此狀態將 UI release
  } catch (error) {
    yield put(getQuotaModelStatusAction.failureAction());
    // yield put(getQuotaModelStatusActions.rejected);
    yield catchSagaError(error);
  }
}
