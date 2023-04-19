import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import {Service} from "../../../api";
import {appSlice} from "../../reduxStore/appSlice";
import {GetInitServiceResponse} from "../../../api/appService/GetInitServiceResponse";
import {catchSagaError} from "../../utils/catchSagaError";
import {errorFallback} from "../../utils/errorFallback";
// import {userGetOTPSaga} from "../userUsecaseSaga/loginPageSaga/userGetOTPSaga";
// import {LoginPageSagaActions} from "../userUsecaseSaga/loginPageSaga";
import {GetUserInfoServiceResponse} from "../../../api/userService/GetUserInfoServiceResponse";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";
// import {createAction} from "@reduxjs/toolkit";
import {SystemCaseActions} from "./systemCaseActions";

// export const systemInitAction = createAction("systemInitAction");

export function *watchSystemInitSaga() {
  console.log("debug.watchSystemInitSaga")
  yield takeEvery(SystemCaseActions.InitSaga.type, errorFallback, systemStartInitSaga)
  // yield systemStartInitSaga();
}

export function *systemStartInitSaga() {
  try {
    console.log("debug.systemStartInitSaga")

    // NOTE: 是否啟用測試渠道(測試不好會出4)
    const packageId = window.isInAndroid() ? "packageId" : "com.oasisgold.app.android"
    console.log("[APP] packageId", packageId);

    const response: GetInitServiceResponse = yield call(Service.AppService.getInit, {packageId});
    console.log("[APP][Service] AppService.getInit.response", response);

    const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));

    yield put(appSlice.actions.updateInit(response));

  } catch (error) {
    // NOTE: 這邊也能收到其他 action error
    yield catchSagaError(error);
  }
}
