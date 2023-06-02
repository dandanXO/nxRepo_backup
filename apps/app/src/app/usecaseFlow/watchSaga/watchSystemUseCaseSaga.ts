import {
  LocationChangeAction,
  ROUTER_CALL_HISTORY_METHOD,
  ROUTER_ON_LOCATION_CHANGED,
} from '@lagunovsky/redux-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';

import { USER_AUTH_STATE } from '../../domain/user/USER_AUTH_STATE';
import { IndexPageSagaAction } from '../../presentation/pages/IndexPage/userUsecaseSaga/indexPageActions';
import { systemCountdownSaga } from '../../presentation/pages/IndexPage/userUsecaseSaga/systemCountdownSaga';
import { systemRefreshableCountdownSaga } from '../../presentation/pages/IndexPage/userUsecaseSaga/systemRefreshableCountdownSaga';
import { systemFetchCouponSaga } from '../type/systemUsecaseSaga/systemFetchCouponSaga';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { RootState } from '../../reduxStore';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { errorFallback } from '../utils/errorFallback';

export function* watchSystemUseCaseSaga() {
  console.log('[app][saga] 1.4');
  yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, errorFallback, systemCountdownSaga);
  yield takeLatest(
    SystemCaseActions.SystemRefreshableCountdownSaga.type,
    errorFallback,
    systemRefreshableCountdownSaga
  );
  yield takeLatest(SystemCaseActions.SystemFetchCouponSaga.type, errorFallback, systemFetchCouponSaga);

  yield takeLatest(ROUTER_ON_LOCATION_CHANGED, errorFallback, routerOnLocationChangedSaga);
  yield takeLatest(ROUTER_CALL_HISTORY_METHOD, errorFallback, routerCallHistoryMethodSaga);
  console.log('[app][saga] 1.4 end');
}

function* routerOnLocationChangedSaga(action: LocationChangeAction) {
  console.log('Action', action);
}

function* routerCallHistoryMethodSaga(action: any) {
  console.log('routerCallHistoryMethodSaga.action', action);
  yield true;
}
