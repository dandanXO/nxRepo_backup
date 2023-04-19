import {all, put, takeLatest} from "redux-saga/effects";
import {systemCountdownSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/systemCountdownSaga";
import {watchIndexPageSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage";
import {SystemCaseActions} from "../usecaseActionSaga/systemUsecaseSaga/systemCaseActions";
import {watchSystemInitSaga} from "../usecaseActionSaga/systemUsecaseSaga/watchSystemInitSaga";
import {watchLoginPageSaga,} from "../usecaseActionSaga/userUsecaseSaga/loginPageSaga";
import {
  systemRefreshableCountdownSaga
} from "../usecaseActionSaga/userUsecaseSaga/indexPage/systemRefreshableCountdownSaga";
import {errorFallback} from "../utils/errorFallback";

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* AppSaga() {
  try {
    console.log("[app][appSaga] 1")
    yield all([
      // 1.
      watchSystemInitSaga(),
      watchSystemUseCaseSaga(),
      watchLoginPageSaga(),
      watchIndexPageSaga(),
      //2.
      initSaga()
    ])
    console.log("[app][appSaga] 3")
  } catch (error) {
    // yield catchSagaError(error);
    console.error("error", error);
  }
}

function *watchSystemUseCaseSaga() {
  console.log("[app][appSaga] 1.4")
  yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, errorFallback, systemCountdownSaga)
  yield takeLatest(SystemCaseActions.SystemRefreshableCountdownSaga.type,errorFallback, systemRefreshableCountdownSaga);
}

function *initSaga() {
  console.log("[app][appSaga] 2")
  yield put(SystemCaseActions.InitSaga());
}
