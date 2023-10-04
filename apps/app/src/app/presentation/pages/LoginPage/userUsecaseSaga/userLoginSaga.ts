import {push, ROUTER_ON_LOCATION_CHANGED} from '@lagunovsky/redux-react-router';
import {PayloadAction} from '@reduxjs/toolkit';
import {put, race, take} from 'redux-saga/effects';

import {APIV3} from '../../../../api/rtk';
import {AppRunningModeEnum, appSlice} from '../../../../reduxStore/appSlice';
import {catchSagaError} from '../../../../usecaseFlow/utils/catchSagaError';
import {PageOrModalPathEnum} from '../../../PageOrModalPathEnum';
import {UserLoginActionPayload} from './index';
import {loginSlice} from 'apps/app/src/app/reduxStore/loginSlice';
import {setTokenToLocalStorage} from "../../../../persistant/getToken";
import {appInfoPersistence} from "../../../../persistant/appInfo";
import {userInfoPersistence} from "../../../../persistant/userInfo";

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
        yield put(appSlice.actions.updateMode(AppRunningModeEnum.WEB));
        // yield put(appSlice.actions.updateToken(token));
        setTokenToLocalStorage(token);
        userInfoPersistence.phone = action.payload.phone;

        yield put(push(`${PageOrModalPathEnum.IndexPage}?token=${token}`));
        yield take(ROUTER_ON_LOCATION_CHANGED);
      }
    }

    if(failure){
        yield put(loginSlice.actions.updateResendSeconds(0))
    }

  } catch (error) {
    yield catchSagaError(error);
  }
}
