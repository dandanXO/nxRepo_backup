import { takeLatest } from 'redux-saga/effects';
import { errorFallback } from '../../../../usecaseFlow/utils/errorFallback';
import { systemCallGetUserInfoSaga } from '../../../../usecaseFlow/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { PersonalInfoPageSagaActions } from './index';
import { userLogoutSaga } from './userLogoutSaga';

export function* watchPersonalInfoPageSaga() {
  console.log('[app][saga] 1.3');

  yield takeLatest(PersonalInfoPageSagaActions.system.init.type, errorFallback, systemCallGetUserInfoSaga);

  yield takeLatest(PersonalInfoPageSagaActions.user.logout.type, errorFallback, userLogoutSaga);
}
