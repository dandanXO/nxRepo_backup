import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { GetBankCardListResponse } from "./types/getBankCardList";
import { GetRepayTypesResponse } from "../loanService/GetRepayTypesResponse";
import { PostBankCardMainRequest } from "../userService/PostBankCardMainRequest";
import { GetBindCardDropListResponse } from "../userService/GetBindCardDropListResponse";
import {GetUserProcessResponse} from "../loanService/GetUserProcessResponse";
import {GetIndexRequest} from "../indexService/GetIndexRequest";
import {GetIndexResponse} from "../indexService/GetIndexResponse";
import {PostBankBindSaveRequest} from "../userService/PostBankBindSaveRequest";
import {PostPKBankBindSaveRequest} from "../userService/PostPKBankBindSaveRequest";
import {PostBangladeshBankBindSaveRequest} from "../userService/PostBangladeshBankBindSaveRequest";
import {GetLoanDetailRequest} from "../loanService/GetLoanDetailRequest";
import {GetLoanDetailResponse} from "../loanService/GetLoanDetailResponse";
import {GetLoanRecordListRequest} from "../loanService/GetLoanRecordListRequest";
import {GetLoanRecordListReponse} from "../loanService/GetLoanRecordListReponse";
import {GetRepayTypesRequest} from "../loanService/GetRepayTypesRequest";
import {PostRepayReceiptResponse} from "../loanService/PostRepayReceiptResponse";
import {PostRepayCreateRequest} from "../loanService/PostRepayCreateRequest";
import {PostRepayCreateResponse} from "../loanService/PostRepayCreateResponse";


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
        getLoanRecordList: builder.query<GetLoanRecordListReponse, GetLoanRecordListRequest>({
            query: (query: GetLoanRecordListRequest) => ({
                method: "get",
                url: `/loan/records`,
                params: query,
            }),
        }),
        // NOTE: /api/v2/loan/detail 貸款訂單詳情
        getLoanDetail: builder.query<GetLoanDetailResponse, GetLoanDetailRequest>({
            query: (query: GetLoanDetailRequest) => ({
                method: "get",
                url: `/loan/detail`,
                params: query,
            }),
        }),
        // NOTE: 取得可用付款方式
        getRepayTypes: builder.query<GetRepayTypesResponse, GetRepayTypesRequest>({
            query: (query: GetRepayTypesRequest) => ({
                method: "get",
                url: `/repay/types`,
                params: query,
            }),
        }),
        // NOTE: 創建還款訂單
        postRepayCreate: builder.mutation<PostRepayCreateResponse, PostRepayCreateRequest>({
            query: (query: PostRepayCreateRequest) => ({
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
        // NOTE: /api/v2/kyc/bank-card/main 绑定主卡
        postBankCardMain: builder.mutation<null, PostBankCardMainRequest>({
            query: (requestBody: PostBankCardMainRequest) => ({
                method: "post",
                url: `/kyc/bank-card/main`,
                data: requestBody,
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
        // NOTICE: Pakistan - 绑定银行主卡或是電子錢包
        postBankBindSaveToPK: builder.mutation<{}, PostPKBankBindSaveRequest>({
            query: (requestBody: PostPKBankBindSaveRequest) => ({
                method: "post",
                url: `/bank-bind/save`,
                data: requestBody,
            }),
        }),
        // NOTICE: Bangladesh - 绑定银行主卡或是電子錢包
        postBankBindSaveToBangladesh: builder.mutation<{}, PostBangladeshBankBindSaveRequest>({
            query: (requestBody: PostBangladeshBankBindSaveRequest) => ({
                method: "post",
                url: `/bank-bind/save`,
                data: requestBody,
            }),
        }),
        // NOTICE: Pakstan - 获取绑卡页信息
        getBindCardDropList: builder.query<GetBindCardDropListResponse, {}>({
            query: () => ({
              method: "get",
              url: `/bank-bind/info`,
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
        // NOTICE: 取得用戶審核紀錄
        getUserProcess: builder.query<GetUserProcessResponse, {}>({
          query: () => ({
            method: "get",
            url: `/bank-user/process`,
          }),
        }),
    }),
});

export const {
    useLazyGetIndexQuery,
    useLazyGetBankCardListQuery,
    useLazyGetLoanRecordListQuery,
    useLazyGetLoanDetailQuery,
    useLazyGetRepayTypesQuery,
    usePostRepayCreateMutation,
    usePostRepayReceiptMutation,
    usePostBankCardMainMutation,
    usePostBankBindSaveMutation,
    usePostBankBindSaveToPKMutation,
    usePostBankBindSaveToBangladeshMutation,
    useLazyGetBindCardDropListQuery,
    useLazyGetUserProcessQuery,
} = API;
