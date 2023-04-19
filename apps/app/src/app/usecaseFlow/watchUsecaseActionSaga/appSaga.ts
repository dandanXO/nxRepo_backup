import {takeLatest, put, all, fork, call} from "redux-saga/effects";
import {userViewIndexPageSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userViewIndexPageSaga";
import {userApplyProductsSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userApplyProductsSaga";
import {userReacquireCreditSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userReacquireCreditSaga";
import {systemCountdownSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/systemCountdownSaga";
import {IndexPageSagaAction} from "../usecaseActionSaga/userUsecaseSaga/indexPage";
import {SystemCaseActions} from "../usecaseActionSaga/systemUsecaseSaga/systemCaseActions";
import {watchSystemInitSaga} from "../usecaseActionSaga/systemUsecaseSaga/watchSystemInitSaga";

import {
  watchLoginPageSaga,
} from "../usecaseActionSaga/userUsecaseSaga/loginPageSaga";
import {
  systemRefreshableCountdownSaga
} from "../usecaseActionSaga/userUsecaseSaga/indexPage/systemRefreshableCountdownSaga";

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* AppSaga() {
  try {
    yield all([
      watchSystemInitSaga(),
      watchLoginPageSaga(),
    ])

    yield takeLatest(IndexPageSagaAction.UserViewIndexPageAction.type, userViewIndexPageSaga);
    yield takeLatest(IndexPageSagaAction.UserApplyProductAction.type, userApplyProductsSaga)
    yield takeLatest(IndexPageSagaAction.UserReacquireCreditAction.type, userReacquireCreditSaga)

    yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, systemCountdownSaga)
    yield takeLatest(SystemCaseActions.SystemRefreshableCountdownSaga.type, systemRefreshableCountdownSaga);


    // NOTICE: flow
    // yield put(SystemCaseActions.InitSaga());

  } catch (error) {
    // yield catchSagaError(error);
    console.error("error", error);
  }
}
