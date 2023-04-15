import {call, put, takeLatest} from "redux-saga/effects";
import {Service} from "../../../api";
import {appSlice} from "../../reduxStore/appSlice";
import {GetInitServiceResponse} from "../../../api/appService/GetInitServiceResponse";
import {catchSagaError} from "../../utils/catchSagaError";
import {errorFallback} from "../../utils/errorFallback";
import {userGetOTPSaga} from "../userUsecaseSaga/loginPageSaga/userGetOTPSaga";
import {LoginPageSataActions} from "../userUsecaseSaga/loginPageSaga";

export function *systemInitSaga() {
  yield takeLatest("systemInitSaga", errorFallback, systemStartInitSaga)
}

export function *systemStartInitSaga() {
  try {
    // NOTE: 是否啟用測試渠道(測試不好會出4)
    const packageId = window.isInAndroid() ? "packageId" : "com.oasisgold.app.android"
    console.log("[APP] packageId", packageId);

    const response: GetInitServiceResponse = yield call(Service.AppService.getInit, {packageId});
    console.log("[APP][Service] AppService.getInit.response", response);

    yield put(appSlice.actions.updateInit(response));

  } catch (error) {
    // NOTE: 這邊也能收到其他 action error
    yield catchSagaError(error);
  }
}
