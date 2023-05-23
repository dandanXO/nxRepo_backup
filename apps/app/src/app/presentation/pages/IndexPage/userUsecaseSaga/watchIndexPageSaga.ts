import { takeEvery, takeLatest } from 'redux-saga/effects';

import { errorFallback } from '../../../../usecaseFlow/utils/errorFallback';
import { IndexPageSagaAction } from './indexPageActions';
import { userApplyProductsSaga } from './userApplyProductsSaga';
import { userAuthenticateSaga } from './userAuthenticateSaga';
import { userReacquireCreditSaga } from './userReacquireCreditSaga';
import { userViewIndexPageSaga } from './userViewIndexPageSaga';

export function* watchIndexPageSaga() {
  console.log('[app][saga] 1.2');

  yield takeEvery(IndexPageSagaAction.user.viewIndexPageAction.type, errorFallback, userViewIndexPageSaga);
  yield takeLatest(IndexPageSagaAction.user.applyProductAction.type, errorFallback, userApplyProductsSaga);
  yield takeLatest(IndexPageSagaAction.user.reacquireCreditAction.type, errorFallback, userReacquireCreditSaga);
  yield takeLatest(IndexPageSagaAction.user.authenticateSaga.type, errorFallback, userAuthenticateSaga);
}
