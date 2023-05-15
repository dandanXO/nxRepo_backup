import {call, put, select} from 'redux-saga/effects';
import { Posthog } from '../../modules/posthog';
import { AndroidAppInfo } from '../../modules/nativeAppInfo/persistent/androidAppInfo';
import {appStore, RootState} from '../../reduxStore';
import { SystemCaseActions } from '../type/systemUsecaseSaga/systemCaseActions';
import {getToken} from "../../modules/location/getToken";
import {Location} from "history";
import {PagePathEnum} from "../../presentation/pages/PagePathEnum";
import {GetUserInfoServiceResponse} from "../../api/userService/GetUserInfoServiceResponse";
import {Service} from "../../api";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";
import {SentryModule} from "../../modules/sentry";
import {appSlice} from "../../reduxStore/appSlice";
import {alertModal} from "../../api/base/alertModal";
import {catchSagaError} from "../utils/catchSagaError";

export function* runSystemInitSaga() {
  try {
    if (AndroidAppInfo.mode === 'Webview') {
      // NOTICE: 事件太難追蹤了
      // yield put(PersonalInfoPageSagaActions.system.init());

      const location: Location = yield select((state: RootState) => state.navigator.location)

      // NOTICE: 不需要登入頁面
      if(location.pathname === PagePathEnum.IBANFinderPage) {
        //
      } else if(location.pathname === PagePathEnum.LoginPage) {
        // NOTICE: 登入頁面 (使用者輸入OTP 進行登入)
      } else {
        const token = getToken();
        if(!token) return alertModal("Backend Error: Please be with token");
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

    } else if (AndroidAppInfo.mode === 'H5') {

      // NOTE: Posthog
      yield call(Posthog.init, {});

      console.log('[app][saga] 2');

      appStore.dispatch(SystemCaseActions.InitSaga());
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
