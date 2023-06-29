import { push } from '@lagunovsky/redux-react-router';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, take, race } from 'redux-saga/effects';

import { APIV3, LoginResponse } from '../../../../api/rtk';
import { AppRunningModeEnum, appSlice } from '../../../../reduxStore/appSlice';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { PagePathEnum } from '../../PagePathEnum';
import { UserLoginActionPayload } from './index';

export function* userLoginSaga(action: PayloadAction<UserLoginActionPayload>) {
  try {
    // console.log("userLoginSaga")
    yield put(
      APIV3.endpoints.login.initiate({
        phoneNo: action.payload.phone,
        msgCode: action.payload.otp,
      }) as any
    );
    const {success, failure} = yield race({
      success: take(APIV3.endpoints.login.matchFulfilled),
      failure: take(APIV3.endpoints.login.matchRejected),
    })
    if(success) {
      if (success.payload.token) {
        const token = success.payload.token;
        // console.log("success.payload", success.payload.token)
        yield put(appSlice.actions.updateMode(AppRunningModeEnum.WEB));
        yield put(appSlice.actions.updateToken(token));
        yield put(push(`${PagePathEnum.IndexPage}?token=${token}`));
      }
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
