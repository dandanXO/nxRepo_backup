import {takeLatest, put, all, fork, call} from "redux-saga/effects";
import {userViewIndexPageSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userViewIndexPageSaga";
import {userApplyProductsSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userApplyProductsSaga";
import {userReacquireCreditSaga} from "../usecaseActionSaga/userUsecaseSaga/indexPage/userReacquireCreditSaga";
import {systemCountdownSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemCountdownSaga";
import {systemRefreshableCountdownSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemRefreshableCountdownSaga";
import {UseCaseActions} from "../usecaseAction/useCaseActions";
import {SystemCaseActions} from "../usecaseAction/systemCaseActions";
import {systemInitSaga} from "../usecaseActionSaga/systemUsecaseSaga/systemInitSaga";

import {
  loginPageSaga,
} from "../usecaseActionSaga/userUsecaseSaga/loginPage/loginPageSaga";

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* AppSaga() {
  try {
    yield all([
      fork(systemInitSaga),
      fork(loginPageSaga),
    ])

    // yield takeLatest(LoginPageSataActions.user.getOTP.type, userGetOTPSaga);
    // yield takeLatest(LoginPageSataActions.user.login.type, userLoginSaga);
    // yield takeLatest(SystemCaseActions.InitSaga.type, systemInitSaga);

    yield takeLatest(UseCaseActions.UserViewIndexPageAction.type, userViewIndexPageSaga);
    yield takeLatest(UseCaseActions.UserApplyProductAction.type, userApplyProductsSaga)
    yield takeLatest(UseCaseActions.UserReacquireCreditAction.type, userReacquireCreditSaga)
    yield takeLatest(SystemCaseActions.SystemCountdownSaga.type, systemCountdownSaga)
    yield takeLatest(SystemCaseActions.SystemRefreshableCountdownSaga.type, systemRefreshableCountdownSaga);

    // NOTICE: flow
    // yield put(SystemCaseActions.InitSaga());

  } catch (error) {
    // yield catchSagaError(error);
    console.error("error", error);
  }
}
