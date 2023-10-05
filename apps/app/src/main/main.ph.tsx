import "../polyfills";
import { SentryModule } from '../app/modules/sentry';
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization

import React, {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
// import posthog from "posthog-js";

// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/externel/window/IWindow';
import "../app/application/errorHandler";
// import '../app/modules/posthog';
import '../app/modules/sentry';
import '../app/modules/i18n';
import '../app/device/timezone';


import {NativeAppInfo} from '../app/application/nativeAppInfo';

// NOTE: Other
import '../style.css';
import {MonitorUsecaseFlow} from "../app/uiFlowUsercaseMoniter";
import {AppRouter} from "../app/ui/router/index.ph";
import {CoreMain} from "./main.core";
import {I18nModule} from "../app/modules/i18n";
import {ThemeModule} from "../app/modules/ui/theme";

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

