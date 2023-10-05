import { alertModal } from '../../../components/alertModal';
import { AndroidPage } from '../../../../modules/window/IWindow';
import { NativeAppInfo } from '../../../../persistant/nativeAppInfo';
import { catchSagaError } from '../../../../uiUsecaseFlow/utils/catchSagaError';
import {GlobalAppMode} from "../../../../persistant/GlobalAppMode";
import {isInApp} from "../../../../modules/appEnvironment/isInApp";
import {call, put, race, select, take} from "redux-saga/effects";
import {API, APIV3} from "../../../../externel/backend/rtk";
import {push, routerActions} from "@lagunovsky/redux-react-router";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {getToken, removeTokenFromLocalStorage} from "../../../../persistant/getToken";
import {RootState} from "../../../../reduxStore";
import {userInfoPersistence} from "../../../../persistant/UserInfoPersistence";

function *logoutSaga() {

  // http://192.168.50.215:4002/v2?token=93797d3b9fe44ba9be4e1485ffde850a
  const appName: string = yield select((state: RootState) => state.app.appName);
  console.log("appName", appName);

  yield put(API.endpoints.logout.initiate({
    token: getToken(),
    appName: appName,
  }) as any);

  const {success, failure} = yield race({
    success: take(API.endpoints.logout.matchFulfilled),
    failure: take(API.endpoints.logout.matchRejected),
  })

  if(success) {
    removeTokenFromLocalStorage();
    userInfoPersistence.clearPhone();
    yield put(routerActions.push(PageOrModalPathEnum.LoginPage))
  }
  // TODO: 這邊錯誤有捕捉嗎?
}
export function* userLogoutSaga() {
  try {
    let message = null;

    // TODO: refactor h5=>PureH5
    if (NativeAppInfo.mode === 'H5') {
      // TODO: 單純 API 登出
      // message = '尚未實作';
      yield call(logoutSaga);

    } else if (NativeAppInfo.mode === 'Webview') {
      if (GlobalAppMode.mode === 'SimpleWebView') {
        message = '注意: SimpleWebView 不會有此 flow';
      } else if (GlobalAppMode.mode === 'IndexWebview') {
        if (window['IndexTask'] && window['IndexTask']['navToPage'] && isInApp()) {
          // NOTE: 呼叫 Native APP 登出
          window['IndexTask']['navToPage'](AndroidPage.LOGIN);
        } else {
          if (isInApp()) {
            message = 'Native Error: window["IndexTask"]["navToPage"] function is missing';
          } else {
            // TODO: 單純 API 登出
            yield call(logoutSaga);
          }
        }
      } else if (GlobalAppMode.mode === 'None') {
        message = '注意: AppGlobal.mode === "None"';
      }
    }

    if (message) {
      alertModal(message);
      throw new Error(message);
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
