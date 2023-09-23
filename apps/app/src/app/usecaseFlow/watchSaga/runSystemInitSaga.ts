import { Location } from 'history';
import { all, call, fork, put, select } from 'redux-saga/effects';

import { Service } from '../../api';
import { alertModal } from '../../api/base/alertModal';
import { GetUserInfoServiceResponse } from '../../api/userService/GetUserInfoServiceResponse';
// import { Posthog } from '../../modules/posthog';
import { getToken } from '../../modules/querystring/getToken';
import { SentryModule } from '../../modules/sentry';
import { NativeAppInfo } from '../../persistant/nativeAppInfo';
import { PagePathEnum } from '../../presentation/pages/PagePathEnum';
import { RootState, appStore } from '../../reduxStore';
import { appSlice } from '../../reduxStore/appSlice';
import { indexPageSlice } from '../../reduxStore/indexPageSlice';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { catchSagaError } from '../utils/catchSagaError';
import {GlobalAppMode} from "../../persistant/GlobalAppMode";
import {AppModeEnum} from "../../persistant/enum/AppModeEnum";
import {MonitorUsecaseFlow} from "../../monitorUsecaseFlow";
import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';

export function* runSystemInitSaga() {
  try {
    // if(AppModeModel.getMode()) {
    if (GlobalAppMode.mode !== 'None') {
      console.log('[app] 已初始化');
      return;
    }

    console.log('[app] 開始初始化');

    const location: Location = yield select((state: RootState) => state.navigator.location);

    if (NativeAppInfo.mode === 'Webview') {
      // NOTICE: 初始化 GlobalAppMode.mode
      if (location.pathname === PagePathEnum.IndexPage) {
        // NOTE: 用 Android APP 開啟 H5 首頁
        // AppModeModel.setMode(AppModeEnum.IndexWebview);

        GlobalAppMode.mode = AppModeEnum.IndexWebview;
        // NOTE: Posthog
        // yield call(Posthog.init);
      } else {
        // NOTE: 用 Android APP 開啟 綁卡、還款等等單一頁面
        // AppModeModel.setMode(AppModeEnum.SimpleWebView)
        GlobalAppMode.mode = AppModeEnum.SimpleWebView;
      }
    } else if (NativeAppInfo.mode === 'H5') {
      // NOTICE: AppGlobal.mode = AppModeEnum.PureH5;
      // AppModeModel.setMode(AppModeEnum.PureH5)
      GlobalAppMode.mode = AppModeEnum.PureH5;
    }

    console.log('GlobalAppMode = ' + GlobalAppMode.mode);

    if (NativeAppInfo.mode === 'Webview') {

      // NOTE: 不需要登入才能訪問的頁面
      if (location.pathname === PagePathEnum.IBANFinderPage) {
        //
      } else if (location.pathname === PagePathEnum.LoginPage) {
        // NOTICE: 登入頁面 (使用者輸入OTP 進行登入)
      } else {
        // NOTE: 需要登入才能訪問的頁面
        const token = getToken();
        // console.log("token", token);

        if (!token) {
          return alertModal('Please come with token');
        }

        // NOTICE: 直接進行登入
        // NOTICE: 還款頁面、綁卡頁面、IBAN 說明頁面 (使用 URL Querystring Token 進行登入)
        // NOTE: 更新使用者資訊
        const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
        yield put(indexPageSlice.actions.updateUserAPI(userResponse));

        // NOTE: 登入成功
        MonitorUsecaseFlow.userLogin(userResponse);

        // NOTE: App 初始化成功
        // refactor me
        yield put(appSlice.actions.init(true));

      }
    } else if (NativeAppInfo.mode === 'H5') {

      // TODO: refactor me
      try {
        // NOTE: Posthog
        // yield call(Posthog.init);
      } catch (error) {
        console.log(error);
        // NOTICE: 以下這行會導致上層 saga 中斷
        // yield catchSagaError(error);
      }
    }
    // NOTE: 取得初始化資料 (init Info & NativeAppInfo 塞到redux內)
    if (
      GlobalAppMode.mode === AppModeEnum.IndexWebview ||
      GlobalAppMode.mode === AppModeEnum.PureH5 ||
      environment.country === PakistanCountry.country
    ) {
        appStore.dispatch(SystemCaseActions.InitSaga());
    }

  } catch (error) {
    console.log(error);
    yield catchSagaError(error);
  }
}
