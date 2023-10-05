// NOTE: Action: UserApplyProduct
import { all, call, fork, put, select } from 'redux-saga/effects';
import { systemCallGetUserInfoSaga } from '../../../../uiFlowUsecase/type/userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import { systemGetIndexPageSaga } from '../../../../uiFlowUsecase/type/userUsecaseSaga/sharedSaga/systemGetIndexPageSaga';

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
