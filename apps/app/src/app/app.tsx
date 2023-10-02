import {ReduxRouter, ReduxRouterSelector} from '@lagunovsky/redux-react-router';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {AppThemeProvider} from '@frontend/mobile/shared/ui';

import {AppRouter} from './presentation/router';
import {appStore, RootState} from './reduxStore';
import {history} from './reduxStore/index';

const routerSelector: ReduxRouterSelector<RootState> = (state) => state.navigator;
// window['reduxStore'] = appStore;

export function App() {
  return (
    <div>
      {/*NOTICE: Refactor Me - style component theme : window.theme */}
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

// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API
// https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
// https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
// https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation

// NOTICE: cannot be work
// (window.screen as any).addEventListener("orientationchange", () => {
//   alert(`The orientation of the screen is: ${window.screen.orientation}`);
// });

// NOTICE: THe page needs to be fullscreen in order to call screen.orientation.lock();
// window.screen.orientation.lock("portrait-primary");

// window.screen.orientation.addEventListener("change", (event: any) => {
//   const type = event.target.type;
//   const angle = event.target.angle;
//   console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`);
//
//   switch (window.screen.orientation.type) {
//     case "portrait-secondary":
//     case "portrait-primary":
//       alert("That looks good.");
//       break;
//     case "landscape-primary":
//       alert("Mmmh… you should rotate your device to portrait");
//       break;
//     case "landscape-secondary":
//       alert("Mmmh… the screen is landscape!");
//       break;
//     default:
//       alert(("The orientation API isn't supported in this browser :("));
//   }
// }, false);
