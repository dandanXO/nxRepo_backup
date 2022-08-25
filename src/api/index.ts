import { createApi } from "@reduxjs/toolkit/query/react";
import {
    GetAttractionsALLResponse,
    GetAttractionsALLRequestQueryArg,
    GetAttractionsALLResponseData,
} from "./demo/getAttractionsALL";
import {
    GetLoanDetailRequestQuerystring,
    GetLoanDetailResponse,
} from "./getLoanDetail";
import axiosBaseQuery from "./base/axiosBaseQuery";
import {
    GetRepayReceiptRequestQuerystring,
    GetRepayReceiptResponse,
} from "./getRepayReceipt";
import {
    PostRepayReceiptRequestBody,
    PostRepayReceiptResponse,
} from "./postRepayReceipt";
import { GetRepayTypesResponse } from "./getRepayTypes";
import {
    PostRepayCreateRequestBody,
    PostRepayCreateResponse,
} from "./postRepayCreate";
import { PostBankBindSaveRequest } from "./postBankBindSave";
import { PostLoanSubmitOrderRequestBody } from "./postLoanSubmitOrder";
export {
    GetAttractionsALLResponse,
    GetAttractionsALLRequestQueryArg,
    GetAttractionsALLResponseData,
};

const baseUrl = "/api/v2";
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
        getAttractionsAll: builder.query<
            GetAttractionsALLResponse,
            GetAttractionsALLRequestQueryArg
        >({
            query: (arg: GetAttractionsALLRequestQueryArg) => ({
                url: `/${arg.lang}/Attractions/All?page=1`,
                method: "get",
            }),
        }),
        getLoanDetail: builder.query<
            GetLoanDetailResponse,
            GetLoanDetailRequestQuerystring
        >({
            query: (query: GetLoanDetailRequestQuerystring) => ({
                url: `/loan/detail`,
                params: {
                    orderNo: query.orderNo,
                },
                method: "get",
            }),
        }),
        getRepayReceipt: builder.query<
            GetRepayReceiptResponse,
            GetRepayReceiptRequestQuerystring
        >({
            query: (query: GetRepayReceiptRequestQuerystring) => ({
                url: `/repay/receipt`,
                params: {
                    orderNo: query.orderNo,
                },
                method: "get",
            }),
        }),
        postRepayReceipt: builder.mutation<PostRepayReceiptResponse, FormData>({
            query: (requestBody: FormData) => ({
                url: `/repay/receipt`,
                method: "post",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    // https://www.it145.com/9/182527.html
                    "Content-Type":
                        "multipart/form-data;boundary=" + new Date().getTime(),
                },
                data: requestBody,
                // data: {
                //     file: query.file,
                //     orderNo: query.orderNo,
                //     receipt: query.receipt,
                // }
            }),
        }),
        getRepayTypes: builder.query<GetRepayTypesResponse, {}>({
            query: () => ({
                url: `/repay/types`,
                method: "get",
            }),
        }),
        postRepayCreate: builder.mutation<
            PostRepayCreateResponse,
            PostRepayCreateRequestBody
        >({
            query: (query: PostRepayCreateRequestBody) => ({
                url: `/repay/create`,
                method: "post",
                data: query,
            }),
        }),
        postBankBindSave: builder.mutation<{}, PostBankBindSaveRequest>({
            query: (requestBody: PostBankBindSaveRequest) => ({
                url: `/bank-bind/save`,
                method: "post",
                data: requestBody,
            }),
        }),
        postLoanSubmitOrder: builder.mutation<
            {},
            PostLoanSubmitOrderRequestBody
        >({
            query: (requestBody: PostLoanSubmitOrderRequestBody) => ({
                url: `/loan/submit-order`,
                method: "post",
                data: requestBody,
            }),
        }),
    }),
});
export const {
    useGetAttractionsAllQuery,
    useGetLoanDetailQuery,
    useGetRepayReceiptQuery,
    usePostRepayReceiptMutation,
    useGetRepayTypesQuery,
    usePostRepayCreateMutation,
    usePostBankBindSaveMutation,
    usePostLoanSubmitOrderMutation,
} = API;
