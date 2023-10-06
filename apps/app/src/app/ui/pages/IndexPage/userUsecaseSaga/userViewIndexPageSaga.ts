// NOTE: Action: UserApplyProduct
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import { call, put, select } from 'redux-saga/effects';

import { getToken } from '../../../../application/getToken';
// import { Service } from '../../../../api';
// import { GetIndexResponse } from '../../../../api/indexService/GetIndexResponse';
// import { GetOpenIndexResponse } from '../../../../api/indexService/GetOpenIndexResponse';
// import { RISK_CONTROL_STATE } from '../../../../domain/risk/RISK_CONTROL_STATE';
import { USER_AUTH_STATE } from '../../../../domain/user/USER_AUTH_STATE';
import { RootState } from '../../../../reduxStore';
import { systemFetchCouponSaga } from '../../../../uiFlowUsecase/type/systemUsecaseSaga/systemFetchCouponSaga';
import { systemCallGetUserInfoSaga } from '../../../../uiFlowUsecase/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { systemGetIndexPageSaga } from '../../../../uiFlowUsecase/type/userUsecaseSaga/sharedSaga/systemGetIndexPageSaga';
// import { InitialState, indexPageSlice } from '../../../../reduxStore/indexPageSlice';
// import { SystemCaseActions } from '../../../../usecaseFlow/type/systemUsecaseSaga/systemCaseActions';
// import { systemCallGetUserInfoSaga } from '../../../../usecaseFlow/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';
import { systemCountdownManagerSaga } from './systemCountdownManagerSaga';

export function* userViewIndexPageSaga(action: any) {
  console.log('userViewIndexPageSaga');
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    if (getToken() === '') {
      // console.log('missing token');
      // alertModal('missing token2');
      return;
    }
    yield put(loadingSlice.actions.updatePageLoading(true));
    yield call(systemCallGetUserInfoSaga);
    yield call(systemGetIndexPageSaga);
    yield call(systemFetchCouponSaga);

    const status: number = yield select(
      (state: RootState) => state.indexPage.user.state
    );
    if (status !== USER_AUTH_STATE.ready) {
      // NOTE: 是否系統執行非同步 - 倒數計時
      yield call(systemCountdownManagerSaga);
    }
  } catch (error) {
    yield catchSagaError(error);
  } finally {
    yield put(loadingSlice.actions.updatePageLoading(false));
  }
}
