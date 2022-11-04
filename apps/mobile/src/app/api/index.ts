import { createApi } from "@reduxjs/toolkit/query/react";
import {
    GetAttractionsALLRequestQueryArg,
    GetAttractionsALLResponse,
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
import { PostRepayReceiptResponse } from "./postRepayReceipt";
import { GetRepayTypesResponse } from "./getRepayTypes";
import {
    PostRepayCreateRequestBody,
    PostRepayCreateResponse,
} from "./postRepayCreate";
import { PostBankBindSaveRequest } from "./postBankBindSave";
import { PostLoanSubmitOrderRequestBody } from "./postLoanSubmitOrder";
import { GetLoanRecommendProductsResponse, GetLoanRecommendRequestQuerystring } from "./getLoanRecommend";
export {
    GetAttractionsALLResponse,
    GetAttractionsALLRequestQueryArg,
    GetAttractionsALLResponseData,
};

export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "/api/v2",
    }),
    endpoints: (builder) => ({
        // NOTE: 取得貸款訂單詳情
        getLoanDetail: builder.query<
            GetLoanDetailResponse,
            GetLoanDetailRequestQuerystring
        >({
            query: (query: GetLoanDetailRequestQuerystring) => ({
                method: "get",
                url: `/loan/detail`,
                params: {
                    orderNo: query.orderNo,
                },
            }),
        }),
        // NOTE: 上傳還款證明
        getRepayReceipt: builder.query<
            GetRepayReceiptResponse,
            GetRepayReceiptRequestQuerystring
        >({
            query: (query: GetRepayReceiptRequestQuerystring) => ({
                method: "get",
                url: `/repay/receipt`,
                params: {
                    orderNo: query.orderNo,
                },
            }),
        }),
        // NOTE: 取得還款證明
        postRepayReceipt: builder.mutation<PostRepayReceiptResponse, FormData>({
            query: (requestBody: FormData) => ({
                method: "post",
                url: `/repay/receipt`,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    // https://www.it145.com/9/182527.html
                    "Content-Type":
                        "multipart/form-data;boundary=" + new Date().getTime(),
                },
                data: requestBody,
            }),
        }),
        // NOTE: 取得可用付款方式
        getRepayTypes: builder.query<GetRepayTypesResponse, {}>({
            query: () => ({
                method: "get",
                url: `/repay/types`,
            }),
        }),
        // NOTE: 創建還款訂單
        postRepayCreate: builder.mutation<PostRepayCreateResponse,PostRepayCreateRequestBody>({
            query: (query: PostRepayCreateRequestBody) => ({
                method: "post",
                url: `/repay/create`,
                data: query,
            }),
        }),
        // NOTE: 绑定银行主卡或是電子錢包
        postBankBindSave: builder.mutation<{}, PostBankBindSaveRequest>({
            query: (requestBody: PostBankBindSaveRequest) => ({
                method: "post",
                url: `/bank-bind/save`,
                data: requestBody,
            }),
        }),
        // NOTE: 提交订单
        postLoanSubmitOrder: builder.mutation<{},PostLoanSubmitOrderRequestBody>({
            query: (requestBody: PostLoanSubmitOrderRequestBody) => ({
                method: "post",
                url: `/loan/submit-order`,
                data: requestBody,
            }),
        }),
        // NOTE: 借款产品推荐
        getLoanRecommend: builder.query<GetLoanRecommendProductsResponse, GetLoanRecommendRequestQuerystring>({
            query: (query: GetLoanRecommendRequestQuerystring) => ({
                method: "get",
                url: `/loan/recommend`,
                params: query
            }),
        }),
    }),
});

export const {
    useGetLoanDetailQuery,
    usePostRepayReceiptMutation,
    useGetRepayTypesQuery,
    usePostRepayCreateMutation,
    usePostBankBindSaveMutation,
    usePostLoanSubmitOrderMutation,
    useGetLoanRecommendQuery,
} = API;
