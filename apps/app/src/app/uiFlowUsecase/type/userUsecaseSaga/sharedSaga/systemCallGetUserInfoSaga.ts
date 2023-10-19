import { Location } from 'history';
import { call, put, select } from 'redux-saga/effects';

import { getToken } from '../../../../application/getToken';
import { Service } from '../../../../externel/backend';
import { GetUserInfoServiceResponse } from '../../../../externel/backend/userService/GetUserInfoServiceResponse';
import { RootState } from '../../../../reduxStore';
import { indexPageSlice } from '../../../../reduxStore/indexPageSlice';
import { PageOrModalPathEnum } from '../../../../ui/PageOrModalPathEnum';
import { MonitorUsecaseFlow } from '../../../../uiFlowUsecaseMoniter';
import { catchSagaError } from '../../../utils/catchSagaError';

export function* systemCallGetUserInfoSaga() {
  try {
    // NOTE: H5 - 首頁開始
    const token = getToken();
    const location: Location = yield select(
      (state: RootState) => state.navigator.location
    );
    // const action: Action = yield select((state: RootState) => state.navigator.action)
    // console.log("location", location);
    // console.log("action", action);

    if (location.pathname === PageOrModalPathEnum.LoginPage && token === '') {
      // NOTICE 登入頁不需要取得使用者資訊
      return;
    } else {
      console.log('systemCallGetUserInfoSaga');

      const userResponse: GetUserInfoServiceResponse = yield call(
        Service.UserService.GetUserInfoService,
        {}
      );
      console.log('userResponse2', userResponse);
      yield put(indexPageSlice.actions.updateUserAPI(userResponse));

      // Sentry 識別登入行為
      MonitorUsecaseFlow.userLogin(userResponse);

      return userResponse;
    }
  } catch (error) {
    // console.log("test error2", error)
    yield catchSagaError(error);
    return false;
  }
}