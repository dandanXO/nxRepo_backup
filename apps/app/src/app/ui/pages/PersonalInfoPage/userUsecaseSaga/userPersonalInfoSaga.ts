// NOTE: Action: UserApplyProduct
import { all, call, fork, put, select } from 'redux-saga/effects';
import { systemCallGetUserInfoSaga } from '../../../../uiUsecaseFlow/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { catchSagaError } from '../../../../uiUsecaseFlow/utils/catchSagaError';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import { systemGetIndexPageSaga } from '../../../../uiUsecaseFlow/type/userUsecaseSaga/sharedSaga/systemGetIndexPageSaga';

export function* userPersonalInfoSaga(action: any) {
    try {
        yield put(loadingSlice.actions.updatePageLoading(true));

        yield call(systemCallGetUserInfoSaga);
        yield call(systemGetIndexPageSaga);


    } catch (error) {
        yield catchSagaError(error);
    } finally {
        yield put(loadingSlice.actions.updatePageLoading(false));
    }
}
