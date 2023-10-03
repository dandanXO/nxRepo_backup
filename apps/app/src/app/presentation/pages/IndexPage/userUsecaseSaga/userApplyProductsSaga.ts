// NOTE: Action: UserApplyProduct
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select, take, takeLatest, race, retry} from 'redux-saga/effects';

import {Service} from '../../../../api';
import {LoanServiceResponse} from '../../../../api/loanService/service/postApplyLoanService';
import {GetBankCardListResponse} from '../../../../api/userService/GetBankCardListResponse';
import {RootState} from '../../../../reduxStore';
import {InitialStateType, modalSlice} from '../../../../reduxStore/modalSlice';
import {catchSagaError} from '../../../../usecaseFlow/utils/catchSagaError';
import {IndexPageSagaAction, UserApplyProductActionPayload} from './indexPageActions';
import {loadingSlice} from 'apps/app/src/app/reduxStore/loadingSlice';
import {SentryModule} from "../../../../modules/sentry";
import {go, routerActions} from "@lagunovsky/redux-react-router";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {getToken} from "../../../../modules/querystring/getToken";
import {errorFallback} from "../../../../usecaseFlow/utils/errorFallback";

// NOTICE: 中間流程 updateQuickRepaymentSummaryModal 的成功是控制在 saga 內，關閉則是控制在 component。來避免用戶再還沒提交成功中可以回到首頁

function* callAndroidFunctionToUploadUserPhoneData() {
  console.log("callAndroidFunctionToUploadUserPhoneData")
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
    const error = new Error("message")
    SentryModule.captureException(error)
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
    console.log(message)
    return false;
  }

  return true;
}

export function* userApplyProductsSaga(action: PayloadAction<UserApplyProductActionPayload>) {
  console.group("userApplyProductsSaga.action", action);

  // NOTICE: 防止錯誤後無法重新 watch
  try {
    yield put(routerActions.push(`${PageOrModalPathEnum.IndexPage}/quick-repayment-modal?token=${getToken()}`))

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

    // 用戶是否點擊過借款按鈕
    let isUserTapApplyButton = false;

    // 當日沒上傳過過，點擊付款認後
    let processFinished = false;
    while(!uploaded && !processFinished) {
      // 等待用戶點擊借款
      const {
        type,
        payload: { show, confirm },
      }: PayloadAction<InitialStateType['simpleQuickRepaymentModal']> = yield take(
        modalSlice.actions.updateSimpleQuickRepaymentModal
      );
      isUserTapApplyButton = true;
      // 點擊借款
      if (confirm) {
        // 當日沒上傳過再次彈出授權權限畫面
        if(!uploaded) {
          uploaded = yield call(callAndroidFunctionToUploadUserPhoneData);
        } else {
          // 當日上傳過可以跳到借款 API
          processFinished = true;
        }
      } else {
        // NOTICE: 用戶點擊其他地方取消借款
        processFinished = true;
        return;
      }
    }

    // NOTICE: 用戶授權過權限，但沒有還沒有點擊過借款按鈕
    if(!isUserTapApplyButton) {
      console.log("用戶授權過權限，但沒有還沒有點擊過借款按鈕")
      const {
        type,
        payload: { show, confirm },
      }: PayloadAction<InitialStateType['simpleQuickRepaymentModal']> = yield take(
        modalSlice.actions.updateSimpleQuickRepaymentModal
      );
      if(!confirm) {
        console.log("用戶取消借款")
        return;
      } else {
        console.log("用戶確認借款")
      }
    }

    // NOTICE: 用戶成功授權並且點擊過借款按鈕
    if(uploaded) {
      console.log("系統開始借款流程")

      const selectedBankcardID: number = yield select(
        (state: RootState) => state.model.simpleQuickRepaymentModal.selectedBankcardId
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
          modalSlice.actions.updateSimpleQuickRepaymentModal({
            show: false,
            confirm: false,
            bankcardList: [],
            selectedBankcardId: undefined,
          })
        );

        // NOTE: back to indexPage
        yield put(go(-1))

        yield put(
          modalSlice.actions.updateQRSuccessModal({
            show: true,
          })
        );
      }
    }

  } catch (error: any) {
    yield catchSagaError(error);
  } finally {
    yield put(loadingSlice.actions.updatePageLoading(false));
    // console.groupEnd();
  }
}
