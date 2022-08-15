import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg, GetAttractionsALLResponseData } from "./demo/getAttractionsALL";
export {GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg, GetAttractionsALLResponseData }

// const baseUrl = "3.111.118.247";
// const baseUrl = "https://www.travel.taipei/open-api";
const baseUrl = "http://localhost:9000/open-api";

export const API = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, api) => {
            headers.set("accept", "application/json");
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // NOTICE: demo
        getAttractionsAll: builder.query<GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg>({
            query: (arg: GetAttractionsALLRequestQueryArg) => `/${arg.lang}/Attractions/All?page=1`,
        }),
        // getLoanDetail: builder.query({
        //     query: (orderNo) => "/api/v2/loan/detail",
        // })
    })
});
export const {
    useGetAttractionsAllQuery,
} = API
