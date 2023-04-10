import {takeLatest, put, all, fork} from "redux-saga/effects";
import {userViewIndexPageSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userViewIndexPageSaga";
import {userApplyProductsSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userApplyProductsSaga";
import {userReacquireCreditSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userReacquireCreditSaga";
import {systemCountdownSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemCountdownSaga";
import {systemRefreshableCountdownSata} from "../usecaseActionSaga/systemUsecaseSaga/systemRefreshableCountdownSata";
import {UseCaseActions} from "../usecaseAction/useCaseActions";
import {SystemCaseActions} from "../usecaseAction/systemCaseActions";
import {systemInitSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemInitSaga";
import {catchSagaError} from "../utils/catchSagaError";

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* AppSaga() {
  try {
    // yield all([
    // userViewIndexPageSaga,
    // systemInitSaga
    // ])
    // NOTE: 單獨這行會 stay this line
    // yield systemInitSaga(null);

    yield takeLatest(SystemCaseActions.InitSaga.type, systemInitSaga);
    yield takeLatest(UseCaseActions.UserViewIndexPageAction.type, userViewIndexPageSaga);
    yield takeLatest(UseCaseActions.UserApplyProductAction.type, userApplyProductsSaga)
    yield takeLatest(UseCaseActions.UserReacquireCreditAction.type, userReacquireCreditSaga)
    yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, systemCountdownSaga)
    yield takeLatest(SystemCaseActions.SystemRefreshableCountdownSata.type, systemRefreshableCountdownSata);

    // NOTICE: flow
    yield put(SystemCaseActions.InitSaga());

  } catch (error) {
    // yield catchSagaError(error);
    console.error("error", error);
  }
}
