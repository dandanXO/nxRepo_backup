import "./modules/i18n";
import "./modules/datetime/index";
import "./modules/window/window"

import {environment} from "../environments/environment";
import {AppThemeProvider} from "@frontend/mobile/shared/ui";
import {AppRouter} from "./presentation/router";
import {Provider} from "react-redux";
import {appStore, RootState} from "./usecaseFlow/reduxStore";
import {history} from "./usecaseFlow/reduxStore/index"
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {v55ThemeConfig} from "../environments/theme/in/v55";

export const AppFlag = {
  enableSentry: false,
}
window.theme = v55ThemeConfig;

console.log("[APP] environment", environment);
console.log("[APP] window.theme", window.theme);

const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator

export function App() {
  return (
    <div>
      <AppThemeProvider theme={window.theme}>
        <Provider store={appStore}>
          <ReduxRouter history={history} routerSelector={routerSelector}>
            <BrowserRouter basename={"/"}>
              <AppRouter/>
            </BrowserRouter>
            {/*<RouterProvider router={appRouter as any} fallbackElement={<div>Loading...</div>} />*/}
          </ReduxRouter>
        </Provider>
      </AppThemeProvider>
    </div>
  );
}

export default App;
