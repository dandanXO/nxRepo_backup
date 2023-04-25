import {all, call, put, take} from "redux-saga/effects";
import {Service} from "../../../api";
import {appSlice} from "../../reduxStore/appSlice";
import {GetInitServiceResponse} from "../../../api/appService/GetInitServiceResponse";
import {catchSagaError} from "../../utils/catchSagaError";
import {GetUserInfoServiceResponse} from "../../../api/userService/GetUserInfoServiceResponse";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";
import {SystemCaseActions} from "./systemCaseActions";
import {systemCallGetUserInfoSaga} from "../userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga";

import {IThemeConfig} from "@frontend/mobile/shared/ui";
import {AndroidAppInfo} from "../../../modules/window/IWindow";


export function *watchSystemInitSaga() {
  console.log("[app][saga] 1.1")
  console.log("[app][saga] debug.watchSystemInitSaga")

  console.log("[app][saga] 接收初始化")
  yield take(SystemCaseActions.InitSaga.type);

  console.log("[app][saga] 開始初始化")

  yield call(systemStartInitSaga);

  console.log("[app][saga] 完成初始化")


}

function *callGetInit(packageId: string) {
  const response: GetInitServiceResponse = yield call(Service.AppService.getInit, {packageId});
  yield put(appSlice.actions.updateInit(response));
}


export function *systemStartInitSaga() {
  try {
    console.log("[app][saga] systemStartInitSaga")


    // TODO:
    // NOTE: 是否啟用測試渠道(測試不好會出4)
    // const packageId = window.isInAndroid() ? "packageId" : "com.oasisgold.app.android"
    let packageId = "com.ind.kyc.application";
    let appInfo: AndroidAppInfo = window.AppInfoTask && window.AppInfoTask.getAppInfo && window.AppInfoTask.getAppInfo()
    if(appInfo) {
      packageId = appInfo.packageId;
    }
    console.log("[app][saga]  packageId", packageId);
    yield put(appSlice.actions.updateAndroidInfo(appInfo));

    const [response, userResponse]:[GetInitServiceResponse,GetUserInfoServiceResponse] = yield all(
      [
        call(Service.AppService.getInit, {packageId}),
        // call(Service.UserService.GetUserInfoService, {}),
        systemCallGetUserInfoSaga(),
      ]
    )
    // yield put(appSlice.actions.updateInit(response));
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));
    console.log("[app][saga][Service] AppService.getInit.response", response);
    console.log("[app][saga][Service] AppService.UserService.GetUserInfoService", userResponse);

    // const callGetInitTask:Task = yield fork(callGetInit, packageId)
    // const callGetUserInfoTask:Task = yield fork(callGetUserInfo)
    // yield take(SystemCaseActions.Cancel.InitSaga.type);
    // yield cancel(callGetInitTask);
    // yield cancel(callGetUserInfoTask);

    console.log("[app][saga] systemStartInitSaga");

    yield put(appSlice.actions.init(null))

  } catch (error) {
    // NOTE: 這邊也能收到其他 action error
    yield catchSagaError(error);
  }
}
