import { put, select } from 'redux-saga/effects';

import { GetIndexResponse } from '../../../../api/indexService/GetIndexResponse';
import { RISK_CONTROL_STATE } from '../../../../domain/risk/RISK_CONTROL_STATE';
import { RootState } from '../../../../reduxStore';
import { SystemCaseActions } from '../../../../usecaseFlow/type/systemUsecaseSaga/systemCaseActions';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { ORDER_STATE } from 'apps/app/src/app/domain/order/ORDER_STATE';

export function* systemMainCountdownSaga() {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    // NOTE: Does System need to run countdown
    const indexResponse: GetIndexResponse = yield select((state: RootState) => state.indexPage.indexAPI);

    const { riskControl ,order} = yield select((state: RootState) => state.indexPage);

    
    if (
      // NOTE: 用戶沒通過認證
      (indexResponse.riskReject === true ||
        // NOTE: 用戶實際沒借款額度
        indexResponse.noQuotaBalance === true) &&
      // NOTE: 用戶可刷新風控額度
      riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able
    ) {
      // NOTICE: 不能重刷，需等待重刷時間
      yield put(SystemCaseActions.SystemRefreshableCountdownSaga(indexResponse.refreshableUntil));
    } else {
      // NOTICE: 可以重刷
      if( order.state === ORDER_STATE.hasOverdueOrder) return;
      yield put(SystemCaseActions.SystemCountdownSaga(indexResponse?.offerExpireTime));
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
