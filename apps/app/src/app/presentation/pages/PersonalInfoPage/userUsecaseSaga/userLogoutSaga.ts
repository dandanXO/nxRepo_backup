import {alertModal} from "../../../../api/base/alertModal";
import {AndroidPage} from "../../../../modules/window/IWindow";
import {AppGlobal, isInApp, NativeAppInfo} from "../../../../persistant/nativeAppInfo";
import {catchSagaError} from "../../../../usecaseFlow/utils/catchSagaError";

export function *userLogoutSaga() {
  try {

    let message = null;

    // TODO: refactor h5=>PureH5
    if(NativeAppInfo.mode === "H5") {
      // TODO: 單純 API 登出

    } else if(NativeAppInfo.mode === "Webview") {

      if(AppGlobal.mode === "SimpleWebView") {
        message = "注意: SimpleWebView 不會有此 flow"

      } else if(AppGlobal.mode === "IndexWebview") {

        if(window["IndexTask"] && window["IndexTask"]["navToPage"] && isInApp()) {
          // NOTE: 呼叫 Native APP 登出
          window["IndexTask"]["navToPage"](AndroidPage.LOGIN)

        } else {
          if(isInApp()) {
            message = "Native Error: window[\"IndexTask\"][\"navToPage\"] function is missing";
          } else {
            // TODO: 單純 API 登出
          }

        }
      } else if(AppGlobal.mode === "None") {
        message ='注意: AppGlobal.mode === "None"'

      }
    }

    if(message) {
      alertModal(message);
      throw new Error(message);
    }

  } catch (error) {
    yield catchSagaError(error);
  }

}
