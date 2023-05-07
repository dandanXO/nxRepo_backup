import { GetUserInfoServiceResponse } from '../../../../api/userService/GetUserInfoServiceResponse';
import { call, put } from 'redux-saga/effects';
import { Service } from '../../../../api';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';

export function* systemCallGetUserInfoSaga() {
  const userResponse: GetUserInfoServiceResponse = yield call(
    Service.UserService.GetUserInfoService,
    {}
  );
  yield put(indexPageSlice.actions.updateUserAPI(userResponse));

  return userResponse;
}
