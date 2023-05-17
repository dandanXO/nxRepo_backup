import {AndroidPage} from "../../../../modules/window/IWindow";
import {AppEnvironment} from "../../../../modules/appEnvironment";
import {catchSagaError} from "../../../../usecaseFlow/utils/catchSagaError";
import {alertModal} from "../../../../api/base/alertModal";
import {NativeAppInfo} from "../../../../persistant/nativeAppInfo";

export function *userAuthenticateSaga() {

  try {
    if(AppEnvironment.isLocalhost()) {
      // NOTE: 省略 Native APP 交互
      alertModal("本地端不交互: 實際會跳轉到 Native APP 進行驗證");
    } else {
      if(window["IndexTask"] && window["IndexTask"]["navToPage"]) {
        window["IndexTask"]["navToPage"](AndroidPage.AUTH)
      } else {
        if(NativeAppInfo.mode === "H5") {
          alertModal("注意: H5 不會有此 flow");
        } else {
          const message = "Native Error: window[\"IndexTask\"][\"navToPage\"] function is missing";
          throw new Error(message)
        }
      }
    }
  } catch (error) {
    yield catchSagaError(error);
  }

}
