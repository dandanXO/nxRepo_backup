import { takeLatest } from 'redux-saga/effects';

import { systemCallGetUserInfoSaga } from '../../../../usecaseFlow/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { errorFallback } from '../../../../usecaseFlow/utils/errorFallback';
import { PersonalInfoPageSagaActions } from './index';
import { userLogoutSaga } from './userLogoutSaga';

export function* watchPersonalInfoPageSaga() {
  console.log('[app][saga] 1.3');

  yield takeLatest(PersonalInfoPageSagaActions.system.init.type, errorFallback, systemCallGetUserInfoSaga);

  yield takeLatest(PersonalInfoPageSagaActions.user.logout.type, errorFallback, userLogoutSaga);
}
