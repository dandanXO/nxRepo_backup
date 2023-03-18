import {configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import { API } from "../api";
import {PostLoanQuotaRefreshResponse} from "../api/PostLoanQuotaRefreshResponse";
import queryString from "query-string";
import {store} from "next/dist/build/output/store";

// import { setupListeners } from '@reduxjs/toolkit/query'

import createSagaMiddleware from 'redux-saga'
import {personalLoanRecommendSlice} from "../components/pages/ProductAdModalListPage/redux";
import AppSaga from "../components/pages/ProductAdModalListPage/saga";
// NOTICE: create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export const appStore = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
      personalLoanRecommendSlice: personalLoanRecommendSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(API.middleware).concat(sagaMiddleware),
});

// NOTICE: then run the saga
sagaMiddleware.run(AppSaga)

export type RootState = ReturnType<typeof appStore.getState>;

// NOTE: for testing
// enable listener behavior for the store
// setupListeners(appStore.dispatch)

export type AppDispatch = typeof store.dispatch;
