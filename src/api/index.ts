import queryString from "query-string";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg, GetAttractionsALLResponseData } from "./demo/getAttractionsALL";
import {GetLoanDetailRequestQuerystring, GetLoanDetailResponse} from "./getLoanDetail";
import axiosBaseQuery from "./axiosBaseQuery";
import * as url from "url";
import {GetRepayReceiptRequestQuerystring, GetRepayReceiptResponse} from "./getRepayReceipt";
import {PostRepayReceiptRequestBody, PostRepayReceiptResponse} from "./postRepayReceipt";
export {GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg, GetAttractionsALLResponseData }

const baseUrl = "/api/v2"
export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        // NOTICE: demo
        // getAttractionsAll: builder.query<GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg>({
        //     query: (arg: GetAttractionsALLRequestQueryArg) => `/${arg.lang}/Attractions/All?page=1`,
        // }),
        // getLoanDetail: builder.query({
        //     query: (query: GetLoanDetailRequestQuerystring) => `/loan/detail?orderNo=${query.orderNo}`,
        // })
        getAttractionsAll: builder.query<GetAttractionsALLResponse, GetAttractionsALLRequestQueryArg>({
            query: (arg: GetAttractionsALLRequestQueryArg) => ({
                url: `/${arg.lang}/Attractions/All?page=1`,
                method: "get",
            })
        }),
        getLoanDetail: builder.query<GetLoanDetailResponse, GetLoanDetailRequestQuerystring>({
            query: (query: GetLoanDetailRequestQuerystring) => ({
                url: `/loan/detail`,
                params: {
                    orderNo: query.orderNo,
                },
                method: "get",
            }),
        }),
        getRepayReceipt: builder.query<GetRepayReceiptResponse, GetRepayReceiptRequestQuerystring>(({
            query: (query: GetRepayReceiptRequestQuerystring) => ({
                url: `/repay/receipt`,
                params: {
                    orderNo: query.orderNo,
                },
                method: "get",
            }),
        })),
        postRepayReceipt: builder.mutation<PostRepayReceiptResponse, PostRepayReceiptRequestBody>({
            query: (query: PostRepayReceiptRequestBody) => ({
                url: `/repay/receipt`,
                method: 'post',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    file: query.file,
                    orderNo: query.orderNo,
                    receipt: query.receipt,
                }
            }),
        }),
        // postRepayCreate: builder.mutation<null, null>({
        //     query: (query: PostRepayReceiptRequestBody) => ({
        //         url: `/repay/create`,
        //         method: 'post',
        //     }),
        // }),
    })
});
export const {
    useGetAttractionsAllQuery,
    useGetLoanDetailQuery,
    useGetRepayReceiptQuery,
    usePostRepayReceiptMutation,
} = API
