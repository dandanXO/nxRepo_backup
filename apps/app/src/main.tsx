import './app/modules/sentry';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
// NOTE: ENV
import { environment } from './environments/environment';

// NOTE: Modules
import { AndroidAppInfo } from './app/modules/nativeAppInfo/persistent/androidAppInfo';
import { applyCustomTheme } from './app/modules/theme';
import { isInAndroid } from './app/modules/window/isInAndroid';
import './app/modules/i18n';
import './app/modules/datetime/index';
// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import './app/modules/window/IWindow';

// NOTE: Other
import './style.css';
import App from './app/app';
import { appStore } from './app/reduxStore';
import { SystemCaseActions } from './app/usecaseFlow/type/systemUsecaseSaga/systemCaseActions';

const renderApp = () => {
  // NOTE: Before rendering
  console.log('[app] environment', environment);
  console.log('[app] window.theme', window.theme);
  console.log('[app] isInAndroid', isInAndroid());

  // NOTICE: Theme
  applyCustomTheme(AndroidAppInfo);

  // NOTICE: Initializing H5 Mode
  if (AndroidAppInfo.mode === 'H5') {
    console.log('[app][saga] 2');
    appStore.dispatch(SystemCaseActions.InitSaga());
  }

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

renderApp();
