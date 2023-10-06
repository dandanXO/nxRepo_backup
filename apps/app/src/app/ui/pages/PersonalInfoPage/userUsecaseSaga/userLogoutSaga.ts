import { alertModal } from '../../../components/alertModal';
import { NativeAppInfo } from '../../../../application/nativeAppInfo';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';
import {GlobalAppMode} from "../../../../application/GlobalAppMode";
import {isInApp} from "../../../../device/isInApp";
import {call, put, race, select, take} from "redux-saga/effects";
import {API, APIV3} from "../../../../externel/backend/rtk";
import {push, routerActions} from "@lagunovsky/redux-react-router";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {getToken, removeTokenFromLocalStorage} from "../../../../application/getToken";
import {RootState} from "../../../../reduxStore";
import {userInfoPersistence} from "../../../../persistant/UserInfoPersistence";
import {AndroidPage} from "../../../../externel/window/IWindow";
import {loginSlice} from "../../../../reduxStore/loginSlice";

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
    yield put(loginSlice.actions.updatePhoneNo());
    yield put(routerActions.push(PageOrModalPathEnum.LoginPage))
  }
  // TODO: 這邊錯誤有捕捉嗎?
}
export function* userLogoutSaga() {
  try {
    let message = null;

    if (GlobalAppMode.mode === 'SimpleWebView') {
      message = '注意: SimpleWebView 不會有此 flow';

    } else if (GlobalAppMode.mode === 'IndexWebview') {

      if(window['IndexTask'] && window['IndexTask']['navToPage']) {
        // NOTE: 呼叫 Native APP 登出
        window['IndexTask']['navToPage'](AndroidPage.LOGIN);
      } else {
        message = 'Native Error: window["IndexTask"]["navToPage"] function is missing';
      }
      yield call(logoutSaga);

    } else if(GlobalAppMode.mode === "PureH5") {
      yield call(logoutSaga);

    } else if (GlobalAppMode.mode === 'Unset') {
      message = '注意: AppGlobal.mode === "None"';
    }

    if (message) {
      alertModal(message);
      throw new Error(message);
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
