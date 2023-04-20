import {configureStore} from "@reduxjs/toolkit";
import {API} from "../api";
import createSagaMiddleware from 'redux-saga'
import {personalRecommendActionsReducer} from "../components/pages/ProductAdModalListPage/redux";
import AppSaga from "../components/pages/ProductAdModalListPage/saga";

export const appStore = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
        // personalLoanRecommendSlice: personalLoanRecommendSlice.reducer,
        personalLoanRecommendSlice: personalRecommendActionsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(API.middleware).concat(sagaMiddleware),
});

// NOTICE: create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// NOTICE: then run the saga
sagaMiddleware.run(AppSaga)

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

// NOTE: for testing
// enable listener behavior for the store
// setupListeners(appStore.dispatch)

