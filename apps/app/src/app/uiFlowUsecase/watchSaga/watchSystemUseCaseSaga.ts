import {
  ROUTER_CALL_HISTORY_METHOD,
  ROUTER_ON_LOCATION_CHANGED,
} from '@lagunovsky/redux-react-router';
import { takeLatest } from 'redux-saga/effects';

import { systemCountdownSaga } from '../../ui/pages/IndexPage/userUsecaseSaga/systemCountdownSaga';
import { systemRefreshableCountdownSaga } from '../../ui/pages/IndexPage/userUsecaseSaga/systemRefreshableCountdownSaga';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { systemFetchCouponSaga } from '../type/systemUsecaseSaga/systemFetchCouponSaga';
import { errorFallback } from '../utils/errorFallback';
import { routerOnLocationChangedSaga } from './routerOnLocationChangedSaga';

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
  yield takeLatest(
    SystemCaseActions.SystemFetchCouponSaga.type,
    errorFallback,
    systemFetchCouponSaga
  );

  yield takeLatest(
    ROUTER_CALL_HISTORY_METHOD,
    errorFallback,
    routerCallHistoryMethodSaga
  );
  yield takeLatest(
    ROUTER_ON_LOCATION_CHANGED,
    errorFallback,
    routerOnLocationChangedSaga
  );
  console.log('[app][saga] 1.4 end');
}

function* routerCallHistoryMethodSaga(action: any) {
  console.log('routerCallHistoryMethodSaga.action', action);
  yield true;
}
