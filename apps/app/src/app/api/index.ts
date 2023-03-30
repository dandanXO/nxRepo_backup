import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./base/axiosBaseQuery";
import { GetBankCardListResponse } from "./types/getBankCardList";
import { GetLoanRecordListRequestQuery, GetLoanRecordListReponse } from "./types/getLoanRecordList";
import { GetLoanDetailRequestQuery, GetLoanDetailResponse } from "./types/getLoanDetail";
import { GetRepayTypesRequestQuerystring, GetRepayTypesResponse } from "./types/getRepayTypes";
import { PostRepayCreateRequestBody, PostRepayCreateResponse } from './types/postRepayCreate';
import { PostRepayReceiptResponse } from "./types/postRepayReceipt";
import {GetIndexRequest, GetIndexResponse} from "./services/indexService/getIndexService";


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
        // NOTE: /api/v2/user/bank-card 获取绑定银行卡
        getBankCardList: builder.query<GetBankCardListResponse, null>({
            query: (query: null) => ({
                method: "get",
                url: `/user/bank-card`,
                params: query,
            }),
        }),
        // NOTE: /api/v2/loan/records 貸款紀錄列表
        getLoanRecordList: builder.query<GetLoanRecordListReponse, GetLoanRecordListRequestQuery>({
            query: (query: GetLoanRecordListRequestQuery) => ({
                method: "get",
                url: `/loan/records`,
                params: query,
            }),
        }),
        // NOTE: /api/v2/loan/detail 貸款訂單詳情
        getLoanDetail: builder.query<GetLoanDetailResponse, GetLoanDetailRequestQuery>({
            query: (query: GetLoanDetailRequestQuery) => ({
                method: "get",
                url: `/loan/detail`,
                params: query,
            }),
        }),
        // NOTE: 取得可用付款方式
        getRepayTypes: builder.query<GetRepayTypesResponse, GetRepayTypesRequestQuerystring>({
            query: (query: GetRepayTypesRequestQuerystring) => ({
                method: "get",
                url: `/repay/types`,
                params: query,
            }),
        }),
        // NOTE: 創建還款訂單
        postRepayCreate: builder.mutation<PostRepayCreateResponse, PostRepayCreateRequestBody>({
            query: (query: PostRepayCreateRequestBody) => ({
                method: "post",
                url: `/repay/create`,
                data: query,
            }),
        }),
        // NOTE: 取得還款證明
        postRepayReceipt: builder.mutation<PostRepayReceiptResponse, FormData>({
            query: (requestBody: FormData) => ({
                method: "post",
                url: `/repay/receipt`,
                headers: {
                    "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
                },
                data: requestBody,
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
    useLazyGetBankCardListQuery,
    useLazyGetLoanRecordListQuery,
    useLazyGetLoanDetailQuery,
    useLazyGetRepayTypesQuery,
    usePostRepayCreateMutation,
    usePostRepayReceiptMutation
} = API;
