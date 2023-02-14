import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";


// const baseUrl = "/api/v2";
const baseUrl = "/hs/admin";

export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

    }),
});

export const {

} = API;
