// NOTE: Action: UserApplyProduct
import {call, put, select} from 'redux-saga/effects';

import {Service} from '../../../../externel/backend';
import {GetIndexResponse} from '../../../../externel/backend/indexService/GetIndexResponse';
import {GetOpenIndexResponse} from '../../../../externel/backend/indexService/GetOpenIndexResponse';
import {USER_AUTH_STATE} from '../../../../domain/user/USER_AUTH_STATE';
import {RootState} from '../../../../reduxStore';
import {catchSagaError} from '../../../utils/catchSagaError';
import {indexPageSlice} from 'apps/app/src/app/reduxStore/indexPageSlice';

export function* systemGetIndexPageSaga() {
    // NOTICE: 防止錯誤後無法重新 watch
    try {
        const status: number = yield select((state: RootState) => state.indexPage.user.state);

        // NOTE: 使用者尚未認證
        if (status === USER_AUTH_STATE.ready) {
            const packageId: string = yield select((state: RootState) => state.app.appID);
            console.log("packageId", packageId);
            const openIndexResponse: GetOpenIndexResponse = yield call(Service.IndexService.getOpenIndex, {
                packageId,
            });
            yield put(indexPageSlice.actions.updateOpenAPI(openIndexResponse));
        } else {
            // NOTE: 使用者有進行過認證
            const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {});
            yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));
        }

    } catch (error) {
        yield catchSagaError(error);
    }
}
