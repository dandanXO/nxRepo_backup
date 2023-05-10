import { AppThemeProvider, IThemeConfig } from '@frontend/mobile/shared/ui';
import { AppRouter } from './presentation/router';
import { Provider } from 'react-redux';
import { appStore, RootState } from './reduxStore';
import { history } from './reduxStore/index';
import {
  ReduxRouter,
  ReduxRouterSelector,
} from '@lagunovsky/redux-react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const routerSelector: ReduxRouterSelector<RootState> = (state) =>
  state.navigator;

interface AppProps {}

export function App(props: AppProps) {
  return (
    <div>
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
