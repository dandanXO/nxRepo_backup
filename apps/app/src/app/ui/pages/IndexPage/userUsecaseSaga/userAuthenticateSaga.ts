import { alertModal } from '../../../../api/base/alertModal';
import { AndroidPage } from '../../../../modules/window/IWindow';
import { NativeAppInfo } from '../../../../persistant/nativeAppInfo';
import { catchSagaError } from '../../../../uiUsecaseFlow/utils/catchSagaError';
import {GlobalAppMode} from "../../../../persistant/GlobalAppMode";
import {isInApp} from "../../../../modules/appEnvironment/isInApp";
import {SentryModule} from "../../../../modules/sentry";

export function* userAuthenticateSaga() {
  try {
    let message = null;
    let collectMessage = null;

    if (NativeAppInfo.mode === 'H5') {
      // NOTICE: refactor me
      message = "Error: APP:401"

      collectMessage = "注意: H5 不會有此 flow，因為只有老客";
      SentryModule.captureException(collectMessage);

    } else if (NativeAppInfo.mode === 'Webview') {

      if (GlobalAppMode.mode === 'SimpleWebView') {
        message = "Error: APP:402"

        collectMessage = '注意: SimpleWebView 不會有此 flow';
        SentryModule.captureException(collectMessage);

      } else if (GlobalAppMode.mode === 'IndexWebview') {
        if (window['IndexTask'] && window['IndexTask']['navToPage'] && isInApp()) {
          window['IndexTask']['navToPage'](AndroidPage.AUTH);
        } else {
          if (isInApp()) {
            message = "Error: APP:403"
            collectMessage = 'Native Error: window["IndexTask"]["navToPage"] function is missing';
            SentryModule.captureException(collectMessage);


          } else {
            message = "Error: APP:404"
            collectMessage = '電腦模擬 Webview 所以不會跳到 Native APP';
            SentryModule.captureException(collectMessage);
          }
        }
      } else if (GlobalAppMode.mode === 'None') {
        message = "Error: APP:405"
        collectMessage = '注意: AppGlobal.mode === "None"';
      }
    }

    if(collectMessage) {
      SentryModule.captureException(collectMessage);
    }

    if (message) {
      alertModal(message);
      throw new Error(message);
    }

  } catch (error) {
    yield catchSagaError(error);
  }
}
