// NOTE: Action: UserApplyProduct
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select, take, takeLatest, race} from 'redux-saga/effects';

import {Service} from '../../../../api';
import {LoanServiceResponse} from '../../../../api/loanService/service/postApplyLoanService';
import {GetBankCardListResponse} from '../../../../api/userService/GetBankCardListResponse';
import {RootState} from '../../../../reduxStore';
import {InitialStateType, modalSlice} from '../../../../reduxStore/modalSlice';
import {catchSagaError} from '../../../../usecaseFlow/utils/catchSagaError';
import {IndexPageSagaAction, UserApplyProductActionPayload} from './indexPageActions';
import {loadingSlice} from 'apps/app/src/app/reduxStore/loadingSlice';
import {alertModal} from "../../../../api/base/alertModal";
import {SentryModule} from "../../../../modules/sentry";
import {routerActions} from "@lagunovsky/redux-react-router";
import {PagePathEnum} from "../../PagePathEnum";
import {getToken} from "../../../../modules/querystring/getToken";
import {errorFallback} from "../../../../usecaseFlow/utils/errorFallback";
import {userReacquireCreditSaga} from "./userReacquireCreditSaga";

// NOTICE: 中間流程 updateQuickRepaymentSummaryModal 的成功是控制在 saga 內，關閉則是控制在 component。來避免用戶再還沒提交成功中可以回到首頁

function* callAndroidFunctionToUploadUserPhoneData() {
  // NOTE: 呼叫 Native APP 進行背景資料上傳
  if (
    window['IndexTask'] &&
    window['IndexTask']['uploadKycBackgroundData'] &&
    window['IndexTask']['uploadKycBackgroundData']
  ) {
    window['IndexTask']['uploadKycBackgroundData']();
  } else {
    // NOTICE: 新增邏輯錯誤
    const message = "Call Android IndexTask.uploadKycBackgroundData unsuccessfully";
    console.log(message);
    SentryModule.captureMessage(message)
    return false;
  }

  // NOTE: 監聽 Android Call Javascript Function 返回的訊息
  const { payload: onUploadKycBackgroundData } = yield take(
    IndexPageSagaAction.system.KycBackgroundDataUploadedSaga
  );
  console.log("onUploadKycBackgroundData", onUploadKycBackgroundData);

  if (!onUploadKycBackgroundData) {
    // NOTICE: 使用者拒絕授權結束流程
    const message = 'User refuses to authenticate';
    // alertModal("Please confirm to upload to apply.");
    console.log(message)
    return false;
  }

  return true;
}

export function* userApplyProductsSaga(action: PayloadAction<UserApplyProductActionPayload>) {
  console.group("userApplyProductsSaga.action", action);

  // NOTICE: 防止錯誤後無法重新 watch
  try {
    yield put(routerActions.push(`${PagePathEnum.IndexPage}/quick-repayment-modal?token=${getToken()}`))

    let uploaded = false;

    // NOTE: 系統沒開啟老客強下開關才需要彈跳 SummaryModal
    const oldUserForceApply: boolean = yield select((state: RootState) => state.indexPage.indexAPI?.oldUserForceApply);
    if(!oldUserForceApply) {
      // NOTE: 讀取相關總結資訊
      // NOTE: way1
      // const getBankCardListAction = API.endpoints.getBankCardList.initiate(null) as any;
      // yield put(getBankCardListAction)
      // NOTE: way2
      const data: GetBankCardListResponse = yield call(Service.UserService.GetBankCardList, null);
      // console.log('data', data);

      // const oldUserForceApply: boolean = yield select((state: RootState) => state.indexPage.indexAPI?.oldUserForceApply);

      // NOTE: 彈跳 Popup Summary Modal - confirm | cancel | (see loan agreement model)
      // yield put(
      //   modalSlice.actions.updateQuickRepaymentSummaryModal({
      //     show: true,
      //     confirm: false,
      //     bankcardList: data.bankAccounts,
      //   })
      // );
      yield put(
        modalSlice.actions.updateSimpleQuickRepaymentModal({
          show: true,
          confirm: false,
          bankcardList: data.bankAccounts,
        })
      );

      // 預設第一張銀行卡
      // yield put(
      //   modalSlice.actions.updateQuickRepaymentSummaryModalSelectedID({
      //     selectedBankcardId: data.bankAccounts[0].bankId,
      //   })
      // );
      yield put(
        modalSlice.actions.updateSimpleQuickRepaymentModalSelectedID({
          selectedBankcardId: data.bankAccounts[0].bankId,
        })
      );

      // const [result, result2] = yield race([
      //   take(modalSlice.actions.updateQuickRepaymentSummaryModal),
      //   take(modalSlice.actions.updateLoanAgreementModal),
      // ])
      // console.log("result", result);
      // console.log("result2", result2);

      // NOTE: Waiting for user to confirm | cancel | (see loan agreement modal)
      // const {
      //   type,
      //   payload: { show, confirm },
      // }: PayloadAction<InitialStateType['quickRepaymentSummaryModal']> = yield take(
      //   modalSlice.actions.updateQuickRepaymentSummaryModal
      // );
      // if (!confirm) {
      //   console.log("cancel");
      //   return;
      // } else {
      //   console.log("applyLoan");
      //   uploaded = yield call(autoToUploadUserPhoneData);
      // }

      uploaded = yield call(callAndroidFunctionToUploadUserPhoneData);
    } else {
      uploaded = yield call(callAndroidFunctionToUploadUserPhoneData);
    }



    let processFinished = false;
    while(!uploaded && !processFinished) {

      yield put(modalSlice.actions.updateSimpleQuickRepaymentModal({
        show: true,
        confirm: true,
      }))

      const {
        type,
        payload: { show, confirm },
      }: PayloadAction<InitialStateType['quickRepaymentSummaryModal']> = yield take(
        modalSlice.actions.updateSimpleQuickRepaymentModal
      );
      if (confirm) {
        if(!uploaded) {
          uploaded = yield call(callAndroidFunctionToUploadUserPhoneData);
        } else {
          processFinished = true;
        }
      } else {
        console.log("cancel");
        processFinished = true;
      }
    }

    console.log("開始借款")
    const selectedBankcardID: number = yield select(
      (state: RootState) => state.model.quickRepaymentSummaryModal.selectedBankcardId
    );

    yield put(loadingSlice.actions.updatePageLoading(true));
    const { data: responseData, success }: { data: LoanServiceResponse; success: boolean } = yield call(
      Service.LoanService.applyLoan,
      {
        ...action.payload,
        bankId: selectedBankcardID,
      }
    );

    // console.log("applyLoan.responseData", responseData);

    if (success) {
      // NOTE: Refresh IndexPage view data
      yield put(IndexPageSagaAction.user.viewIndexPageAction());

      // NOTE: Reset Summary Modal
      yield put(
        modalSlice.actions.updateQuickRepaymentSummaryModal({
          show: false,
          confirm: false,
          bankcardList: [],
          selectedBankcardId: undefined,
        })
      );

      yield put(
        modalSlice.actions.updateQRSuccessModal({
          show: true,
        })
      );
    }


  } catch (error: any) {
    yield catchSagaError(error);
  } finally {
    yield put(loadingSlice.actions.updatePageLoading(false));
    // console.groupEnd();
  }
}
