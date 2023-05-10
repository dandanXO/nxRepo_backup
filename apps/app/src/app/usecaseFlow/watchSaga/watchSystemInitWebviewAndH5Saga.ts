import { call, put } from 'redux-saga/effects';
import { Posthog } from '../../modules/posthog';
import { PersonalInfoPageSagaActions } from '../type/userUsecaseSaga/personalInfoPageSaga';

export function* watchSystemInitWebviewAndH5Saga() {
  // const androidAPPInfo = getAppInfo();
  // if(androidAPPInfo.token !== "") {
  //   console.log("[app][saga] 2")
  //   yield put(SystemCaseActions.InitSaga());
  // }
  yield call(Posthog.init, {});
  yield put(PersonalInfoPageSagaActions.system.init());
}
