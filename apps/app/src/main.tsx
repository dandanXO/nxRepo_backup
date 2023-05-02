import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {environment} from "./environments/environment";
import {AndroidAppInfo} from "./app/modules/window/IWindow";
import "./app/modules/i18n";
import "./app/modules/datetime/index";
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import "./app/modules/window/IWindow"
import App from './app/app';
import "./style.css";
import {applyTheme} from "./app/modules/theme/utils";

export const AppFlag = {
  enableSentry: false,
}

export const isInAndroid = window["isInAndroid"]();
// console.log("isInAndroid", isInAndroid);

let appInfo: AndroidAppInfo = window.AppInfoTask && window.AppInfoTask.getAppInfo && window.AppInfoTask.getAppInfo()
console.log("appInfo", appInfo);

// NOTICE: app team dev packageId 都是 com.ind.kyc.application
// NOTE: only H5 environment
if(!appInfo) {
  if(environment.country === "in") {
    appInfo = {
      domain: "india-api-dev.com",
      environment: "india",
      packageId: "com.ind.kyc.application",
      appName: "dev_in",
      uiVersion: "55",
      token: "",
    }
    // applyTheme("india", "v" + appInfo.uiVersion);
  } else if(environment.country === "pk") {
    appInfo = {
      domain: "india-api-dev.com",
      environment: "pakistan",
      packageId: "com.pak.app.yesloan.android",
      appName: "dev_in",
      uiVersion: "15",
      token: "",
    }
    // applyTheme("pakistan", "v" + appInfo.uiVersion);
  } else {
    new Error("appInfo is undefined");
  }
} else {
  // NOTICE: 印度 v55, 巴基斯坦 v56 的 uiVersion 是寫死成 1 的
  // NOTICE: 巴基斯坦 v56, uiVersion 則是變動的
  if(appInfo.uiVersion === "1") {
    if(appInfo.packageId === "com.ind.kyc.application") {
      appInfo.environment = "india";
      appInfo.uiVersion = "55"

    } else if(appInfo.packageId === "com.pak.app.yesloan.android") {
      appInfo.environment = "pakistan";
      appInfo.uiVersion = "15"
    }
  }
}
console.log("[app] appInfo", JSON.parse(JSON.stringify(appInfo)));
applyTheme(appInfo.environment, "v" + appInfo.uiVersion);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import(`./environments/theme/${appInfo.environment}/v${appInfo.uiVersion}/theme`).then((content) => {

  const themeConfig = content.themeConfig;
  window.theme = themeConfig;

  console.log("[app] environment", environment);
  console.log("[app] window.theme", window.theme);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );


