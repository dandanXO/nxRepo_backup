import { configureStore } from "@reduxjs/toolkit";
import { API } from "../api";
import searchParamsSlice from "../modules/shared/utils/searchParamsSlice";

export const appStore = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
        searchParams: searchParamsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(API.middleware),
});
export type RootState = ReturnType<typeof appStore.getState>;
