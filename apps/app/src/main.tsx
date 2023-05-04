import {environment} from "./environments/environment";
// import {androidAPPInfo} from "./app/modules/window/appInfo";

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
import {AndroidAppInfo} from "./app/modules/window/IWindow";

const transformAppInfo = (appinfo?: AndroidAppInfo) => {
  let androidAPPInfo = appinfo;

  if(!androidAPPInfo) {
    if(environment.country === "in") {
      androidAPPInfo = {
        domain: "india-api-dev.com",
        environment: "india",
        packageId: "com.ind.kyc.application",
        appName: "dev_in",
        uiVersion: "55",
        token: "",
      }
    } else if(environment.country === "pk") {
      androidAPPInfo = {
        domain: "india-api-dev.com",
        environment: "pakistan",
        packageId: "com.pak.app.yesloan.android",
        appName: "dev_in",
        uiVersion: "15",
        token: "",
      }
    } else {
      new Error("appInfo is undefined");
    }
  } else {
    // NOTICE: 印度 v55, 巴基斯坦 v56 的 uiVersion 是寫死成 1 的
    // NOTICE: 巴基斯坦 v56, uiVersion 則是變動的
    if(androidAPPInfo.uiVersion === "1") {
      if(androidAPPInfo.packageId === "com.ind.kyc.application") {
        androidAPPInfo.environment = "india";
        androidAPPInfo.uiVersion = "55"

      } else if(androidAPPInfo.packageId === "com.pak.app.yesloan.android") {
        androidAPPInfo.environment = "pakistan";
        androidAPPInfo.uiVersion = "15"
      }
    }
  }
  // console.log("[app] androidAPPInfo", JSON.parse(JSON.stringify(androidAPPInfo)));
  return androidAPPInfo;
}

const applySharedUIStyle = (androidAPPInfo: AndroidAppInfo) => {
  import(`./environments/theme/${androidAPPInfo.environment}/v${androidAPPInfo.uiVersion}/theme`).then((content) => {
    const themeConfig = content.themeConfig;
    window.theme = themeConfig;
  })
}



window["AppInfoTask"] = {
  // NOTICE: app team dev packageId 都是 com.ind.kyc.application
  getAppInfo: function (appInfoStr: string) {
    alertModal("received from android.appInfo:" + appInfoStr);
    if(appInfoStr) {
      let appInfo = JSON.parse(appInfoStr);
      if(appInfo) {
        const androidAPPInfo = transformAppInfo(appInfo);
        if(androidAPPInfo) {
          // NOTE: apply tailwind theme
          applyTheme(androidAPPInfo.environment, "v" + androidAPPInfo.uiVersion);
          applySharedUIStyle(androidAPPInfo);
        }
      }
    }
  },

  // NOTICE: try for ios
  getAppInfoFromIOS: function (appInfoStr: string) {
    alertModal("received from ios.appInfo:" + appInfoStr);
    if(appInfoStr) {
      let appInfo = JSON.parse(appInfoStr);
      const androidAPPInfo = transformAppInfo(appInfo);
      if(androidAPPInfo) {
        // NOTE: apply tailwind theme
        applyTheme(androidAPPInfo.environment, "v" + androidAPPInfo.uiVersion);
        applySharedUIStyle(androidAPPInfo);
      }
    }
  },
};

const renderApp = () => {
  // NOTE: apply default lib style-component theme
  import(`./environments/theme/india/v55/theme`).then((content) => {
    const themeConfig = content.themeConfig;
    window.theme = themeConfig;
  })

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

}


renderApp();

