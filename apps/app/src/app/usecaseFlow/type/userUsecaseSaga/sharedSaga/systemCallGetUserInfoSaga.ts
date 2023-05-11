import { GetUserInfoServiceResponse } from '../../../../api/userService/GetUserInfoServiceResponse';
import { call, put } from 'redux-saga/effects';
import { Service } from '../../../../api';
import { indexPageSlice } from '../../../../reduxStore/indexPageSlice';
import {SentryModule} from "../../../../modules/sentry";

export function* systemCallGetUserInfoSaga() {

  try {
    const userResponse: GetUserInfoServiceResponse = yield call(
      Service.UserService.GetUserInfoService,
      {}
    );
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));

    SentryModule.userLogin(userResponse);

    return userResponse;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
