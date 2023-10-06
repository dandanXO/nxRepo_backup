import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import '../app/application/errorHandler';
import { NativeAppInfo } from '../app/application/nativeAppInfo';
import '../app/device/timezone';
// import posthog from "posthog-js";
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/externel/window/IWindow';
import '../app/modules/i18n';
import { I18nModule } from '../app/modules/i18n';
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization
import '../app/modules/sentry';
import { ThemeModule } from '../app/modules/ui/theme';
import { AppRouter } from '../app/ui/router/index.bd';
import { MonitorUsecaseFlow } from '../app/uiFlowUsecaseMoniter';
import '../polyfills';
// NOTE: Other
import '../style.css';
import { CoreMain } from './main.core';

const renderApp = () => {
  MonitorUsecaseFlow.appLoadAndroidAppInfo();

  // NOTICE: i18n
  I18nModule.initialize();

  // NOTICE: Theme
  ThemeModule.applyCustomTheme(NativeAppInfo);
  // alertModal(JSON.stringify(NativeAppInfo));

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <StrictMode>
      <CoreMain>
        <AppRouter />
      </CoreMain>
    </StrictMode>
  );
};

renderApp();
