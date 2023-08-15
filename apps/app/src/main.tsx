import "./polyfills";
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization
import { SentryModule } from './app/modules/sentry';
import "./app/modules/errorHandler";
import './app/modules/posthog';

import './app/modules/sentry';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// NOTE: ENV
import { environment } from './environments/environmentModule/environment';

// NOTE: Modules
import { NativeAppInfo } from './app/persistant/nativeAppInfo';
import { applyCustomTheme } from './app/modules/theme';
import './app/modules/i18n';
import './app/modules/timezone';
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import './app/modules/window/IWindow';

// NOTE: Other
import './style.css';
import App from './app/app';
import {alertModal} from "./app/api/base/alertModal";
import {MonitorUsecaseFlow} from "./app/monitorUsecaseFlow";

const renderApp = () => {
  // NOTE: Before rendering
  // console.log('[app] environment', environment);
  // console.log('[app] window.theme', window.theme);
  // console.log('[app] isInAndroid', isInAndroid());
  // console.log('[app] AndroidAppInfo', AndroidAppInfo);

  MonitorUsecaseFlow.appLoadAndroidAppInfo();

  // NOTICE: Theme
  applyCustomTheme(NativeAppInfo);
  // alertModal(JSON.stringify(NativeAppInfo));

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

renderApp();
