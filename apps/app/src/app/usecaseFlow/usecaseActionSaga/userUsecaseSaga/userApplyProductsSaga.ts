// NOTE: Action: UserApplyProduct
import {LoanServiceResponse} from "../../../services/loanService/postApplyLoanService";
import {call, put, select, take, race} from "redux-saga/effects";
import {Service} from "../../../services";
import {catchSagaError} from "../../utils/catchSagaError";
import {InitialStateType, modalSlice} from "../../reduxStore/modalSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {GetBankCardListResponse} from "../../../services/api/types/getBankCardList";
import {RootState} from "../../reduxStore";
import {UseCaseActions, UserApplyProductActionPayload} from "../../usecaseAction/useCaseActions";

// NOTICE: 中間流程 updateQuickRepaymentSummaryModal 的成功是控制在 saga 內，關閉則是控制在 component。來避免用戶再還沒提交成功中可以回到首頁
export function* userApplyProductsSaga(action: PayloadAction<UserApplyProductActionPayload>) {
  // console.group("userApplyProductsSaga");
  // console.log("action", action);

  // PayloadAction<LoanServiceRequest>
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    // NOTE: 讀取相關總結資訊
    // NOTE: way1
    // const getBankCardListAction = API.endpoints.getBankCardList.initiate(null) as any;
    // yield put(getBankCardListAction)
    // NOTE: way2
    const data: GetBankCardListResponse = yield call(Service.UserService.GetBankCardList, null);
    console.log("data", data);

    // NOTE: Popup Summary Modal - confirm | cancel | (see loan agreement model)
    yield put(modalSlice.actions.updateQuickRepaymentSummaryModal({
      show: true,
      confirm: false,
      bankcardList: data.bankAccounts,
    }))

    yield put(modalSlice.actions.updateQuickRepaymentSummaryModalSelectedID({
      selectedBankcardId: data.bankAccounts[0].bankId,
    }))

    // const [result, result2] = yield race([
    //   take(modalSlice.actions.updateQuickRepaymentSummaryModal),
    //   take(modalSlice.actions.updateLoanAgreementModal),
    // ])
    // console.log("result", result);
    // console.log("result2", result2);

    // NOTE: Waiting for user to confirm | cancel | (see loan agreement modal)
    const { type, payload: { show, confirm} }: PayloadAction<InitialStateType["quickRepaymentSummaryModal"]> = yield take(modalSlice.actions.updateQuickRepaymentSummaryModal);
    if(!confirm) {
      // console.log("cancel");
      return;
    } else {
      // console.log("applyLoan");
    }

    const selectedBankcardID: number = yield select((state: RootState) => state.model.quickRepaymentSummaryModal.selectedBankcardId);
    const response: LoanServiceResponse = yield call(Service.LoanService.applyLoan, {
      ...action.payload,
      bankId: selectedBankcardID,
    });
    // console.log("applyLoan.response", response);

    // NOTE: Refresh IndexPage view data
    yield put(UseCaseActions.UserViewIndexPageAction());

    // NOTE: Reset Summary Modal
    yield put(modalSlice.actions.updateQuickRepaymentSummaryModal({
      show: false,
      confirm: false,
      bankcardList: [],
      selectedBankcardId: undefined,
    }))

    yield put(modalSlice.actions.updateQRSuccessModal({
      show: true,
    }))

  } catch (error: any) {
    yield catchSagaError(error);
  } finally {
    // console.groupEnd();
  }
}
