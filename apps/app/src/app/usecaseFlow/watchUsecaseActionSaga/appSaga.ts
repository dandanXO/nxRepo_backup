import {takeLatest, put, all, fork} from "redux-saga/effects";
import {userViewIndexPageSaga} from "../usecaseActionSaga/userUsecaseSaga/userViewIndexPageSaga";
import {userApplyProductsSaga} from "../usecaseActionSaga/userUsecaseSaga/userApplyProductsSaga";
import {userReacquireCreditSaga} from "../usecaseActionSaga/userUsecaseSaga/userReacquireCreditSaga";
import {systemCountdownSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemCountdownSaga";
import {systemRefreshableCountdownSata} from "../usecaseActionSaga/systemUsecaseSaga/systemRefreshableCountdownSata";
import {UseCaseActions} from "../usecaseAction/useCaseActions";
import {SystemCaseActions} from "../usecaseAction/systemCaseActions";
import {systemInitSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemInitSaga";

export function* AppSaga() {
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

  yield put(SystemCaseActions.InitSaga());
}
