import { createApi } from '@reduxjs/toolkit/query/react';

import { GetIndexRequest } from '../indexService/GetIndexRequest';
import { GetIndexResponse } from '../indexService/GetIndexResponse';
import { GetNotificationResponse } from '../indexService/GetNotificationResponse';
import { GetLoanDetailRequest } from '../loanService/GetLoanDetailRequest';
import { GetLoanDetailResponse } from '../loanService/GetLoanDetailResponse';
import { GetLoanRecordListReponse } from '../loanService/GetLoanRecordListReponse';
import { GetLoanRecordListRequest } from '../loanService/GetLoanRecordListRequest';
import { GetRepayTypesRequest } from '../loanService/GetRepayTypesRequest';
import { GetRepayTypesResponse } from '../loanService/GetRepayTypesResponse';
import { GetUserProcessResponse } from '../loanService/GetUserProcessResponse';
import { PostRepayCreateRequest } from '../loanService/PostRepayCreateRequest';
import { PostRepayCreateResponse } from '../loanService/PostRepayCreateResponse';
import { PostRepayReceiptResponse } from '../loanService/PostRepayReceiptResponse';
import { GetBankCardListResponse } from '../userService/GetBankCardListResponse';
import { GetBindCardDropListResponse } from '../userService/GetBindCardDropListResponse';
import { GetCouponApplicableListRequest } from '../userService/GetCouponApplicableListRequest';
import { GetCouponApplicableListResponse } from '../userService/GetCouponApplicableListResponse';
import { GetCouponListRequest } from '../userService/GetCouponListRequest';
import { GetCouponListResponse } from '../userService/GetCouponResponse';
import { PostBangladeshBankBindSaveRequest } from '../userService/PostBangladeshBankBindSaveRequest';
import { PostBankBindSaveRequest } from '../userService/PostBankBindSaveRequest';
import { PostBankCardMainRequest } from '../userService/PostBankCardMainRequest';
import { PostPKBankBindSaveRequest } from '../userService/PostPKBankBindSaveRequest';
import { GetOTPCodeRequest } from '../userService/service/GetOTPCodeService';
import { TraceBehaviorRequest } from './TraceBehaviorRequest';
import axiosBaseQuery from './axiosBaseQuery';

export type LoginRequest = {
  msgCode: string;
  // 图片验证码

  phoneNo: string;
  // 手机号码
};

export type LoginResponse = {
  token: string;
};
export const APIV3 = createApi({
  reducerPath: 'apiv3',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api/v3',
  }),
  // keepUnusedDataFor: 0,
  // keepUnusedDataFor: 1,
  // refetchOnMountOrArgChange: 60,

  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (query: LoginRequest) => ({
        method: 'post',
        url: `/login`,
        data: query,
      }),
      // NOTE: cannot work
      // async onQueryStarted(arg, {
      //   dispatch,
      //   getState,
      //   queryFulfilled,
      //   requestId,
      //   extra,
      //   getCacheEntry }) {
      //   // `onStart` side-effect
      //   // dispatch(messageCreated('Fetching posts...'))
      //   console.log("onQueryStarted.arg", arg);
      // },
      // NOTE: cannot work
      async onCacheEntryAdded(
        arg,
        { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }
      ) {
        // console.log('onCacheEntryAdded.arg', arg);
      },
    }),

    // NOTE: /api/v3/loan/records 貸款紀錄列表
    getLoanRecordList: builder.query<GetLoanRecordListReponse, GetLoanRecordListRequest>({
      query: (query: GetLoanRecordListRequest) => ({
        method: 'get',
        url: `/loan/records`,
        params: query,
      }),
    }),
    // NOTE: /api/v3/coupon/applicable 取得可用优惠券列表
    getCouponApplicableList: builder.query<GetCouponApplicableListResponse, GetCouponApplicableListRequest>({
      query: (query: GetCouponApplicableListRequest) => ({
        method: 'get',
        url: `/coupon/applicable`,
        params: query,
      }),
    }),

    // NOTE:
    postTraceBehavior: builder.mutation<null, TraceBehaviorRequest>({
      query: (data: TraceBehaviorRequest) => ({
        method: 'post',
        url: `/trace/behavior`,
        data: data,
      }),
    }),

    // NOTE: /api/v3/coupon 個人列表取得优惠券列表
    getCouponList: builder.query<GetCouponListResponse, GetCouponListRequest>({
      query: (query: GetCouponListRequest) => ({
        method: 'get',
        url: `/coupon`,
        params: query,
      }),
    }),

    // NOTE: /api/v3/notification 取得推送用户讯息
    getNotificationList: builder.query<GetNotificationResponse, null>({
      query: (query: null) => ({
        method: 'get',
        url: `/notification`,
        params: query,
      }),
    }),
  }),
});

