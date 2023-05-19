import { all, call, put, select } from 'redux-saga/effects';
import { Service } from '../../../api';
import { appSlice } from '../../../reduxStore/appSlice';
import { GetInitServiceResponse } from '../../../api/appService/GetInitServiceResponse';
import { catchSagaError } from '../../utils/catchSagaError';
import { GetUserInfoServiceResponse } from '../../../api/userService/GetUserInfoServiceResponse';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import { systemCallGetUserInfoSaga } from '../userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { NativeAppInfo } from '../../../persistant/nativeAppInfo';
import { RootState } from '../../../reduxStore';
import {getToken} from "../../../modules/querystring/getToken";
import {alertModal} from "../../../api/base/alertModal";

export function* systemStartInitSaga() {
  // try {
    console.log('[app][saga] systemStartInitSaga');

    // const packageId = AndroidAppInfo.packageId;
    // console.log("[app][saga]  packageId", packageId);
    yield put(appSlice.actions.updateAndroidInfo(NativeAppInfo));

    const packageId: string = yield select(
      (state: RootState) => state.app.androidAppInfo?.packageId
    );

    if(getToken() === "") {
      console.log("missing token")
      alertModal("missing token")
    }

    const [response, userResponse]: [
      GetInitServiceResponse,
      GetUserInfoServiceResponse
    ] = yield all([
      call(Service.AppService.getInit, { packageId }),
      // call(Service.UserService.GetUserInfoService, {}),
      systemCallGetUserInfoSaga(),
    ]);

    yield put(appSlice.actions.updateInit(response));
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));
    console.log('[app][saga][Service] AppService.getInit.response', response);
    console.log(
      '[app][saga][Service] AppService.UserService.GetUserInfoService.userResponse',
      userResponse
    );

    // const callGetInitTask:Task = yield fork(callGetInit, packageId)
    // const callGetUserInfoTask:Task = yield fork(callGetUserInfo)
    // yield take(SystemCaseActions.Cancel.InitSaga.type);
    // yield cancel(callGetInitTask);
    // yield cancel(callGetUserInfoTask);

    console.log('[app][saga] systemStartInitSaga');

    yield put(appSlice.actions.init(true));

  // } catch (error) {
  //   console.log("錯誤了", error)
    // NOTE: 這邊也能收到其他 action error
    // yield catchSagaError(error);
  // }
}

function* callGetInit(packageId: string) {
  const response: GetInitServiceResponse = yield call(
    Service.AppService.getInit,
    { packageId }
  );
  yield put(appSlice.actions.updateInit(response));
}
