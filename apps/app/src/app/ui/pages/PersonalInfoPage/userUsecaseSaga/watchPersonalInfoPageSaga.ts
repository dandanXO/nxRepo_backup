import {takeLatest} from 'redux-saga/effects';
import {errorFallback} from '../../../../uiFlowUsecase/utils/errorFallback';
import {PersonalInfoPageSagaActions} from './index';
import {userLogoutSaga} from './userLogoutSaga';
import {userPersonalInfoSaga} from './userPersonalInfoSaga';

export function* watchPersonalInfoPageSaga() {
  console.log('[app][saga] 1.3');

  yield takeLatest(PersonalInfoPageSagaActions.system.init.type, errorFallback, userPersonalInfoSaga);
  yield takeLatest(PersonalInfoPageSagaActions.user.logout.type, errorFallback, userLogoutSaga);
}
