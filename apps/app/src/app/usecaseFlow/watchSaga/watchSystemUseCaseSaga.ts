import { takeLatest } from 'redux-saga/effects';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { errorFallback } from '../utils/errorFallback';
import { systemCountdownSaga } from '../type/userUsecaseSaga/indexPageSaga/systemCountdownSaga';
import { systemRefreshableCountdownSaga } from '../type/userUsecaseSaga/indexPageSaga/systemRefreshableCountdownSaga';

export function* watchSystemUseCaseSaga() {
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
