import { call, take } from 'redux-saga/effects';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { systemStartInitSaga } from '../type/systemUsecaseSaga/systemStartInitSaga';

export function* watchSystemInitSaga() {
  // console.log('[app][saga] 1.1');
  // console.log('[app][saga] debug.watchSystemInitSaga');
  // console.log('[app][saga] 接收初始化');
  yield take(SystemCaseActions.InitSaga.type);

  // console.log('[app][saga] 開始初始化');

  yield call(systemStartInitSaga);

  // console.log('[app][saga] 完成初始化');
}
