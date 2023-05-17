import {put, select} from "redux-saga/effects";
import {RootState} from "../../../../reduxStore";
import {RISK_CONTROL_STATE} from "../../../../domain/risk/RISK_CONTROL_STATE";
import {SystemCaseActions} from "../../../../usecaseFlow/type/systemUsecaseSaga/systemCaseActions";
import {GetIndexResponse} from "../../../../api/indexService/GetIndexResponse";
import {catchSagaError} from "../../../../usecaseFlow/utils/catchSagaError";

export function *systemMainCountdownSaga() {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    // NOTE: Does System need to run countdown
    const indexResponse: GetIndexResponse = yield select((state: RootState) => state.indexPage.indexAPI);

    const { riskControl } = yield select(
      (state: RootState) => state.indexPage
    );

    if (
      (
        // NOTE: 用戶沒通過認證
        indexResponse.riskReject === true
        // NOTE: 用戶實際沒借款額度
        || indexResponse.noQuotaBalance === true
      ) &&
      // NOTE: 用戶可刷新風控額度
      riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able
    ) {
      // NOTICE: 不能重刷，需等待重刷時間
      yield put(
        SystemCaseActions.SystemRefreshableCountdownSaga(
          indexResponse.refreshableUntil
        )
      );
    } else {
      // NOTICE: 可以重刷
      yield put(
        SystemCaseActions.SystemCountdownSaga(indexResponse?.offerExpireTime)
      );
    }
  } catch (error) {
    catchSagaError(error);
  }

}
