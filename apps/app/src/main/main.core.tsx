import React from "react";
import {Provider} from "react-redux";
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
import {BrowserRouter} from "react-router-dom";

import {AppThemeProvider} from "@frontend/mobile/shared/ui";
import {environment} from "../environments/environmentModule/environment";
import {appStore, history, RootState} from "../app/reduxStore";
import {isInApp} from "../app/device/isInApp";
import {NativeAppInfo} from "../app/application/nativeAppInfo";
import {GlobalAppMode} from "../app/application/GlobalAppMode";
import {AppFlag} from "../environments/flag";
import {AppEnvironment} from "../app/device/appEnvironment";

type ICoreMain = {
  children: React.ReactElement;
}
const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;

export const CoreMain = (props: ICoreMain) => {
  // NOTE: Before rendering
  console.log('[app] AppEnvironment.getEnvironmentName()', AppEnvironment.getEnvironmentName())
  console.log('[app] environment', environment);
  console.log('[app] window.theme', window.theme);
  console.log('[app] isInApp', isInApp());
  console.log('[app] NativeAppInfo', NativeAppInfo);
  console.log('[app] GlobalAppMode', GlobalAppMode.mode);
  console.log("AppFlag", AppFlag);
  // alertModal(JSON.stringify(NativeAppInfo));

  return (
    <>
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
    </>
  )
}
