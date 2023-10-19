import { GlobalAppMode } from '../../../../application/GlobalAppMode';
import { NativeAppInfo } from '../../../../application/nativeAppInfo';
import { isInApp } from '../../../../device/isInApp';
import { AndroidPage } from '../../../../externel/window/IWindow';
import { SentryModule } from '../../../../modules/sentry';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';
import { alertModal } from '../../../components/alertModal';

export function* userAuthenticateSaga() {
  try {
    let message = null;
    let collectMessage = null;

    if (NativeAppInfo.mode === 'H5') {
      // NOTICE: refactor me
      message = 'Error: APP:401';

      collectMessage = '注意: H5 不會有此 flow，因為只有老客';
      SentryModule.captureException(collectMessage);
    } else if (NativeAppInfo.mode === 'Webview') {
      if (GlobalAppMode.mode === 'SimpleWebView') {
        message = 'Error: APP:402';

        collectMessage = '注意: SimpleWebView 不會有此 flow';
        SentryModule.captureException(collectMessage);
      } else if (GlobalAppMode.mode === 'IndexWebview') {
        if (
          window['IndexTask'] &&
          window['IndexTask']['navToPage'] &&
          isInApp()
        ) {
          window['IndexTask']['navToPage'](AndroidPage.AUTH);
        } else {
          if (isInApp()) {
            message = 'Error: APP:403';
            collectMessage =
              'Native Error: window["IndexTask"]["navToPage"] function is missing';
            SentryModule.captureException(collectMessage);
          } else {
            message = 'Error: APP:404';
            collectMessage = '電腦模擬 Webview 所以不會跳到 Native APP';
            SentryModule.captureException(collectMessage);
          }
        }
      } else if (GlobalAppMode.mode === 'Unset') {
        message = 'Error: APP:405';
        collectMessage = '注意: AppGlobal.mode === "None"';
      }
    }

    if (collectMessage) {
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