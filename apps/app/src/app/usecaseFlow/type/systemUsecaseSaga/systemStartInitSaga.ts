import { all, call, put, select ,take} from 'redux-saga/effects';

import { Service } from '../../../api';
import { GetInitServiceResponse } from '../../../api/appService/GetInitServiceResponse';
import { alertModal } from '../../../api/base/alertModal';
import { GetUserInfoServiceResponse } from '../../../api/userService/GetUserInfoServiceResponse';
import { getToken } from '../../../modules/querystring/getToken';
import { NativeAppInfo } from '../../../persistant/nativeAppInfo';
import { RootState } from '../../../reduxStore';
import { appSlice } from '../../../reduxStore/appSlice';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import { catchSagaError } from '../../utils/catchSagaError';
import { systemCallGetUserInfoSaga } from '../userUsecaseSaga/sharedSaga/systemCallGetUserInfoSaga';
import { systemFetchCouponSaga } from './systemFetchCouponSaga';

export function* systemStartInitSaga() {
  // try {
  console.log('[app][saga] systemStartInitSaga');

  yield put(appSlice.actions.updateAndroidInfo(NativeAppInfo));

  const packageId: string = yield select((state: RootState) => state.app.androidAppInfo?.packageId);
  console.log("packageId", packageId);

  if (getToken() === '') {
    // console.log('missing token');
    alertModal('missing token');
    return;
  }

  const [response]: [GetInitServiceResponse] = yield all([
    call(Service.AppService.getInit, { packageId }),
  ]);

  yield put(appSlice.actions.updateInit(response));

  // refactor me
  yield put(appSlice.actions.init(true));

}

function* callGetInit(packageId: string) {
  const response: GetInitServiceResponse = yield call(Service.AppService.getInit, { packageId });
  yield put(appSlice.actions.updateInit(response));
}
