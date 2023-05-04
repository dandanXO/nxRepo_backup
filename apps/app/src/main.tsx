import {environment} from "./environments/environment";
import {androidAPPInfo} from "./app/modules/window/appInfo";

import {alertModal} from "./app/api/base/alertModal";
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import "./app/modules/i18n";
import "./app/modules/datetime/index";
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import "./app/modules/window/IWindow"
import {isInAndroid} from "./app/modules/window/isInAndroid";

import "./style.css";
import App from './app/app';
import {applyTheme} from "./app/modules/theme/utils";

// NOTE: apply tailwind theme
applyTheme(androidAPPInfo.environment, "v" + androidAPPInfo.uiVersion);

// NOTICE: try for ios
window["AppInfoTask"]["getAppInfoFromIOS"] = function (appInfo: string) {
  alertModal("received from ios.appInfo:" + appInfo);
}

window["AppInfoTask"]["getAppInfo"] = function (appInfo: string) {
  alertModal("received from android.appInfo:" + appInfo);
}



// NOTE: apply lib style-component theme
import(`./environments/theme/${androidAPPInfo.environment}/v${androidAPPInfo.uiVersion}/theme`).then((content) => {
  const themeConfig = content.themeConfig;

  window.theme = themeConfig;

  console.log("[app] environment", environment);
  console.log("[app] window.theme", window.theme);
  console.log("isInAndroid", isInAndroid());

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})


