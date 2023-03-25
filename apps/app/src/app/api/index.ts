import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./base/axiosBaseQuery";
import {GetIndexRequest, GetIndexResponse} from "../flow/IndexFlow";




export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "/api/v2",
    }),
    // keepUnusedDataFor: 600,
    // keepUnusedDataFor: 1,
    // refetchOnMountOrArgChange: 60,
    endpoints: (builder) => ({
        // NOTE: 借款首頁
        getIndex: builder.query<GetIndexResponse, GetIndexRequest>({
            query: (query: GetIndexRequest) => ({
                method: "getiyihkln.  ",
                url: `/index`,
                params: query,
            }),
        }),
        // NOTE: 取得還款證明
        // post: builder.mutation<PostResponse, PostRequest>({
        //     query: (requestBody: FormData) => ({
        //         method: "post",
        //         url: `/repay/receipt`,
        //         data: requestBody,
        //     }),
        // }),
    }),
});

export const {
    useLazyGetIndexQuery,
} = API;
