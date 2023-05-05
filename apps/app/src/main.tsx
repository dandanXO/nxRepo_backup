import {environment} from "./environments/environment";
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import "./app/modules/i18n";
import "./app/modules/datetime/index";
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import "./app/modules/window/IWindow"
import "./style.css";
import App from './app/app';
import {applyTheme} from "./app/modules/theme/utils";
import {AndroidAppInfo} from "./app/modules/window/IWindow";

const getAppInfo = ():AndroidAppInfo => {
  let appInfo
  // NOTE: Native Bridge
  if(window["AppInfoTask"] && window["AppInfoTask"]["getAppInfo"]) {
    let appInfoStr = window["AppInfoTask"]["getAppInfo"]();
    appInfo = JSON.parse(appInfoStr);

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
  } else {
    if(environment.country === "in") {
      appInfo = {
        domain: "india-api-dev.com",
        environment: "india",
        packageId: "com.ind.kyc.application",
        appName: "dev_in",
        uiVersion: typeof AppInfo.UI_VERSION !== "undefined" ? String(AppInfo.UI_VERSION) : "55",
        token: "",
      }
    } else if(environment.country === "pk") {

      appInfo = {
        domain: "india-api-dev.com",
        environment: "pakistan",
        packageId: "com.pak.app.yesloan.android",
        appName: "dev_in",
        uiVersion: typeof AppInfo.UI_VERSION !== "undefined" ? String(AppInfo.UI_VERSION) : "15",
        token: "",
      }
    } else {
      new Error("前端請新增國家配置");
    }
  }

  return appInfo;
}

const applyCustomSharedLibTheme = (androidAPPInfo: AndroidAppInfo) => {
  import(`./environments/theme/${androidAPPInfo.environment}/v${androidAPPInfo.uiVersion}/theme`).then((content) => {
    const themeConfig = content.themeConfig;
    window.theme = themeConfig;
  })
}

const applyDefaultCustomTailwindTheme = (androidAPPInfo: AndroidAppInfo) => {
  // NOTE: apply tailwind theme
  applyTheme(androidAPPInfo.environment, "v" + androidAPPInfo.uiVersion);
}

const applyCustomTheme = () => {
  const androidAPPInfo = getAppInfo();
  console.log("[app] androidAPPInfo", androidAPPInfo);

  if(androidAPPInfo) {
    // NOTE: Apply default Custom Tailwind Theme
    applyDefaultCustomTailwindTheme(androidAPPInfo);

    // NOTE: Apply default Shared Lib Theme
    applyCustomSharedLibTheme(androidAPPInfo);
  }
}

const renderApp = () => {

  applyCustomTheme();

  // NOTE: Render
  // console.log("[app] environment", environment);
  // console.log("[app] window.theme", window.theme);
  // console.log("isInAndroid", isInAndroid());

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


