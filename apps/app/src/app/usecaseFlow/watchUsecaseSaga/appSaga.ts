import {takeLatest} from "redux-saga/effects";
import {userViewIndexPageSaga} from "../usecaseSaga/userViewIndexPageSaga";
import {userApplyProductsSaga} from "../usecaseSaga/userApplyProductsSaga";
import {userReacquireCreditSaga} from "../usecaseSaga/userReacquireCreditSaga";
import {systemCountdownSaga} from "../usecaseSaga/systemUsecaseSaga/systemCountdownSaga";
import {systemRefreshableCountdownSata} from "../usecaseSaga/systemUsecaseSaga/systemRefreshableCountdownSata";
import {UseCaseActions} from "../usecaseActions/useCaseActions";
import {SystemCaseActions} from "../usecaseActions/systemCaseActions";
import {systemInitSaga} from "../usecaseSaga/systemUsecaseSaga/systemInitSaga";

export function* AppSaga() {
  // yield all([
  //   userViewIndexPageSaga,
  // ])
  // NOTICE: 暫時註解變成 stubbing mode
  // yield userViewIndexPageSaga();
  yield takeLatest(SystemCaseActions.InitSaga, systemInitSaga);
  yield takeLatest(UseCaseActions.UserViewIndexPageAction.type, userViewIndexPageSaga);
  yield takeLatest(UseCaseActions.UserApplyProductAction.type, userApplyProductsSaga)
  yield takeLatest(UseCaseActions.UserReacquireCreditAction.type, userReacquireCreditSaga)
  yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, systemCountdownSaga)
  yield takeLatest(SystemCaseActions.SystemRefreshableCountdownSata.type, systemRefreshableCountdownSata);

}
