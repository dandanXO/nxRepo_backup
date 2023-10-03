
import React from "react";
import {Provider} from "react-redux";
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
import {BrowserRouter} from "react-router-dom";

import {AppThemeProvider} from "@frontend/mobile/shared/ui";
import {environment} from "../environments/environmentModule/environment";
import {appStore, history, RootState} from "../app/reduxStore";
import {isInApp} from "../app/modules/appEnvironment/isInApp";
import {NativeAppInfo} from "../app/persistant/nativeAppInfo";
import {GlobalAppMode} from "../app/persistant/GlobalAppMode";

type ICoreMain = {
  children: React.ReactElement;
}
const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;

export const CoreMain = (props: ICoreMain) => {
  // NOTE: Before rendering
  console.log('[app] environment', environment);
  console.log('[app] window.theme', window.theme);
  console.log('[app] isInApp', isInApp());
  console.log('[app] NativeAppInfo', NativeAppInfo);
  console.log('[app] GlobalAppMode', GlobalAppMode.mode);
  // alertModal(JSON.stringify(NativeAppInfo));

  return (
    <div>
      {/*NOTICE: Refactor Me - style component theme : window.theme */}
      <AppThemeProvider theme={window.theme}>
        <Provider store={appStore}>
          <ReduxRouter history={history} routerSelector={routerSelector}>
            <BrowserRouter basename={'/'}>
              {props.children}
            </BrowserRouter>
            {/*<RouterProvider router={appRouter as any} fallbackElement={<div>Loading...</div>} />*/}
          </ReduxRouter>
        </Provider>
      </AppThemeProvider>
    </div>
  )
}
