import { PayloadAction } from '@reduxjs/toolkit';
import { Md5 } from 'ts-md5';
import { put } from 'redux-saga/effects';
import { API } from '../../../../api/rtk';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { UserLoginActionPayload } from './index';

export function* userGetOTPSaga(action: PayloadAction<UserLoginActionPayload>) {
  try {
    const BACKED_KEY = 'e330e6942a706cea2f89901e2c758443';
    const deviceCode = 'WebApp'.toLowerCase();
    const phoneNo = action.payload.phone;
    const tm = new Date().getTime();
    const firstSignSection = Md5.hashStr(`${deviceCode}${phoneNo}${tm}`);
    const sign = Md5.hashStr(`${firstSignSection}${BACKED_KEY}`);

    yield put(
      API.endpoints.getOTPCode.initiate({
        appName: '',
        deviceCode,
        phoneNo,
        sign,
        tm,
      }) as any
    );
  } catch (error) {
    yield catchSagaError(error);
  }
}