export const {
  useLazyGetLoanRecordListQuery,
  useLazyGetCouponApplicableListQuery,
  usePostTraceBehaviorMutation,
  useLazyGetCouponListQuery,
  useLazyGetNotificationListQuery,
} = APIV3;

export const API = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api/v2',
  }),
  // keepUnusedDataFor: 600,
  // keepUnusedDataFor: 1,
  // refetchOnMountOrArgChange: 60,
  endpoints: (builder) => ({
    // NOTE: 取得 OTP
    getOTPCode: builder.mutation<null, GetOTPCodeRequest>({
      query: (query: GetOTPCodeRequest) => ({
        method: 'post',
        url: `/login/otp-code`,
        data: query,
      }),
    }),
    // NOTE: 登出
    // logout: builder.mutation<null, LogoutRequest>({
    //   query: (query: LogoutRequest) => ({
    //     method: "post",
    //     url: `/login/otp-code`,
    //     data: query,
    //   }),
    // }),
    // NOTE: 借款首頁
    getIndex: builder.query<GetIndexResponse, GetIndexRequest>({
      query: (query: GetIndexRequest) => ({
        method: 'getiyihkln.  ',
        url: `/index`,
        params: query,
      }),
    }),
    // NOTE: /api/v2/user/bank-card 获取绑定银行卡
    getBankCardList: builder.query<GetBankCardListResponse, null>({
      query: (query: null) => ({
        method: 'get',
        url: `/user/bank-card`,
        params: query,
      }),
    }),

    // NOTE: /api/v2/loan/detail 貸款訂單詳情
    getLoanDetail: builder.query<GetLoanDetailResponse, GetLoanDetailRequest>({
      query: (query: GetLoanDetailRequest) => ({
        method: 'get',
        url: `/loan/detail`,
        params: query,
      }),
    }),
    // NOTE: 取得可用付款方式
    getRepayTypes: builder.query<GetRepayTypesResponse, GetRepayTypesRequest>({
      query: (query: GetRepayTypesRequest) => ({
        method: 'get',
        url: `/repay/types`,
        params: query,
      }),
    }),
    // NOTE: 創建還款訂單
    postRepayCreate: builder.mutation<PostRepayCreateResponse, PostRepayCreateRequest>({
      query: (query: PostRepayCreateRequest) => ({
        method: 'post',
        url: `/repay/create`,
        data: query,
      }),
    }),
    // NOTE: 取得還款證明
    postRepayReceipt: builder.mutation<PostRepayReceiptResponse, FormData>({
      query: (requestBody: FormData) => ({
        method: 'post',
        url: `/repay/receipt`,
        headers: {
          'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime(),
        },
        data: requestBody,
      }),
    }),
    // NOTE: /api/v2/kyc/bank-card/main 绑定主卡
    postBankCardMain: builder.mutation<null, PostBankCardMainRequest>({
      query: (requestBody: PostBankCardMainRequest) => ({
        method: 'post',
        url: `/kyc/bank-card/main`,
        data: requestBody,
      }),
    }),
    // NOTE: 绑定银行主卡或是電子錢包
    postBankBindSave: builder.mutation<{}, PostBankBindSaveRequest>({
      query: (requestBody: PostBankBindSaveRequest) => ({
        method: 'post',
        url: `/bank-bind/save`,
        data: requestBody,
      }),
    }),
    // NOTICE: Pakistan - 绑定银行主卡或是電子錢包
    postBankBindSaveToPK: builder.mutation<{}, PostPKBankBindSaveRequest>({
      query: (requestBody: PostPKBankBindSaveRequest) => ({
        method: 'post',
        url: `/bank-bind/save`,
        data: requestBody,
      }),
    }),
    // NOTICE: Bangladesh - 绑定银行主卡或是電子錢包
    postBankBindSaveToBangladesh: builder.mutation<{}, PostBangladeshBankBindSaveRequest>({
      query: (requestBody: PostBangladeshBankBindSaveRequest) => ({
        method: 'post',
        url: `/bank-bind/save`,
        data: requestBody,
      }),
    }),
    // NOTICE: Pakstan - 获取绑卡页信息
    getBindCardDropList: builder.query<GetBindCardDropListResponse, {}>({
      query: () => ({
        method: 'get',
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
        method: 'get',
        url: `/bank-user/process`,
      }),
    }),
  }),
});

export const {
  useGetLoanDetailQuery,
  useGetRepayTypesQuery,
  useLazyGetBankCardListQuery,

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
