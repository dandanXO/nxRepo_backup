import { takeLatest } from 'redux-saga/effects';

import { RepaymentPageSagaActions } from '.';
import { errorFallback } from '../../../../uiFlowUsecase/utils/errorFallback';
import { userRepaymentPageSaga } from './userRpaymentPageSaga';

export function* watchRepaymentPageSaga() {
  yield takeLatest(
    RepaymentPageSagaActions.user.pageAction.type,
    errorFallback,
    userRepaymentPageSaga
  );
}
