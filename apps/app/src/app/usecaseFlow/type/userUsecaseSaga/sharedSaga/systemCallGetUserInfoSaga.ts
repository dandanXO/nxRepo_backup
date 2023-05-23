import { GetUserInfoServiceResponse } from '../../../../api/userService/GetUserInfoServiceResponse';
import { call, put, select } from 'redux-saga/effects';
import { Service } from '../../../../api';
import { indexPageSlice } from '../../../../reduxStore/indexPageSlice';
import { SentryModule } from '../../../../modules/sentry';
import { getToken } from '../../../../modules/querystring/getToken';
import { RootState } from '../../../../reduxStore';
import { Action, Location } from 'history';
import { PagePathEnum } from '../../../../presentation/pages/PagePathEnum';
import { catchSagaError } from '../../../utils/catchSagaError';

export function* systemCallGetUserInfoSaga() {
  try {
    // NOTE: H5 - 首頁開始
    const token = getToken();
    const location: Location = yield select((state: RootState) => state.navigator.location);
    // const action: Action = yield select((state: RootState) => state.navigator.action)
    // console.log("location", location);
    // console.log("action", action);

    if (location.pathname !== PagePathEnum.LoginPage && token === '') {
      // NOTICE 登入頁不需要取得使用者資訊
      return;
    } else {
      const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
      yield put(indexPageSlice.actions.updateUserAPI(userResponse));

      // Sentry 識別登入行為
      SentryModule.userLogin(userResponse);

      return userResponse;
    }
  } catch (error) {
    yield catchSagaError(error);
    return false;
  }
}
