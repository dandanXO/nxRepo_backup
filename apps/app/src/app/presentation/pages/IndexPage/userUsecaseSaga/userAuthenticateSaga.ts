import { alertModal } from '../../../../api/base/alertModal';
import { AndroidPage } from '../../../../modules/window/IWindow';
import { NativeAppInfo } from '../../../../persistant/nativeAppInfo';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import {GlobalAppMode} from "../../../../persistant/GlobalAppMode";
import {isInApp} from "../../../../modules/appEnvironment/isInApp";

export function* userAuthenticateSaga() {
  try {
    let message = null;
    if (NativeAppInfo.mode === 'H5') {
      message = '注意: H5 不會有此 flow，因為只有老客';
    } else if (NativeAppInfo.mode === 'Webview') {
      if (GlobalAppMode.mode === 'SimpleWebView') {
        message = '注意: SimpleWebView 不會有此 flow';
      } else if (GlobalAppMode.mode === 'IndexWebview') {
        if (window['IndexTask'] && window['IndexTask']['navToPage'] && isInApp()) {
          window['IndexTask']['navToPage'](AndroidPage.AUTH);
        } else {
          if (isInApp()) {
            message = 'Native Error: window["IndexTask"]["navToPage"] function is missing';
          } else {
            message = '電腦模擬 Webview 所以不會跳到 Native APP';
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
