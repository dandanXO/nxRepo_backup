import { GetUserInfoServiceResponse } from '../../../../api/userService/GetUserInfoServiceResponse';
import {call, put, select} from 'redux-saga/effects';
import { Service } from '../../../../api';
import { indexPageSlice } from '../../../../reduxStore/indexPageSlice';
import { SentryModule } from '../../../../modules/sentry';
import {getToken} from "../../../../modules/location/getToken";
import {RootState} from "../../../../reduxStore";
import {Action, Location} from "history";
import {PagePathEnum} from "../../../../presentation/pages/PagePathEnum";
import {catchSagaError} from "../../../utils/catchSagaError";


export function* systemCallGetUserInfoSaga() {
  try {
    // NOTE: 還款、綁卡版
    // NOTE: 首頁開始
    const token = getToken();
    const location: Location = yield select((state: RootState) => state.navigator.location)
    // const action: Action = yield select((state: RootState) => state.navigator.action)
    // console.log("location", location);
    // console.log("action", action);

    if(location.pathname !== PagePathEnum.LoginPage && token === "") {
      return;
    } else {
      const userResponse: GetUserInfoServiceResponse = yield call(
        Service.UserService.GetUserInfoService,
        {}
      );
      yield put(indexPageSlice.actions.updateUserAPI(userResponse));

      SentryModule.userLogin(userResponse);

      return userResponse;
    }

  } catch (error) {
    yield catchSagaError(error);
    return false;
  }
}
