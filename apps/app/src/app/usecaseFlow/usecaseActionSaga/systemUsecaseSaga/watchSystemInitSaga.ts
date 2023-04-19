import {call, put, take, takeEvery, takeLatest} from "redux-saga/effects";
import {Service} from "../../../api";
import {appSlice, InitailState} from "../../reduxStore/appSlice";
import {GetInitServiceResponse} from "../../../api/appService/GetInitServiceResponse";
import {catchSagaError} from "../../utils/catchSagaError";
import {errorFallback} from "../../utils/errorFallback";
// import {userGetOTPSaga} from "../userUsecaseSaga/loginPageSaga/userGetOTPSaga";
// import {LoginPageSagaActions} from "../userUsecaseSaga/loginPageSaga";
import {GetUserInfoServiceResponse} from "../../../api/userService/GetUserInfoServiceResponse";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";
// import {createAction} from "@reduxjs/toolkit";
import {SystemCaseActions} from "./systemCaseActions";
import {IndexPageSagaAction} from "../userUsecaseSaga/indexPage";

// export const systemInitAction = createAction("systemInitAction");

export function *watchSystemInitSaga() {
  console.log("[app][saga] debug.watchSystemInitSaga")

  console.log("[app][saga] 接收初始化")
  yield take(SystemCaseActions.InitSaga.type);

  console.log("[app][saga] 開始初始化")
  yield call(systemStartInitSaga);
  console.log("[app][saga] 完成初始化")

  yield put(appSlice.actions.init(null))


  // yield takeEvery(SystemCaseActions.InitSaga.type, errorFallback, systemStartInitSaga)
  // yield systemStartInitSaga();
  // console.log("[app][saga] 等待初始化完畢")
  // const init: GetUserInfoServiceResponse = yield take(indexPageSlice.actions.updateUserAPI.type);
  // console.log("[app][saga] 初始化完畢 init", init)
  // yield put(IndexPageSagaAction.UserViewIndexPageAction())
}

export function *systemStartInitSaga() {
  try {
    console.log("[app][saga] systemStartInitSaga")

    // TODO:
    // NOTE: 是否啟用測試渠道(測試不好會出4)
    const packageId = window.isInAndroid() ? "packageId" : "com.oasisgold.app.android"
    console.log("[app][saga]  packageId", packageId);

    const response: GetInitServiceResponse = yield call(Service.AppService.getInit, {packageId});
    console.log("[app][saga] [Service] AppService.getInit.response", response);
    yield put(appSlice.actions.updateInit(response));

    const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));


    console.log("[app][saga] systemStartInitSaga");
  } catch (error) {
    // NOTE: 這邊也能收到其他 action error
    yield catchSagaError(error);
  }
}
