import {Task} from "redux-saga";
import {all, call, fork, put, take, cancel} from "redux-saga/effects";
import {Service} from "../../../api";
import {appSlice} from "../../reduxStore/appSlice";
import {GetInitServiceResponse} from "../../../api/appService/GetInitServiceResponse";
import {catchSagaError} from "../../utils/catchSagaError";
import {GetUserInfoServiceResponse} from "../../../api/userService/GetUserInfoServiceResponse";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";
import {SystemCaseActions} from "./systemCaseActions";
import {IndexPageSagaAction} from "../userUsecaseSaga/indexPage";


export function *watchSystemInitSaga() {
  console.log("[app][appSaga] 1.1")
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

function *callGetUserInfo() {
  const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
  yield put(indexPageSlice.actions.updateUserAPI(userResponse));
}

export function *systemStartInitSaga() {
  try {
    console.log("[app][saga] systemStartInitSaga")

    // TODO:
    // NOTE: 是否啟用測試渠道(測試不好會出4)
    const packageId = window.isInAndroid() ? "packageId" : "com.oasisgold.app.android"
    console.log("[app][saga]  packageId", packageId);

    const [response, userResponse]:[GetInitServiceResponse,GetUserInfoServiceResponse] = yield all(
      [
        call(Service.AppService.getInit, {packageId}),
        call(Service.UserService.GetUserInfoService, {}),
      ]
    )
    yield put(appSlice.actions.updateInit(response));
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
