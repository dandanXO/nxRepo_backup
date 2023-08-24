import {ReduxRouter, ReduxRouterSelector} from '@lagunovsky/redux-react-router';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {AppThemeProvider} from '@frontend/mobile/shared/ui';

import {AppRouter} from './presentation/router';
import {appStore, RootState} from './reduxStore';
import {history} from './reduxStore/index';
import { environment } from '../environments/environmentModule/environment';
import i18next from 'i18next';
import { AllCountry } from 'libs/shared/domain/src/country/AllCountry';

const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;

window['reduxStore'] = appStore;

const i18Language = AllCountry.find(i => i.country === environment.country);
if (i18Language) {
  i18next
    .changeLanguage(i18Language?.language)
    .then((t) => {
      // console.log("changeLanguage:", environment.countryName);
    })
    .catch((err) => {
      // console.log("changeLanguage:", environment.countryName);
      // console.log("error:", err);
      const error = new Error();
      error.name = "changeLanguage";
      if (err) error.message = JSON.stringify(err);
      // if (AppFlag.enableSentry) {
      //     Sentry.captureException(error);
      // }
    });
}

export function App() {

  return (
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
  );
}

export default App;
