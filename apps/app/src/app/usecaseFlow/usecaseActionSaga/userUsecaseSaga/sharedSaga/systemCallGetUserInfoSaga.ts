import { GetUserInfoServiceResponse } from '../../../../api/userService/GetUserInfoServiceResponse';
import { call, put } from 'redux-saga/effects';
import { Service } from '../../../../api';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import * as Sentry from '@sentry/react';

export function* systemCallGetUserInfoSaga() {
  function getUserStatusName(status: number) {
    return ['未認證', '通過認證', '審核中', '審核拒絕'][status];
  }
  try {
    const userResponse: GetUserInfoServiceResponse = yield call(
      Service.UserService.GetUserInfoService,
      {}
    );

    yield put(indexPageSlice.actions.updateUserAPI(userResponse));

    const userInfo = {
      'user.demoAccount': userResponse.demoAccount,
      'user.phoneNo': userResponse.userName,
      'user.organic': userResponse.organic,
      'user.oldUser': userResponse.oldUser,
      'user.status': getUserStatusName(userResponse.status),
      'user.needUpdateKyc': userResponse.needUpdateKyc,
    };
    // console.log('userInfo', userInfo);
    Sentry.setContext('Custom - User Info', userInfo);

    const accountInfo = {
      // NOTE: 帳號個人資訊
      username: userResponse.userName,
    };
    // console.log("[sentry] accountInfo", accountInfo);
    Sentry.setUser(accountInfo);

    return userResponse;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
