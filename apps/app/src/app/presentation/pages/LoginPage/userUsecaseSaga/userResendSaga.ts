import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put } from 'redux-saga/effects';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import {
  LoginPageUseCaseActionsInstance,
  UserResendSecondsActionPayload,
} from './index';
import { loginSlice } from '../../../../reduxStore/loginSlice';

export function* userResendSaga(
  action: PayloadAction<UserResendSecondsActionPayload>
) {
  try {
    let resendSeconds = Number(action.payload.resendSeconds);
    yield put(loginSlice.actions.updateResendSeconds(resendSeconds));

    if (resendSeconds !== 0) {
      yield delay(1000);
      resendSeconds -= 1;
      yield put(
        LoginPageUseCaseActionsInstance.system.resendSeconds({ resendSeconds })
      );
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}