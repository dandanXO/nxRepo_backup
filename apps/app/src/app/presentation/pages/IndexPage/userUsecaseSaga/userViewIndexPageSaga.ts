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
import { systemGetIndexPageSaga } from 'apps/app/src/app/usecaseFlow/type/userUsecaseSaga/sharedSaga/systemGetIndexPageSaga';

export function* userViewIndexPageSaga(action: any) {
    // NOTICE: 防止錯誤後無法重新 watch
    try {
        yield put(loadingSlice.actions.updatePageLoading(true));
        yield all([
            call(systemCallGetUserInfoSaga),
            call(systemGetIndexPageSaga),
        ]);

        const status: number = yield select((state: RootState) => state.indexPage.user.state);
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
