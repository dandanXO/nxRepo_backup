import {takeLatest} from 'redux-saga/effects';

import {errorFallback} from '../../../../uiFlowUsecase/utils/errorFallback';
import {LoginPageUseCaseActionsInstance} from './index';
import {userGetOTPSaga} from './userGetOTPSaga';
import {userLoginSaga} from './userLoginSaga';
import {userResendSaga} from './userResendSaga';

export function* watchLoginPageSaga() {
  console.log('[app][saga] 1.3');

  // try {
  // NOTE: takeLatest 的 saga 壞過，就算裡面用 catch 之後還是無法重新啟用了. example: data.payload.token is undefined, need to use errorFallback,
  // NOTE: even use try-catch in loginPageSaga, even use try-catch in userGetOTPSaga or userLoginSaga
  // yield takeLatest(LoginPageSataActions.user.getOTP.type, userGetOTPSaga);
  // yield takeLatest(LoginPageSataActions.user.login.type, userLoginSaga);

  yield takeLatest(LoginPageUseCaseActionsInstance.user.getOTP.type, errorFallback, userGetOTPSaga);
  yield takeLatest(LoginPageUseCaseActionsInstance.user.login.type, errorFallback, userLoginSaga);
  yield takeLatest(LoginPageUseCaseActionsInstance.system.resendSeconds.type, errorFallback, userResendSaga);
  // } catch (error) {
  //   yield catchSagaError(error)
  // }
}
