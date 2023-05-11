import { call, put } from 'redux-saga/effects';
import { Posthog } from '../../modules/posthog';
import { PersonalInfoPageSagaActions } from '../type/userUsecaseSaga/personalInfoPageSaga';
import { AndroidAppInfo } from '../../modules/nativeAppInfo/persistent/androidAppInfo';
import { appStore } from '../../reduxStore';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';

export function* watchSystemInitWebviewAndH5Saga() {
  // const androidAPPInfo = getAppInfo();
  // if(androidAPPInfo.token !== "") {
  //   console.log("[app][saga] 2")
  //   yield put(SystemCaseActions.InitSaga());
  // }

  if (AndroidAppInfo.mode === 'Webview') {
    yield put(PersonalInfoPageSagaActions.system.init());
  } else if (AndroidAppInfo.mode === 'H5') {
    yield call(Posthog.init, {});

    // NOTICE: Initializing H5 Mode
    console.log('[app][saga] 2');
    appStore.dispatch(SystemCaseActions.InitSaga());
  }
}
