import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import './app/modules/errorHandler';
import './app/modules/i18n';
import './app/modules/posthog';
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization
import { SentryModule } from './app/modules/sentry';
import './app/modules/sentry';
import { applyCustomTheme } from './app/modules/theme';
import './app/modules/timezone';
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import './app/modules/window/IWindow';
// NOTE: Modules
import { NativeAppInfo } from './app/persistant/nativeAppInfo';
// NOTE: ENV
import { environment } from './environments/environment';
// NOTE: Other
import './style.css';

const renderApp = () => {
  // NOTE: Before rendering
  // console.log('[app] environment', environment);
  // console.log('[app] window.theme', window.theme);
  // console.log('[app] isInAndroid', isInAndroid());
  // console.log('[app] AndroidAppInfo', AndroidAppInfo);

  // NOTICE: 印度 v58 開始才有, 巴基斯坦 v15 就有了
  if (window['AppInfoTask'] && window['AppInfoTask']['getAppInfo']) {
    const appInfoStr = window['AppInfoTask']['getAppInfo']();
    const originalAppInfo = JSON.parse(appInfoStr);
    SentryModule.captureMessage(
      'App load Original AndroidAppInfo',
      {
        packageId: originalAppInfo.packageId,
        uiVersion: originalAppInfo.uiVersion,
        mode: originalAppInfo.mode,
        appName: originalAppInfo.appName,
        environment: originalAppInfo.environment,
      },
      {
        domain: originalAppInfo.domain,
      }
    );
  } else {
    SentryModule.captureMessage('App cannot load AndroidAppInfo');
  }

  SentryModule.captureMessage('App load AndroidAppInfo');

  // NOTICE: Theme
  applyCustomTheme(NativeAppInfo);

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

renderApp();
