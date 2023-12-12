import {createRouterMiddleware, createRouterReducer,} from '@lagunovsky/redux-react-router';
import {configureStore} from '@reduxjs/toolkit';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import { API, API3 } from '../external';
import { appSlice } from './appSlice';
import { gameSlice } from './gameSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {uiSlice} from "./uiSlice";


export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const logger = (store: any) => (next: any) => (action: any) => {
  if (action.type !== 'indexPage/updateRiskCountdown') {
    // console.log('dispatching', action)
  }
  const result: any = next(action);

  if (action.type !== 'indexPage/updateRiskCountdown') {
    // console.log('next state', store.getState())
  }

  return result;
};

const sagaMiddleware = createSagaMiddleware({
  onError(error: Error, errorInfo: { sagaStack: string }) {
    // console.log("[app][saga] error", error)
    // alertModal(errorInfo.sagaStack)
    // alertModal("error")
  },
});

export const appStore = configureStore({
  reducer: {
    navigator: createRouterReducer(history),
    [appSlice.name]: appSlice.reducer,
    [API.reducerPath]: API.reducer,
    [API3.reducerPath]: API3.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
    // [APIBoundaryModuleSlice.name]: APIBoundaryModuleSlice.reducer,
    // [indexPageSlice.name]: indexPageSlice.reducer,
    // [loadingSlice.name]: loadingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(routerMiddleware) // for dispatching history actions)
      .concat(logger)
      .concat(API.middleware)
      .concat(API3.middleware)
      .concat(sagaMiddleware),
});
setupListeners(appStore.dispatch)

// NOTICE: then run the saga
// const rootSagaTask = sagaMiddleware.run(WatchAppSaga);
// rootSagaTask.toPromise().catch((error) => {
//   // Error here is a fatal error.
//   // None of the sagas down the road caught it.
//   console.log('[APP][rootSagaTask]', error);
//   SentryModule.captureException(error);
// });

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

appStore.subscribe(() => {
  // console.log("[app] store:", appStore.getState())
});

const handleResize = () => {
  const preIsMobile = appStore.getState().app.isMobile;
  const preIsTablet = appStore.getState().app.isTablet;
  const preIsDesktop = appStore.getState().app.isDesktop;

  const windowSize = {
    width: window.innerWidth,
  };

  let isMobile = true;
  let isTablet = false;
  let isDesktop = false;

  if (0 < windowSize.width && windowSize.width < 640) {
    isMobile = true
    isTablet = false
    isDesktop = false
  }
  if (640 <= windowSize.width && windowSize.width < 768) {
    isMobile = false
    isTablet = true
    isDesktop = false
  }
  if (768 <= windowSize.width && windowSize.width < 1024) {
    isMobile = false
    isTablet = false
    isDesktop = true
  }
  if (1024 <= windowSize.width && windowSize.width < 1280) {
    isMobile = false
    isTablet = false
    isDesktop = true
  }
  if (1280 <= windowSize.width && windowSize.width < 1536) {
    isMobile = false
    isTablet = false
    isDesktop = true
  }
  if (windowSize.width >= 1536) {
    isMobile = false
    isTablet = false
    isDesktop = true
  }
  // if(preIsMobile !== isMobile) {
  //   appStore.dispatch(appSlice.actions.setIsMobile(isMobile));
  // }
  // if(preIsMobile !== isMobile) {
  //   appStore.dispatch(appSlice.actions.setIsMobile(isMobile));
  // }
  appStore.dispatch(appSlice.actions.setIsMobile(isMobile));
  appStore.dispatch(appSlice.actions.setIsTablet(isTablet));
  appStore.dispatch(appSlice.actions.setIsDesktop(isDesktop));
};


window.addEventListener('resize', handleResize);
handleResize();
