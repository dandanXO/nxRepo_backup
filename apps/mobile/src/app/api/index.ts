import {createApi} from "@reduxjs/toolkit/query/react";
import {GetLoanDetailRequestQuerystring, GetLoanDetailResponse,} from "./getLoanDetail";
import axiosBaseQuery from "./base/axiosBaseQuery";
import {GetRepayReceiptRequestQuerystring, GetRepayReceiptResponse,} from "./getRepayReceipt";
import {PostRepayReceiptResponse} from "./postRepayReceipt";
import {GetRepayTypesRequestQuerystring, GetRepayTypesResponse} from "./getRepayTypes";
import {PostRepayCreateRequestBody, PostRepayCreateResponse,} from "./postRepayCreate";
import {PostBangladeshBankBindSaveRequest, PostBankBindSaveRequest, PostPKBankBindSaveRequest} from "./postBankBindSave";
import {PostLoanSubmitOrderRequestBody} from "./postLoanSubmitOrder";
import {GetLoanRecommendProductsResponse, GetLoanRecommendRequestQuerystring} from "./getLoanRecommend";
import {GetBindCardDropListResponse} from "./GetBindCardDropList";
import {GetPersonalLoanRecommendRequestQuerystring, GetPersonalLoanRecommendResponse} from "./GetPersonalLoanRecommend";
import {PostLoanQuotaRefreshResponse} from "./PostLoanQuotaRefreshResponse";
import {PostApplyProductRequest} from "./PostApplyProductRequest";

interface GetActivityAdsRequest {
  phoneNo: string;
}
interface ActivityAd {
  action: "APPLY_LOAN" | "POP_URL";
  actionUrl: string;
  payload: any;
}
interface GetActivityAdsResponse {
  name: string;
  templateType: number;
  contents: ActivityAd[];
}
export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "/api/v2",
    }),
    // keepUnusedDataFor: 600,
    // refetchOnMountOrArgChange: 60,
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
        getRepayTypes: builder.query<GetRepayTypesResponse, GetRepayTypesRequestQuerystring>({
            query: (query: GetRepayTypesRequestQuerystring) => ({
                method: "get",
                url: `/repay/types`,
                params: {
                    orderNo: query.orderNo,
                },
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
        // NOTICE: Pakstan - 获取绑卡页信息
        getBindCardDropList: builder.query<GetBindCardDropListResponse, {}>({
          query: () => ({
            method: "get",
            url: `/bank-bind/info`,
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
        // NOTE: 提交订单
        postLoanSubmitOrder: builder.mutation<{},PostLoanSubmitOrderRequestBody>({
            query: (requestBody: PostLoanSubmitOrderRequestBody) => ({
                method: "post",
                url: `/loan/submit-order`,
                data: requestBody,
            }),
        }),
        // NOTICE: deprecated
        // NOTE: 借款产品推荐
        getLoanRecommend: builder.query<GetLoanRecommendProductsResponse, GetLoanRecommendRequestQuerystring>({
            query: (query: GetLoanRecommendRequestQuerystring) => ({
                method: "get",
                url: `/loan/recommend`,
                params: query
            }),
        }),
        // NOTE: 個人借款推荐
        getPersonalLoanRecommend: builder.query<GetPersonalLoanRecommendResponse, GetPersonalLoanRecommendRequestQuerystring>({
          query: (query: GetPersonalLoanRecommendRequestQuerystring) => ({
            method: "get",
            url: `/product/personal-recommend`,
            params: query,
          }),
        }),
        // NOTE: 借款額度刷新
        postLoanQuotaRefresh: builder.mutation<PostLoanQuotaRefreshResponse, null>({
          query: () => ({
            method: "post",
            url: `/loan/quota/refresh`,
          }),
        }),
        // NOTE: 個人推薦商品借款
        postApplyProduct: builder.mutation<null, PostApplyProductRequest>({
          query: (requestBody: PostApplyProductRequest) => ({
            method: "post",
            url: `/product/apply`,
            data: requestBody,
          })
        }),
        // NOTE: 取得活動廣告橫幅內容
        getActivityAds: builder.query<GetActivityAdsResponse, GetActivityAdsRequest>({
          query: (query: GetActivityAdsRequest) => ({
            method: "get",
            url: `/activity`,
            params: query
          })
        })

    }),
});

export const {
    useGetLoanDetailQuery,
    usePostRepayReceiptMutation,
    useGetRepayTypesQuery,
    useLazyGetRepayTypesQuery,
    usePostRepayCreateMutation,
    useGetBindCardDropListQuery,
    useLazyGetBindCardDropListQuery,
    usePostBankBindSaveMutation,
    usePostBankBindSaveToPKMutation,
    usePostBankBindSaveToBangladeshMutation,
    usePostLoanSubmitOrderMutation,
    useGetLoanRecommendQuery,
    useLazyGetActivityAdsQuery,
    useGetPersonalLoanRecommendQuery,
    useLazyGetPersonalLoanRecommendQuery,
    usePostLoanQuotaRefreshMutation,
    usePostApplyProductMutation,
} = API;
