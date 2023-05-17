import {put, select, takeLatest} from 'redux-saga/effects';
import {SystemCaseActions} from '../type/systemUsecaseSaga/systemCaseActions';
import {errorFallback} from '../utils/errorFallback';
import {systemCountdownSaga} from '../../presentation/pages/IndexPage/userUsecaseSaga/systemCountdownSaga';
import {
  systemRefreshableCountdownSaga
} from '../../presentation/pages/IndexPage/userUsecaseSaga/systemRefreshableCountdownSaga';
import {LocationChangeAction, ROUTER_ON_LOCATION_CHANGED, ROUTER_CALL_HISTORY_METHOD} from "@lagunovsky/redux-react-router";
import {PagePathEnum} from "../../presentation/pages/PagePathEnum";
import {RootState} from "../../reduxStore";
import {USER_AUTH_STATE} from "../../domain/user/USER_AUTH_STATE";
import {IndexPageSagaAction} from "../../presentation/pages/IndexPage/userUsecaseSaga/indexPageActions";

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

  yield takeLatest(ROUTER_ON_LOCATION_CHANGED, errorFallback, routerOnLocationChangedSaga)
  yield takeLatest(ROUTER_CALL_HISTORY_METHOD, errorFallback, routerCallHistoryMethodSaga)
  console.log('[app][saga] 1.4 end');
}

function *routerOnLocationChangedSaga(action: LocationChangeAction) {
  const userStatus: USER_AUTH_STATE = yield select((state: RootState) => state.indexPage.user.state);
  if(action?.payload.location.pathname === PagePathEnum.RepaymentPage && userStatus === USER_AUTH_STATE.ready) {
    yield put(IndexPageSagaAction.user.authenticateSaga());
  }
}

function *routerCallHistoryMethodSaga(action: any) {
  console.log("routerCallHistoryMethodSaga.action", action);
  yield true
}
