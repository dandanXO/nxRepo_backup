import {configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {API} from "../api";

const sagaMiddleware = createSagaMiddleware()

export const appStore = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(API.middleware)
      .concat(sagaMiddleware),
});
