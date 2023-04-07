import {takeLatest, put, all, fork} from "redux-saga/effects";
import {userViewIndexPageSaga} from "../usecaseSaga/userUsecaseSaga/userViewIndexPageSaga";
import {userApplyProductsSaga} from "../usecaseSaga/userUsecaseSaga/userApplyProductsSaga";
import {userReacquireCreditSaga} from "../usecaseSaga/userUsecaseSaga/userReacquireCreditSaga";
import {systemCountdownSaga} from "../usecaseSaga/systemUsecaseSaga/systemCountdownSaga";
import {systemRefreshableCountdownSata} from "../usecaseSaga/systemUsecaseSaga/systemRefreshableCountdownSata";
import {UseCaseActions} from "../usecaseActions/useCaseActions";
import {SystemCaseActions} from "../usecaseActions/systemCaseActions";
import {systemInitSaga} from "../usecaseSaga/systemUsecaseSaga/systemInitSaga";

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
