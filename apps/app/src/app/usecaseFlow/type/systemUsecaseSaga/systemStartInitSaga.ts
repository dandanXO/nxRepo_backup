import { all, call, put, select } from 'redux-saga/effects';
import { Service } from '../../../api';
import { appSlice } from '../../../reduxStore/appSlice';
import { GetInitServiceResponse } from '../../../api/appService/GetInitServiceResponse';
import { catchSagaError } from '../../utils/catchSagaError';
import { GetUserInfoServiceResponse } from '../../../api/userService/GetUserInfoServiceResponse';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import { systemCallGetUserInfoSaga } from '../userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { AndroidAppInfo } from '../../../modules/nativeAppInfo/persistent/androidAppInfo';
import { RootState } from '../../../reduxStore';

export function* systemStartInitSaga() {
  try {
    console.log('[app][saga] systemStartInitSaga');

    // NOTE: 是否啟用測試渠道(測試不好會出4)
    // const packageId = AndroidAppInfo.packageId;
    // console.log("[app][saga]  packageId", packageId);
    yield put(appSlice.actions.updateAndroidInfo(AndroidAppInfo));

    const packageId: string = yield select(
      (state: RootState) => state.app.androidAppInfo?.packageId
    );

    const [response, userResponse]: [
      GetInitServiceResponse,
      GetUserInfoServiceResponse
    ] = yield all([
      call(Service.AppService.getInit, { packageId }),
      // call(Service.UserService.GetUserInfoService, {}),
      systemCallGetUserInfoSaga(),
    ]);

    // yield put(appSlice.actions.updateInit(response));
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));
    console.log('[app][saga][Service] AppService.getInit.response', response);
    console.log(
      '[app][saga][Service] AppService.UserService.GetUserInfoService',
      userResponse
    );

    // const callGetInitTask:Task = yield fork(callGetInit, packageId)
    // const callGetUserInfoTask:Task = yield fork(callGetUserInfo)
    // yield take(SystemCaseActions.Cancel.InitSaga.type);
    // yield cancel(callGetInitTask);
    // yield cancel(callGetUserInfoTask);

    console.log('[app][saga] systemStartInitSaga');
    yield put(appSlice.actions.init(null));
  } catch (error) {
    // NOTE: 這邊也能收到其他 action error
    yield catchSagaError(error);
  }
}

function* callGetInit(packageId: string) {
  const response: GetInitServiceResponse = yield call(
    Service.AppService.getInit,
    { packageId }
  );
  yield put(appSlice.actions.updateInit(response));
}
