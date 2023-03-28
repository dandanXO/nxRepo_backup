import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./base/axiosBaseQuery";
import { GetBankCardListResponse } from "./types/getBankCardList";
import { GetLoanRecordListRequestQuery, GetLoanRecordListReponse } from "./types/getLoanRecordList";
import {GetIndexRequest, GetIndexResponse} from "../flow/service";




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
    useLazyGetLoanRecordListQuery
} = API;
