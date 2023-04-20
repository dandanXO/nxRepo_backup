import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {API, APIV3} from "../../api/rtk";
import {APIBoundaryModuleSlice} from "./apiBoundaryModuleSlice";
import {indexPageSlice} from "./indexPageSlice";
import {modalSlice} from "./modalSlice";
import {appSlice} from "./appSlice";
import {createBrowserHistory} from 'history'
import {alertModal} from "../../api/base/alertModal";
import {createRouterMiddleware, createRouterReducer} from '@lagunovsky/redux-react-router'
import {loginSlice} from "../usecaseActionSaga/userUsecaseSaga/loginPageSaga";
import {AppSaga} from "../watchSaga/appSaga";

export const history = createBrowserHistory()
const routerMiddleware = createRouterMiddleware(history)

const logger = (store: any) => (next: any) => (action: any) => {
  if(action.type !== 'indexPage/updateRiskCountdown') {
    console.log('dispatching', action)
  }

  const result: any = next(action)

  if(action.type !== 'indexPage/updateRiskCountdown') {
    console.log('next state', store.getState())
  }

  return result
}

const sagaMiddleware = createSagaMiddleware({
  onError(error: Error, errorInfo: { sagaStack: string }) {
    console.log("[app][saga] error", error)
    // alertModal(errorInfo.sagaStack)
    alertModal("error")
  },
})

export const appStore = configureStore({
  reducer: {
    ["navigator"]: createRouterReducer(history),
    [appSlice.name]: appSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [API.reducerPath]: API.reducer,
    [APIV3.reducerPath]: APIV3.reducer,
    [APIBoundaryModuleSlice.name]: APIBoundaryModuleSlice.reducer,
    [indexPageSlice.name]: indexPageSlice.reducer,
    [loginSlice.name]: loginSlice.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(routerMiddleware) // for dispatching history actions)
      .concat(logger)
      .concat(API.middleware)
      .concat(APIV3.middleware)
      .concat(sagaMiddleware)
});


// NOTICE: then run the saga
const rootSagaTask = sagaMiddleware.run(AppSaga)
rootSagaTask.toPromise().catch((error => {
  // Error here is a fatal error.
  // None of the sagas down the road caught it.
  console.log("[APP][rootSagaTask]",error)
}))
export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export type IndexPageProps = {
  state: RootState["indexPage"];
}

appStore.subscribe(() => {
  // console.log("[app] store:", appStore.getState())
})


