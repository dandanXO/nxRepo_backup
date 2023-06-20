// NOTE: Action: UserApplyProduct
import { all, call, fork, put, select } from 'redux-saga/effects';

import { Service } from '../../../../api';
import { GetIndexResponse } from '../../../../api/indexService/GetIndexResponse';
import { GetOpenIndexResponse } from '../../../../api/indexService/GetOpenIndexResponse';
import { RISK_CONTROL_STATE } from '../../../../domain/risk/RISK_CONTROL_STATE';
import { USER_AUTH_STATE } from '../../../../domain/user/USER_AUTH_STATE';
import { getToken } from '../../../../modules/querystring/getToken';
import { RootState } from '../../../../reduxStore';
import { InitialState, indexPageSlice } from '../../../../reduxStore/indexPageSlice';
import { SystemCaseActions } from '../../../../usecaseFlow/type/systemUsecaseSaga/systemCaseActions';
import { systemCallGetUserInfoSaga } from '../../../../usecaseFlow/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { systemCountdownManagerSaga } from './systemCountdownManagerSaga';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';

export function* userViewIndexPageSaga(action: any) {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    yield put(loadingSlice.actions.updatePageLoading(true));
   
    // console.log('[app][saga] userViewIndexPageSaga');

    // const token: string = yield select((state: RootState) => state.app.token);
    // const token = getToken();

    // if(!token) {
    // console.log("[APP][MODE]: InAndroid Mode")
    // NOTICE: App Mode: InAndroid Mode
    // TODO: get token from querystring
    // const querystringToken = getToken();
    // } else {
    // console.log("[APP][MODE]: Web")
    // NOTICE: App Mode: Web
    // }

    yield call(systemCallGetUserInfoSaga);

    const status: number = yield select((state: RootState) => state.indexPage.user.state);

    // NOTE: 使用者尚未認證
    if (status === USER_AUTH_STATE.ready) {
      const packageID: string = yield select((state: RootState) => state.app.androidAppInfo?.packageId);
      const openIndexResponse: GetOpenIndexResponse = yield call(Service.IndexService.getOpenIndex, {
        packageId: packageID,
      });
      yield put(indexPageSlice.actions.updateOpenAPI(openIndexResponse));
    } else {
      // NOTE: 使用者有進行過認證
      const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {});
      yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));

      // NOTE: 是否系統執行非同步 - 倒數計時
      yield call(systemCountdownManagerSaga);
    }
  } catch (error) {
    yield catchSagaError(error);
  } finally {
      yield put(loadingSlice.actions.updatePageLoading(false));
  }
}
