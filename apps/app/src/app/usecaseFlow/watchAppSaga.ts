import { all } from 'redux-saga/effects';
import { watchSystemInitSaga } from './watchSaga/watchSystemInitSaga';
import { watchSystemUseCaseSaga } from './watchSaga/watchSystemUseCaseSaga';
import { watchLoginPageSaga } from '../presentation/pages/LoginPage/userUsecaseSaga/watchLoginPageSaga';
import { watchIndexPageSaga } from '../presentation/pages/IndexPage/userUsecaseSaga/watchIndexPageSaga';
import { watchPersonalInfoPageSaga } from '../presentation/pages/PersonalInfoPage/userUsecaseSaga/watchPersonalInfoPageSaga';
import {
  runSystemInitSaga,
} from './watchSaga/watchSystemInitWebviewAndH5Saga';
import {catchSagaError} from "./utils/catchSagaError";

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* WatchAppSaga() {
  try {
    console.log('[app][saga] 1');
    yield all([
      // NOTICE: run init
      runSystemInitSaga(),
      // NOTICE: watch common
      watchSystemInitSaga(),
      watchSystemUseCaseSaga(),
      // NOTICE: watch pages
      watchLoginPageSaga(),
      watchIndexPageSaga(),
      watchPersonalInfoPageSaga(),
    ]);
    console.log('[app][saga] 3');
  } catch (error) {
    yield catchSagaError(error);
  }
}
