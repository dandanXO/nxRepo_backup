import "../polyfills";
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization

import React, {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
// import posthog from "posthog-js";

// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/modules/window/IWindow';
import "../app/modules/errorHandler";
import '../app/modules/posthog';
import '../app/modules/sentry';
import '../app/modules/i18n';
import '../app/modules/timezone';
import {ThemeModule} from '../app/modules/theme';

import {NativeAppInfo} from '../app/application/nativeAppInfo';


// NOTE: Other
import '../style.css';
import {MonitorUsecaseFlow} from "../app/uiFlowUsercaseMoniter";
import {AppRouter} from "../app/ui/router/index.pk";
import {CoreMain} from "./main.core";
import {I18nModule} from "../app/modules/i18n";


// NOTICE:
if (window.Cypress) {
  // window.appReady = true
  // NOTICE: for testing dev in
  // window.AppInfoTask = {
  //   getAppInfo: () => JSON.stringify({
  //     appName: "longingloan",
  //     deviceCode: "e8561b5b-36f1-4dd7-bc2d-67466c7a1f47",
  //     domain: "india-api-dev.com",
  //     environment: "india",
  //     isPinCodeEnabled: false,
  //     mode: "Webview",
  //     packageId:"com.ind.kyc.application",
  //     phoneNo: "8888888888",
  //     token: "e1ab7e18244e4bfb9f8c48f3d4c317cd",
  //     uiVersion: "58",
  //   })
  // }
}


const renderApp = () => {
  MonitorUsecaseFlow.appLoadAndroidAppInfo();

  // NOTICE: i18n
  I18nModule.initialize();

  // NOTICE: Theme
  ThemeModule.applyCustomTheme(NativeAppInfo);

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <StrictMode>
      <CoreMain>
        <AppRouter/>
      </CoreMain>
    </StrictMode>
  )
};

renderApp();

