import { configureStore } from "@reduxjs/toolkit";
import { API } from "../api";
// import { setupListeners } from '@reduxjs/toolkit/query'
export const appStore = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(API.middleware),
});

// NOTICE: for testing
// enable listener behavior for the store
// setupListeners(appStore.dispatch)

export type RootState = ReturnType<typeof appStore.getState>;
