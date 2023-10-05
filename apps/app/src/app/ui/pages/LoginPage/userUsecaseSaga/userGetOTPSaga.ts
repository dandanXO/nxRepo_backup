import { PayloadAction } from '@reduxjs/toolkit';
import {put, select} from 'redux-saga/effects';
import { Md5 } from 'ts-md5';

import { API } from '../../../../externel/backend/rtk';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';
import { UserLoginActionPayload } from './index';
import {alertModal} from "../../../components/alertModal";
import {NativeAppInfo} from "../../../../application/nativeAppInfo";
import queryString from "query-string";
import {appSlice} from "../../../../reduxStore/appSlice";
import {rootState} from "../../../../../../../../packages/dlh-web/src/store/root";
import {RootState} from "../../../../reduxStore";

export function* userGetOTPSaga(action: PayloadAction<UserLoginActionPayload>) {
  try {
    const BACKED_KEY = 'e330e6942a706cea2f89901e2c758443';

    // NOTICE: REFACTOR ME 這邊要給什麼
    const deviceCode = 'WebApp'.toLowerCase();

    const phoneNo = action.payload.phone;
    const tm = new Date().getTime();
    const firstSignSection = Md5.hashStr(`${deviceCode}${phoneNo}${tm}`);
    const sign = Md5.hashStr(`${firstSignSection}${BACKED_KEY}`);

    // NOTICE: REFACTOR ME 這邊要給什麼
    // const parsedQueryString = queryString.parse(window.location.search);
    // const appName = NativeAppInfo.appName || parsedQueryString['appName'] ? (parsedQueryString['appName'] as string) : null;

    // yield put(appSlice.actions.)
    const appName: string = yield select((state: RootState) => state.app.appName);

    if(!appName) {
      alertModal("AppName is null");
      return;
    }

    yield put(
      API.endpoints.getOTPCode.initiate({
        appName,
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
