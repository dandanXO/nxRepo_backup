import {ReduxRouter, ReduxRouterSelector} from '@lagunovsky/redux-react-router';
import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';

import {AppThemeProvider} from '@frontend/mobile/shared/ui';

import {AppRouter} from './presentation/router';
import {appStore, RootState} from './reduxStore';
import {history} from './reduxStore/index';

const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;

window['reduxStore'] = appStore;

export function App() {

  return (
    <div>
      {/*NOTICE: Refactor ME window.theme */}
      <AppThemeProvider theme={window.theme}>
        <Provider store={appStore}>
          <ReduxRouter history={history} routerSelector={routerSelector}>
            <MemoryRouter basename={'/'}>
              <AppRouter />
            </MemoryRouter>
            {/*<RouterProvider router={appRouter as any} fallbackElement={<div>Loading...</div>} />*/}
          </ReduxRouter>
        </Provider>
      </AppThemeProvider>
    </div>
  );
}

export default App;
