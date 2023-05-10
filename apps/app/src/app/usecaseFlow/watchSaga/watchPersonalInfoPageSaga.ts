import { takeLatest } from 'redux-saga/effects';
import { errorFallback } from '../utils/errorFallback';
import { systemCallGetUserInfoSaga } from '../type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { PersonalInfoPageSagaActions } from '../type/userUsecaseSaga/personalInfoPageSaga';

export function* watchPersonalInfoPageSaga() {
  console.log('[app][saga] 1.3');

  yield takeLatest(
    PersonalInfoPageSagaActions.system.init.type,
    errorFallback,
    systemCallGetUserInfoSaga
  );
}
