import {all, call, put, select} from 'redux-saga/effects';

import {Service} from '../../../externel';
import {GetInitServiceResponse} from '../../../externel/backend/appService/GetInitServiceResponse';
import {NativeAppInfo} from '../../../persistant/nativeAppInfo';
import {RootState} from '../../../reduxStore';
import {appSlice} from '../../../reduxStore/appSlice';

export function* systemStartInitSaga() {
  // try {
  console.log('[app][saga] systemStartInitSaga');

  yield put(appSlice.actions.updateAndroidInfo(NativeAppInfo));

  const packageId: string = yield select((state: RootState) => state.app.androidAppInfo?.packageId);
  console.log("packageId", packageId);

  // NOTE: 不需登入即可呼叫
  const [response]: [GetInitServiceResponse] = yield all([
    call(Service.AppService.getInit, { packageId }),
  ]);

  yield put(appSlice.actions.updateInit(response));

  // refactor me
  yield put(appSlice.actions.init(true));


}

// function* callGetInit(packageId: string) {
//   const response: GetInitServiceResponse = yield call(Service.AppService.getInit, { packageId });
//   yield put(appSlice.actions.updateInit(response));
// }
