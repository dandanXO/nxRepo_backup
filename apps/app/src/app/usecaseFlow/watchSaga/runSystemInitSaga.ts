import {call, put, select} from 'redux-saga/effects';
import {Posthog} from '../../modules/posthog';
import {AppGlobal, AppTempFlag, NativeAppInfo} from '../../persistant/nativeAppInfo';
import {appStore, RootState} from '../../reduxStore';
import {SystemCaseActions} from '../type/systemUsecaseSaga/systemCaseActions';
import {getToken} from "../../modules/querystring/getToken";
import {Location} from "history";
import {PagePathEnum} from "../../presentation/pages/PagePathEnum";
import {GetUserInfoServiceResponse} from "../../api/userService/GetUserInfoServiceResponse";
import {Service} from "../../api";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";
import {SentryModule} from "../../modules/sentry";
import {appSlice} from "../../reduxStore/appSlice";
import {alertModal} from "../../api/base/alertModal";
import {catchSagaError} from "../utils/catchSagaError";
import {AppModeEnum, AppModeModel} from "../../persistant/appModeModel";


export function* runSystemInitSaga() {
  try {

    // if(AppModeModel.getMode()) {
    //   console.log("[app] 已初始化")
    //   return ;
    // }

    console.log("[app] 開始初始化")

    if (NativeAppInfo.mode === 'Webview') {

      const location: Location = yield select((state: RootState) => state.navigator.location)

      if(location.pathname === PagePathEnum.IndexPage) {
        // NOTICE: IndexWebview
        // AppModeModel.setMode(AppModeEnum.IndexWebview);
        AppGlobal.mode = AppModeEnum.IndexWebview;

        // NOTE: Posthog
        yield call(Posthog.init);

      } else {
        // NOTICE: SimpleWebView
        // AppModeModel.setMode(AppModeEnum.SimpleWebView)
        AppGlobal.mode = AppModeEnum.SimpleWebView;
      }

      // NOTICE: 不需要登入頁面
      if(
        location.pathname === PagePathEnum.IBANFinderPage
      ) {
        //
      } else if(location.pathname === PagePathEnum.LoginPage) {
        // NOTICE: 登入頁面 (使用者輸入OTP 進行登入)
      } else {
        const token = getToken();
        // console.log("token", token);
        if(!token) {
          return alertModal("Please come with token");
        }

        // NOTICE: 直接進行登入
        // NOTICE: 還款頁面、綁卡頁面、IBAN 說明頁面 (使用 URL Querystring Token 進行登入)
        // NOTE: 取得使用者資訊
        const userResponse: GetUserInfoServiceResponse = yield call(
          Service.UserService.GetUserInfoService,
          {}
        );
        yield put(indexPageSlice.actions.updateUserAPI(userResponse));

        // NOTE: 登入成功
        SentryModule.userLogin(userResponse);

        yield put(appSlice.actions.init(true));
      }

    } else if (NativeAppInfo.mode === 'H5') {

      // AppModeModel.setMode(AppModeEnum.PureH5)
      AppGlobal.mode = AppModeEnum.PureH5;

      // NOTE: Posthog
      yield call(Posthog.init);

      console.log('[app][saga] 2');

      // NOTE: Only for H5
      appStore.dispatch(SystemCaseActions.InitSaga());
    }
  } catch (error) {
    console.log(error);
    yield catchSagaError(error);
  }
}
