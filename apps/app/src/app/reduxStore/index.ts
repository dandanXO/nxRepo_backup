import { createRouterMiddleware, createRouterReducer } from '@lagunovsky/redux-react-router';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import { API, APIV3 } from '../externel/rtk';
import { WatchAppSaga } from '../uiUsecaseFlow/watchAppSaga';
import { APIBoundaryModuleSlice } from './apiBoundaryModuleSlice';
import { appSlice } from './appSlice';
import { indexPageSlice } from './indexPageSlice';
import { loginSlice } from './loginSlice';
import { modalSlice } from './modalSlice';
import { loadingSlice } from './loadingSlice';
import { repaymentPageSlice } from './repaymentPageSlice';
import { repaymentDetailPageSlice } from './repaymentDetailPageSlice';
import { rtkPendingSlice } from './rtkPendingSlice';
import {SentryModule} from "../modules/sentry";

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
    ['navigator']: createRouterReducer(history),
    [appSlice.name]: appSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [API.reducerPath]: API.reducer,
    [APIV3.reducerPath]: APIV3.reducer,
    [APIBoundaryModuleSlice.name]: APIBoundaryModuleSlice.reducer,
    [indexPageSlice.name]: indexPageSlice.reducer,
    [loginSlice.name]: loginSlice.reducer,
    [loadingSlice.name]: loadingSlice.reducer,
    [repaymentPageSlice.name]: repaymentPageSlice.reducer,
    [repaymentDetailPageSlice.name]: repaymentDetailPageSlice.reducer,
    [rtkPendingSlice.name]: rtkPendingSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(routerMiddleware) // for dispatching history actions)
      .concat(logger)
      .concat(API.middleware)
      .concat(APIV3.middleware)
      .concat(sagaMiddleware),
});

// NOTE: refactor me
// NOTICE: then run the saga
const rootSagaTask = sagaMiddleware.run(WatchAppSaga);
rootSagaTask.toPromise().catch((error) => {
  // Error here is a fatal error.
  // None of the sagas down the road caught it.
  console.log('[APP][rootSagaTask]', error);
  SentryModule.captureException(error);
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export type IndexPageProps = {
  state: RootState['indexPage'];
};

appStore.subscribe(() => {
  // console.log("[app] store:", appStore.getState())
});

