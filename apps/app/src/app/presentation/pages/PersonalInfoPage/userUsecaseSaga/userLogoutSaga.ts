import { alertModal } from '../../../../api/base/alertModal';
import { AndroidPage } from '../../../../modules/window/IWindow';
import { NativeAppInfo } from '../../../../persistant/nativeAppInfo';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import {GlobalAppMode} from "../../../../persistant/GlobalAppMode";
import {isInApp} from "../../../../modules/appEnvironment/isInApp";

export function* userLogoutSaga() {
  try {
    let message = null;

    // TODO: refactor h5=>PureH5
    if (NativeAppInfo.mode === 'H5') {
      // TODO: 單純 API 登出
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
