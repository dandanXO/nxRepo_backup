import {configureStore} from "@reduxjs/toolkit";
import {API} from "../api";

export const appStore = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
})
export type RootState = ReturnType<typeof appStore.getState>
