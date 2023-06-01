import { Location } from 'history';
import { all, call, fork, put, select } from 'redux-saga/effects';

import { Service } from '../../api';
import { alertModal } from '../../api/base/alertModal';
import { GetUserInfoServiceResponse } from '../../api/userService/GetUserInfoServiceResponse';
import { Posthog } from '../../modules/posthog';
import { getToken } from '../../modules/querystring/getToken';
import { SentryModule } from '../../modules/sentry';
import { AppModeEnum, AppModeModel } from '../../persistant/appModeModel';
import { AppGlobal, AppTempFlag, NativeAppInfo } from '../../persistant/nativeAppInfo';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { RootState, appStore } from '../../reduxStore';
import { appSlice } from '../../reduxStore/appSlice';
import { indexPageSlice } from '../../reduxStore/indexPageSlice';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { catchSagaError } from '../utils/catchSagaError';

export function* runSystemInitSaga() {
  try {
    // if(AppModeModel.getMode()) {
    if (AppGlobal.mode !== 'None') {
      console.log('[app] 已初始化');
      return;
    }

    console.log('[app] 開始初始化');

    if (NativeAppInfo.mode === 'Webview') {
      const location: Location = yield select((state: RootState) => state.navigator.location);

      // NOTICE: Setting AppGlobal.mode
      if (location.pathname === PagePathEnum.IndexPage) {
        // NOTICE: IndexWebview
        // AppModeModel.setMode(AppModeEnum.IndexWebview);
        AppGlobal.mode = AppModeEnum.IndexWebview;
        console.log('AppGlobal.mode = AppModeEnum.IndexWebview;');

        // NOTE: Posthog
        yield call(Posthog.init);
      } else {
        // NOTICE: SimpleWebView
        // AppModeModel.setMode(AppModeEnum.SimpleWebView)
        AppGlobal.mode = AppModeEnum.SimpleWebView;
        console.log('AppGlobal.mode = AppModeEnum.SimpleWebView;');
      }

      // NOTICE: 不需要登入頁面
      if (location.pathname === PagePathEnum.IBANFinderPage) {
        //
      } else if (location.pathname === PagePathEnum.LoginPage) {
        // NOTICE: 登入頁面 (使用者輸入OTP 進行登入)
      } else {
        const token = getToken();
        // console.log("token", token);

        if (!token) {
          return alertModal('Please come with token');
        }

        // NOTICE: 直接進行登入
        // NOTICE: 還款頁面、綁卡頁面、IBAN 說明頁面 (使用 URL Querystring Token 進行登入)

        // NOTE: 取得使用者資訊
        const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
        yield put(indexPageSlice.actions.updateUserAPI(userResponse));

        // NOTE: 登入成功
        SentryModule.userLogin(userResponse);

        yield put(appSlice.actions.init(true));
      }
    } else if (NativeAppInfo.mode === 'H5') {
      // NOTICE: AppGlobal.mode = AppModeEnum.PureH5;

      // AppModeModel.setMode(AppModeEnum.PureH5)
      AppGlobal.mode = AppModeEnum.PureH5;
      console.log('AppGlobal.mode = AppModeEnum.PureH5;');

      // TODO: refactor me
      try {
        // NOTE: Posthog
        yield call(Posthog.init);
      } catch (error) {
        console.log(error);
        // NOTICE: 以下這行會導致上層 saga 中斷
        // yield catchSagaError(error);
      }

      // NOTE: Only for H5
      appStore.dispatch(SystemCaseActions.InitSaga());
    }
  } catch (error) {
    console.log(error);
    yield catchSagaError(error);
  }
}
