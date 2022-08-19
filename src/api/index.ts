import queryString from "query-string";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg, GetAttractionsALLResponseData } from "./demo/getAttractionsALL";
import {GetLoanDetailRequestQuery} from "./getLoanDetail";
export {GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg, GetAttractionsALLResponseData }

const parsedQueryString = queryString.parse(location.search);
console.log("parsedQueryString", parsedQueryString);
const TOKEN = parsedQueryString.token ? parsedQueryString.token as string: undefined;
if(!TOKEN) {
    console.log("error");
}
// const baseUrl = "3.111.118.247";
// const baseUrl = "https://www.travel.taipei/open-api";
const baseUrl = "http://localhost/api/v2"
export const API = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, api) => {
            headers.set("accept", "application/json");
            // headers.set("Authorization", "b5f2db2c45e24edcbc49540bae862fbd");
            headers.set("Authorization", TOKEN);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // NOTICE: demo
        getAttractionsAll: builder.query<GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg>({
            query: (arg: GetAttractionsALLRequestQueryArg) => `/${arg.lang}/Attractions/All?page=1`,
        }),
        getLoanDetail: builder.query({
            query: (orderNo: GetLoanDetailRequestQuery) => `/loan/detail?orderNo=${orderNo}`,
        })
    })
});
export const {
    useGetAttractionsAllQuery,
    useGetLoanDetailQuery,
} = API
