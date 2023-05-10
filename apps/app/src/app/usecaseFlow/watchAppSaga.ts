import {all, call, put, takeLatest} from 'redux-saga/effects';
import { SystemCaseActions } from './type/systemUsecaseSaga/systemCaseActions';
import { watchSystemInitSaga } from './type/systemUsecaseSaga/watchSystemInitSaga';
import { systemCountdownSaga } from './type/userUsecaseSaga/indexPageSaga/systemCountdownSaga';
import { watchLoginPageSaga } from './type/userUsecaseSaga/loginPageSaga';

import { errorFallback } from './utils/errorFallback';
import { systemRefreshableCountdownSaga } from './type/userUsecaseSaga/indexPageSaga/systemRefreshableCountdownSaga';
import { watchIndexPageSaga } from './type/userUsecaseSaga/indexPageSaga';
import {
  PersonalInfoPageSagaActions,
  watchPersonalInfoPageSaga,
} from './type/userUsecaseSaga/personalInfoPageSaga';

import { Posthog } from "../modules/posthog"

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* WatchAppSaga() {
  try {
    console.log('[app][saga] 1');
    yield all([
      // 1.
      watchSystemInitSaga(),
      watchSystemUseCaseSaga(),
      watchLoginPageSaga(),
      watchIndexPageSaga(),
      watchPersonalInfoPageSaga(),
      //2.
      initSaga(),
    ]);

    console.log('[app][saga] 3');
  } catch (error) {
    // yield catchSagaError(error);
    console.error('error', error);
  }
}

function* watchSystemUseCaseSaga() {
  console.log('[app][saga] 1.4');
  yield takeLatest(
    SystemCaseActions.SystemCountdownSaga.type,
    errorFallback,
    systemCountdownSaga
  );
  yield takeLatest(
    SystemCaseActions.SystemRefreshableCountdownSaga.type,
    errorFallback,
    systemRefreshableCountdownSaga
  );
}

function* initSaga() {
  // const androidAPPInfo = getAppInfo();
  // if(androidAPPInfo.token !== "") {
  //   console.log("[app][saga] 2")
  //   yield put(SystemCaseActions.InitSaga());
  // }
  yield call(Posthog.init, {});
  yield put(PersonalInfoPageSagaActions.system.init());

}
