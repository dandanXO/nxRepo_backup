import {AppEnvironment} from "../../../../modules/appEnvironment";
import {alertModal} from "../../../../api/base/alertModal";
import {AndroidPage} from "../../../../modules/window/IWindow";
import {NativeAppInfo} from "../../../../persistant/nativeAppInfo";

import {catchSagaError} from "../../../../usecaseFlow/utils/catchSagaError";

export function *userLogoutSaga() {
  try {
    if(AppEnvironment.isLocalhost()) {
      // NOTE: 省略 Native APP 交互
      alertModal("本地端不交互: 實際會跳轉到 Native APP 登入畫面");

    } else if(window["IndexTask"] && window["IndexTask"]["navToPage"]) {
      window["IndexTask"]["navToPage"](AndroidPage.LOGIN)

    } else if(NativeAppInfo.mode === "H5") {
      alertModal("PureH5 尚未實作");

    } else if(NativeAppInfo.mode === "Webview"){
      const message = "Native Error: window[\"IndexTask\"][\"navToPage\"] function is missing";
      throw new Error(message)

    } else {
      throw new Error("NativeAppInfo.mode is missing")
    }
  } catch (error) {
    yield catchSagaError(error);
  }

}
