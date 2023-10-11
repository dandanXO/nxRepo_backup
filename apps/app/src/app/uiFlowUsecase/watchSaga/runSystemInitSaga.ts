import { push } from '@lagunovsky/redux-react-router';
import { Location } from 'history';
import queryString from 'query-string';
import { call, put, select } from 'redux-saga/effects';

import { AppModeEnum } from '../../application/AppModeEnum';
import { GlobalAppMode } from '../../application/GlobalAppMode';
// import { Posthog } from '../../modules/posthog';
import { getToken } from '../../application/getToken';
import { NativeAppInfo } from '../../application/nativeAppInfo';
import { Service } from '../../externel/backend';
import { GetIndexResponse } from '../../externel/backend/indexService/GetIndexResponse';
import { GetUserInfoServiceResponse } from '../../externel/backend/userService/GetUserInfoServiceResponse';
import { SentryModule } from '../../modules/sentry';
import { appInfoPersistence } from '../../persistant/AppInfoPersistence';
import { RootState, appStore } from '../../reduxStore';
import { appSlice } from '../../reduxStore/appSlice';
import { indexPageSlice } from '../../reduxStore/indexPageSlice';
import { PageOrModalPathEnum } from '../../ui/PageOrModalPathEnum';
import { alertModal } from '../../ui/components/alertModal';
import { MonitorUsecaseFlow } from '../../uiFlowUsecaseMoniter';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import { systemGetIndexPageSaga } from '../type/userUsecaseSaga/sharedSaga/systemGetIndexPageSaga';
import { catchSagaError } from '../utils/catchSagaError';

console.log('[app] SentryModule', SentryModule);

export function* runSystemInitSaga() {
  console.log('[app][times:1] runSystemInitSaga');
  try {
    // if(AppModeModel.getMode()) {
    if (GlobalAppMode.mode !== 'Unset') {
      console.log('[app] 已初始化');
      return;
    }

    console.log('[app] 開始初始化');

    const location: Location = yield select(
      (state: RootState) => state.navigator.location
    );

    // NOTE: Setting GlobalAppMode
    if (NativeAppInfo.mode === 'Webview') {
      // NOTICE: 初始化 GlobalAppMode.mode
      if (location.pathname === PageOrModalPathEnum.IndexPage) {
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
    console.log('[app] GlobalAppMode = ' + GlobalAppMode.mode);

    // NOTE: 根據初始頁面進行初始化
    if (NativeAppInfo.mode === 'Webview') {
      // NOTE: 不需要登入才能訪問的頁面
      // NOTE: white page list
      if (location.pathname === PageOrModalPathEnum.IBANFinderPage) {
        //
      } else if (location.pathname === PageOrModalPathEnum.LoginPage) {
        // NOTICE: 登入頁面 (使用者輸入OTP 進行登入)
      } else {
        // NOTICE: 這邊綁卡頁之類也會呼叫到
        // NOTE: 需要登入才能訪問的頁面
        const token = getToken();
        // console.log("token", token);

        if (!token) {
          const message = '[Webview] Server Error: Need Token';
          // FIXME:
          // SentryModule.captureMessage(message);
          return alertModal(message);
        }

        // NOTICE: 直接進行登入
        // NOTICE: 還款頁面、綁卡頁面、IBAN 說明頁面 (使用 URL Querystring Token 進行登入)
        // NOTE: 更新使用者資訊
        const userResponse: GetUserInfoServiceResponse = yield call(
          Service.UserService.GetUserInfoService,
          {}
        );
        // console.log("[app] userResponse", userResponse);
        yield put(indexPageSlice.actions.updateUserAPI(userResponse));

        // NOTE: 登入成功
        MonitorUsecaseFlow.userLogin(userResponse);

        // NOTE: Loan Agreement 資料在 index
        const indexResponse: GetIndexResponse = yield call(
          Service.IndexService.getIndex,
          {}
        );
        yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));
      }
    } else if (NativeAppInfo.mode === 'H5') {
      console.log('[app] first location.pathname: ', location.pathname);
      // TODO: refactor me
      try {
        // NOTE: Posthog
        // yield call(Posthog.init);
      } catch (error) {
        console.log(error);
        // NOTICE: 以下這行會導致上層 saga 中斷
        // yield catchSagaError(error);
      }

      // NOTICE: 還款資訊頁與後台產生的還款資訊頁與第三方支付跳轉的付款結果頁面不需要登入與其他行為
      if (
        location.pathname === PageOrModalPathEnum.PaymentResultPage ||
        location.pathname === PageOrModalPathEnum.PaymentCheckoutPage
      ) {
        return;
      }

      // NOTICE: 需要 appName, appID 才能使用 PureH5
      const parsedQueryString = queryString.parse(window.location.search);
      const appName =
        appInfoPersistence.appName || (parsedQueryString['appName'] as string);
      const appID =
        appInfoPersistence.appID || (parsedQueryString['appID'] as string);
      const appDomain =
        appInfoPersistence.appDomain ||
        (parsedQueryString['appDomain'] as string);

      console.log('[app] appName: ', appName);
      console.log('[app] appID: ', appID);
      console.log('[app] appDomain: ', appDomain);

      if (!appName || !appID || !appDomain) {
        // NOTICE: delay 0.5 seconds 讓 privacy policy 的 model 能夠在 alertModal底下
        setTimeout(() => {
          alertModal('Please use valid appName, appID and appDomain');
        }, 500);
        yield put(push('/error'));
        return;
      }

      appInfoPersistence.appName = appName;
      appInfoPersistence.appID = appID;
      appInfoPersistence.appDomain = appDomain;

      yield put(
        appSlice.actions.updateAppInfo({
          appName,
          appID,
          appDomain,
        })
      );

      if (
        location.pathname === PageOrModalPathEnum.LoginPage ||
        location.pathname === PageOrModalPathEnum.PrivacyPolicyModal
      ) {
        // NOTICE: 登入頁面 (使用者輸入OTP 進行登入)
        // NOTE: 有 localStorage 就直接進行頁面跳轉判斷
        const token = getToken();
        if (token) {
          yield put(push(PageOrModalPathEnum.IndexPage));
          const userResponse: GetUserInfoServiceResponse = yield call(
            Service.UserService.GetUserInfoService,
            {}
          );
          console.log('userResponse', userResponse);
          yield put(indexPageSlice.actions.updateUserAPI(userResponse));
        }
        // else {
        //   yield put(push(`${PageOrModalPathEnum.LoginPage}?appName=${appName}&appID=${appID}&appDomain=${appDomain}`));
        // }
      } else {
        // NOTICE: 沒有登入權限跳轉至 Login
        const token = getToken();
        // console.log("token", token);
        if (!token) {
          const message =
            '[PureH5] Frontend Error: Need Token. Cannot come directly without token';
          // FIXME:
          // SentryModule.captureMessage(message);
          yield put(push(PageOrModalPathEnum.LoginPage));

          alertModal(message);
          return;
        }

        const userResponse: GetUserInfoServiceResponse = yield call(
          Service.UserService.GetUserInfoService,
          {}
        );
        console.log('userResponse', userResponse);
        yield put(indexPageSlice.actions.updateUserAPI(userResponse));

        // NOTE: 共用資料需要統一再次拉取
        yield call(systemGetIndexPageSaga);
      }
    }

    // NOTE: 取得初始化資料 (init Info & NativeAppInfo 塞到redux內)
    appStore.dispatch(SystemCaseActions.InitSaga());
  } catch (error) {
    // console.log("test error", error)
    yield catchSagaError(error);
  }
}
