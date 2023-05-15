import { takeEvery, takeLatest } from 'redux-saga/effects';
import { errorFallback } from '../../../../usecaseFlow/utils/errorFallback';
import { userViewIndexPageSaga } from './userViewIndexPageSaga';
import { userApplyProductsSaga } from './userApplyProductsSaga';
import { userReacquireCreditSaga } from './userReacquireCreditSaga';
import { IndexPageSagaAction } from './index';

export function* watchIndexPageSaga() {
  console.log('[app][saga] 1.2');

  yield takeEvery(
    IndexPageSagaAction.user.viewIndexPageAction.type,
    errorFallback,
    userViewIndexPageSaga
  );
  yield takeLatest(
    IndexPageSagaAction.user.applyProductAction.type,
    errorFallback,
    userApplyProductsSaga
  );
  yield takeLatest(
    IndexPageSagaAction.user.reacquireCreditAction.type,
    errorFallback,
    userReacquireCreditSaga
  );
}
