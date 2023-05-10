import { takeEvery, takeLatest } from 'redux-saga/effects';
import { errorFallback } from '../utils/errorFallback';
import { userViewIndexPageSaga } from '../type/userUsecaseSaga/indexPageSaga/userViewIndexPageSaga';
import { userApplyProductsSaga } from '../type/userUsecaseSaga/indexPageSaga/userApplyProductsSaga';
import { userReacquireCreditSaga } from '../type/userUsecaseSaga/indexPageSaga/userReacquireCreditSaga';
import { IndexPageSagaAction } from '../type/userUsecaseSaga/indexPageSaga';

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
