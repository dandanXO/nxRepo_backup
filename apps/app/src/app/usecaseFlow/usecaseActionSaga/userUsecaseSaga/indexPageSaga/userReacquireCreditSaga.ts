import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {call, delay, put, take} from "redux-saga/effects";
import {Service} from "../../../../api";
import {IndexPageSagaAction} from "./index";
import {GetQuotaModelStatusResponse} from "../../../../api/loanService/GetQuotaModelStatusResponse";
import {catchSagaError} from "../../../utils/catchSagaError";

const createRequestAction = (type: string) => {
  const loadingAction = createAction(`${type}/loading`);
  const successAction = createAction(`${type}/success`);
  const failureAction = createAction(`${type}/failure`);
  return {
    loadingAction,
    successAction,
    failureAction,
  }
}
export const getQuotaModelStatusAction = createRequestAction("GGetQuotaModelStatus");

// export const getQuotaModelStatusActions = createAsyncThunk<GetQuotaModelStatusRequest>(
//   '/api/v3/loan/quota-model-status',
//   async (thunkAPI) => {
//     const response: GetQuotaModelStatusResponse = await Service.LoanService.getQuotaModelStatus({})
//     return response;
//   }
// )

export function* userReacquireCreditSaga(action: PayloadAction<null>) {
  try {
    console.log("[app][saga] userReacquireCreditSaga");

    // FIXME: refactor me
    // NOTICE: 根據是否擁有裝置權限，來開啟 AuthorizationModal
    // const hasAuthorization =  window.IndexTask.hasAuthorizationToUploadKyc();


    // const hasAuthorization =  false;
    // if(!hasAuthorization) {
    //   // NOTE: Show Modal
    //   yield put(modalSlice.actions.updateAuthorizationModal({
    //     show: true,
    //     confirm: null,
    //   }))
    // }
    // NOTE: 等待使用者操作
    // yield take(modalSlice.actions.updateAuthorizationModal);

    // NOTE: User 是否允許?
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

    window["IndexTask"] &&
    window["IndexTask"]["uploadKycBackgroundData"] &&
    window["IndexTask"]["uploadKycBackgroundData"]();

    const { payload: onUploadKycBackgroundData } = yield take(IndexPageSagaAction.system.KycBackgroundDataUploadedSaga);
    if (!onUploadKycBackgroundData) return;


    yield put(getQuotaModelStatusAction.loadingAction())
    // yield put(getQuotaModelStatusActions.pending);
    // yield put(indexPageReducerAction.reacquire());
    let data: GetQuotaModelStatusResponse = yield call(Service.LoanService.getQuotaModelStatus, {})
    // console.log("GetQuotaModelStatusResponse", data);

    let count = 0;
    while(data.calculating === true && count <= 10) {
      // console.log("重新獲取中");
      yield delay(20 * 1000);
      data = yield call(Service.LoanService.getQuotaModelStatus, {})
      // console.log("GetQuotaModelStatusResponse", data);
      count++;
    }
    if(count > 10) {
      // console.log("失敗")
      yield put(getQuotaModelStatusAction.failureAction())
      // yield put(getQuotaModelStatusActions.rejected);
    } else {
      // console.log("成功")
      yield put(getQuotaModelStatusAction.successAction());
      // yield put(getQuotaModelStatusActions.fulfilled);

      // const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {});
      // yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));

      // NOTICE: refactor me
      // const currentTime = moment();
      // const expireTime = moment(indexResponse.offerExpireTime);
      // const isRiskControlOverdue = expireTime.isBefore(currentTime);
      // // console.log("currentTime.format", currentTime.format())
      // // console.log("expireTime.format", expireTime.format())
      // if (!isRiskControlOverdue && indexResponse.availableAmount > 0) {
      //   const expiredTime = indexResponse?.offerExpireTime;
      //   yield put(SystemCaseActions.SystemCountdownSaga(expiredTime))
      // }

      yield put(IndexPageSagaAction.user.viewIndexPageAction());

    }
  } catch (error) {
    yield put(getQuotaModelStatusAction.failureAction())
    // yield put(getQuotaModelStatusActions.rejected);
    yield catchSagaError(error);
  }


}