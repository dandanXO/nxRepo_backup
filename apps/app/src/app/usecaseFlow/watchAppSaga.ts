import { all } from 'redux-saga/effects';
import { watchSystemInitSaga } from './watchSaga/watchSystemInitSaga';
import { watchSystemUseCaseSaga } from './watchSaga/watchSystemUseCaseSaga';
import { watchLoginPageSaga } from './watchSaga/watchLoginPageSaga';
import { watchIndexPageSaga } from './watchSaga/watchIndexPageSaga';
import { watchPersonalInfoPageSaga } from './watchSaga/watchPersonalInfoPageSaga';
import { watchSystemInitWebviewAndH5Saga } from './watchSaga/watchSystemInitWebviewAndH5Saga';

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* WatchAppSaga() {
  try {
    console.log('[app][saga] 1');
    yield all([
      // NOTE: Webview, H5
      watchSystemInitWebviewAndH5Saga(),
      // NOTE: Only H5
      watchSystemInitSaga(),
      watchSystemUseCaseSaga(),
      watchLoginPageSaga(),
      watchIndexPageSaga(),
      watchPersonalInfoPageSaga(),
    ]);
    console.log('[app][saga] 3');
  } catch (error) {
    // yield catchSagaError(error);
    console.error('error', error);
  }
}
