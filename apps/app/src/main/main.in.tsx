import "../polyfills";
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization
import { SentryModule } from '../app/modules/sentry';
import "../app/modules/errorHandler";
import '../app/modules/posthog';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// NOTE: ENV
import { environment } from '../environments/environmentModule/environment';

// NOTE: Modules
import { NativeAppInfo } from '../app/persistant/nativeAppInfo';
import {ThemeModule} from '../app/modules/theme';
import '../app/modules/i18n';
import '../app/modules/timezone';
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/modules/window/IWindow';

// NOTE: Other
import '../style.css';
import {alertModal} from "../app/api/base/alertModal";
import {MonitorUsecaseFlow} from "../app/monitorUsecaseFlow";
import {I18nModule} from "../app/modules/i18n";

import React from 'react';

import {AppRouter} from '../app/presentation/router/index.in';
import {CoreMain} from "./main.core";

// NOTICE:
if (window.Cypress) {
  // window.appReady = true
  window.AppInfoTask = {
    getAppInfo: () => JSON.stringify({
      domain: 'https://www.oasis-gold.com',
      environment: 'india',
      packageId: 'com.ind.kyc.application',
      appName: 'Local APP',
      uiVersion: "56",
      token: null,
      mode: 'H5',
      phoneNo: '1234567890',
    })
  }
}

// NOTICE: for testing dev pk
// window.AppInfoTask = {
//   getAppInfo: () => JSON.stringify({
//     "packageId": "com.ind.kyc.application",
//     "appName": "pkapidev",
//     "domain": "pk-api-dev.com",
//     "token": "b7faecdf8f5b4c6fb368fe5d3dcf7df2",
//     "uiVersion": "24",
//     "environment": "pakistan",
//     "isPinCodeEnabled": false,
//     "phoneNo": "6666666667",
//     "deviceCode": "1d566731-ba41-4554-b1fc-3774be7a17c0",
//     "envLanguage": "en"
//   })
// }

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
