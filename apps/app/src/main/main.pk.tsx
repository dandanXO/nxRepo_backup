import "../polyfills";
// NOTICE: caught ReferenceError: Cannot access 'SentryModule' before initialization

import React, {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
// import posthog from "posthog-js";
import {AppThemeProvider} from "@frontend/mobile/shared/ui";

// NOTICE : 會引用 dispatch ，所以會先觸發 run root saga
import '../app/modules/window/IWindow';
import "../app/modules/errorHandler";
import '../app/modules/posthog';
import '../app/modules/sentry';
import '../app/modules/i18n';
import '../app/modules/timezone';
import {ThemeModule} from '../app/modules/theme';

import {appStore, history, RootState} from "../app/reduxStore";
import {NativeAppInfo} from '../app/persistant/nativeAppInfo';

// Page
// PagePathEnum
// Modal


// NOTE: Other
import '../style.css';
import {MonitorUsecaseFlow} from "../app/monitorUsecaseFlow";
import {AppRouter} from "../app/presentation/router/index.pk";

const renderApp = () => {
  // NOTE: Before rendering
  // console.log('[app] environment', environment);
  // console.log('[app] window.theme', window.theme);
  // console.log('[app] isInAndroid', isInAndroid());
  // console.log('[app] AndroidAppInfo', AndroidAppInfo);

  MonitorUsecaseFlow.appLoadAndroidAppInfo();

  // NOTICE: Theme
  ThemeModule.applyCustomTheme(NativeAppInfo);
  // alertModal(JSON.stringify(NativeAppInfo));

  // NOTE: Starting to render
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;

  root.render(
    <StrictMode>
      <div>
        {/*NOTICE: Refactor ME window.theme */}
        <AppThemeProvider theme={window.theme}>
          <Provider store={appStore}>
            <ReduxRouter history={history} routerSelector={routerSelector}>
              <BrowserRouter basename={'/'}>
                <AppRouter />
              </BrowserRouter>
              {/*<RouterProvider router={appRouter as any} fallbackElement={<div>Loading...</div>} />*/}
            </ReduxRouter>
          </Provider>
        </AppThemeProvider>
      </div>
    </StrictMode>
  );
};

renderApp();

