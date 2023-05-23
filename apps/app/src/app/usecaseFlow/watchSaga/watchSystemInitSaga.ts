import { call, take } from 'redux-saga/effects';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { systemStartInitSaga } from '../type/systemUsecaseSaga/systemStartInitSaga';
import { catchSagaError } from '../utils/catchSagaError';

export function* watchSystemInitSaga() {
  try {
    console.log('[app][saga] 1.1');
    yield take(SystemCaseActions.InitSaga.type);

    // console.log('[app][saga] 開始初始化');
    yield call(systemStartInitSaga);
    // console.log('[app][saga] 完成初始化');

    console.log('[app][saga] 1.1 end');
  } catch (error) {
    // NOTE: prevent parent broken
    console.log('error', error);
    yield catchSagaError(error);
  }
}
