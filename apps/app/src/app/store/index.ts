import {configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {API} from "../api";
import {AppSaga, indexPageSlice} from "../flow";


const sagaMiddleware = createSagaMiddleware()

export const appStore = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    [indexPageSlice.name]: indexPageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(API.middleware)
      .concat(sagaMiddleware),
});

// NOTICE: then run the saga
sagaMiddleware.run(AppSaga)

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

appStore.subscribe(() => {
  console.log(appStore.getState())

})


export type IndexPageProps = {
  state: RootState["indexPage"];
}

