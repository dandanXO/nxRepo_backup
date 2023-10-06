import { ORDER_STATE } from 'apps/app/src/app/domain/order/ORDER_STATE';
import { put, select } from 'redux-saga/effects';

import { RISK_CONTROL_STATE } from '../../../../domain/risk/RISK_CONTROL_STATE';
import { USER_AUTH_STATE } from '../../../../domain/user/USER_AUTH_STATE';
import { GetIndexResponse } from '../../../../externel/backend/indexService/GetIndexResponse';
import { RootState } from '../../../../reduxStore';
import { InitialState } from '../../../../reduxStore/indexPageSlice';
import { SystemCaseActions } from '../../../../uiFlowUsecase/type/systemUsecaseSaga/systemCaseActions';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';

export function* systemCountdownManagerSaga() {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    // NOTE: Does System need to run countdown
    const indexResponse: GetIndexResponse = yield select(
      (state: RootState) => state.indexPage.indexAPI
    );

    const { riskControl, order, user }: InitialState = yield select(
      (state: RootState) => state.indexPage
    ) as any;

    // NOTICE: 只會擇一倒數器或沒有
    if (
      // NOTE: 用戶沒通過認證 / 老客獲取額度被拒
      riskControl.state === RISK_CONTROL_STATE.order_reject ||
      // NOTE: 老客沒借款額度
      riskControl.state === RISK_CONTROL_STATE.empty_quota
    ) {
      console.log('riskControl.state', riskControl.state, RISK_CONTROL_STATE);
      // NOTICE: 不能重刷，需等待重刷時間
      yield put(
        SystemCaseActions.SystemRefreshableCountdownSaga(
          indexResponse.refreshableUntil
        )
      );
      // NOTICE: 清掉風控額度到數時間
      yield put(SystemCaseActions.SystemCountdownSaga(''));
    } else {
      // NOTICE: 可以重刷
      if (
        user.state !== USER_AUTH_STATE.reject &&
        user.state !== USER_AUTH_STATE.authing &&
        order.state !== ORDER_STATE.hasOverdueOrder &&
        // NOTE: 沒有額度 (包含連續３次額度被拒)
        indexResponse.noQuotaBalance !== true
      ) {
        yield put(
          SystemCaseActions.SystemCountdownSaga(indexResponse?.offerExpireTime)
        );
      }
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
