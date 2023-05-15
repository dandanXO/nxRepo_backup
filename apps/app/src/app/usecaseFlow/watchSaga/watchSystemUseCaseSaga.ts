import { takeLatest } from 'redux-saga/effects';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { errorFallback } from '../utils/errorFallback';
import { systemCountdownSaga } from '../../presentation/pages/IndexPage/userUsecaseSaga/systemCountdownSaga';
import { systemRefreshableCountdownSaga } from '../../presentation/pages/IndexPage/userUsecaseSaga/systemRefreshableCountdownSaga';

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
