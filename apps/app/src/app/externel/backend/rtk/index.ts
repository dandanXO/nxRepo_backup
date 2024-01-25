import { createApi } from '@reduxjs/toolkit/query/react';

import { GetIndexRequest } from '../indexService/GetIndexRequest';
import { GetIndexResponse } from '../indexService/GetIndexResponse';
import { GetNotificationResponse } from '../indexService/GetNotificationResponse';
import { GetLoanDetailRequest } from '../loanService/GetLoanDetailRequest';
import { GetLoanDetailResponse } from '../loanService/GetLoanDetailResponse';
import { GetLoanRecordListReponse } from '../loanService/GetLoanRecordListReponse';
import { GetLoanRecordListRequest } from '../loanService/GetLoanRecordListRequest';
import { GetRepayPayInfoResponse } from '../loanService/GetRepayPayInfoResponse';
import { GetRepayTypesRequest } from '../loanService/GetRepayTypesRequest';
import { GetRepayTypesResponse } from '../loanService/GetRepayTypesResponse';
import { GetReservationRequest } from '../loanService/GetReservationRequest';
import { GetReservationResponse } from '../loanService/GetReservationResponse';
import { GetUserProcessResponse } from '../loanService/GetUserProcessResponse';
import { PostRepayCreateRequest } from '../loanService/PostRepayCreateRequest';
import { PostRepayCreateResponse } from '../loanService/PostRepayCreateResponse';
import { PostRepayReceiptResponse } from '../loanService/PostRepayReceiptResponse';
import { PostReservationSubmitRequest } from '../loanService/PostReservationSubmitRequest';
import { GetBankCardListResponse } from '../userService/GetBankCardListResponse';
import { GetBindCardDropListResponse } from '../userService/GetBindCardDropListResponse';
import { GetCouponApplicableListRequest } from '../userService/GetCouponApplicableListRequest';
import { GetCouponApplicableListResponse } from '../userService/GetCouponApplicableListResponse';
import { GetCouponListRequest } from '../userService/GetCouponListRequest';
import { GetCouponListResponse } from '../userService/GetCouponResponse';
import { GetFeedbackCategoriesResponse } from '../userService/GetFeedbackCategories';
import { GetMXBindCardDropListResponse } from '../userService/GetMXBindCardDropListResponse';
import { GetPHBindCardDropListResponse } from '../userService/GetPHBindCardDropListResponse';
import { LoginRequest } from '../userService/LoginRequest';
import { LoginResponse } from '../userService/LoginResponse';
import { PostBangladeshBankBindSaveRequest } from '../userService/PostBangladeshBankBindSaveRequest';
import { PostBankBindSaveRequest } from '../userService/PostBankBindSaveRequest';
import { PostBankCardMainRequest } from '../userService/PostBankCardMainRequest';
import { PostFeedbackRequest } from '../userService/PostFeedbackRequest';
import { PostMXBankBindSaveRequest } from '../userService/PostMXBankBindSaveRequest';
import { PostPHBankBindSaveRequest } from '../userService/PostPHBankBindSaveRequest';
import { PostPKBankBindSaveRequest } from '../userService/PostPKBankBindSaveRequest';
import { PostUserLogoutRequest } from '../userService/PostUserLogoutRequest';
import { PostUserLogoutResponse } from '../userService/PostUserLogoutResponse';
import { GetOTPCodeRequest } from '../userService/service/GetOTPCodeService';
import { TraceBehaviorRequest } from './TraceBehaviorRequest';
import axiosBaseQuery from './axiosBaseQuery';

export const APIV3 = createApi({
  reducerPath: 'apiv3',
  // keepUnusedDataFor: 3, // 缓存时间为3秒
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
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {
        // console.log('onCacheEntryAdded.arg', arg);
      },
    }),
    // NOTE: /api/v3/loan/records 貸款紀錄列表
    getLoanRecordList: builder.query<
      GetLoanRecordListReponse,
      GetLoanRecordListRequest
    >({
      query: (query: GetLoanRecordListRequest) => ({
        method: 'get',
        url: `/loan/records`,
        params: query,
      }),
    }),
    // NOTE: /api/v3/coupon/applicable 取得可用优惠券列表
    getCouponApplicableList: builder.query<
      GetCouponApplicableListResponse,
      GetCouponApplicableListRequest
    >({
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
    // NOTE: /api/v3/feedback/categories 取得feadback問題種類
    getFeedbackCategories: builder.query<GetFeedbackCategoriesResponse, null>({
      query: (query: null) => ({
        method: 'get',
        url: `/feedback/categories`,
        params: query,
      }),
    }),
    // NOTE: /api/v3/feedback 新增用戶回饋
    postFeedback: builder.mutation<null, PostFeedbackRequest>({
      query: (data: PostFeedbackRequest) => ({
        method: 'post',
        url: `/feedback`,
        data: data,
      }),
    }),
    // NOTE: /api/v3/reservation 预约借款页面
    getReservation: builder.query<
      GetReservationResponse,
      GetReservationRequest
    >({
      query: (query: GetReservationRequest) => ({
        method: 'get',
        url: `/reservation`,
        params: query,
      }),
    }),
    // NOTE: /api/v3/reservation/submit 提交还款后预约
    postReservationSubmit: builder.mutation<null, PostReservationSubmitRequest>(
      {
        query: (data: PostReservationSubmitRequest) => ({
          method: 'post',
          url: `/reservation/submit`,
          data: data,
        }),
      }
    ),
    // NOTICE: Mexico - 获取绑卡页信息
    getMXBindCardDropList: builder.query<GetMXBindCardDropListResponse, {}>({
      query: () => ({
        method: 'get',
        url: `/bank-bind/info`,
      }),
    }),
    // NOTICE: Philippines - 获取绑卡页信息
    getPHBindCardDropList: builder.query<GetPHBindCardDropListResponse, null>({
      query: () => ({
        method: 'get',
        url: `/bank-bind/info`,
      }),
    }),
    // NOTICE: Pakistan - 绑定银行主卡或是電子錢包
    postBankBindSaveToMX: builder.mutation<{}, PostMXBankBindSaveRequest>({
      query: (requestBody: PostMXBankBindSaveRequest) => ({
        method: 'post',
        url: `/bank-bind/save`,
        data: requestBody,
      }),
    }),
    // NOTICE: Philippines - 绑定電子錢包
    postBankBindSaveToPH: builder.mutation<null, PostPHBankBindSaveRequest>({
      query: (requestBody: PostPHBankBindSaveRequest) => ({
        method: 'post',
        url: `/bank-bind/save`,
        data: requestBody,
      }),
    }),

    // NOTICE: /repay/pay-info載入付款資訊
    getRepayPayInfo: builder.query<GetRepayPayInfoResponse, { hash: string }>({
      query: (queryParameters: { hash: string }) => ({
        method: 'get',
        url: `/repay/pay-info?hash=${queryParameters.hash}`,
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
  useLazyGetFeedbackCategoriesQuery,
  usePostFeedbackMutation,
  useLazyGetReservationQuery,
  usePostReservationSubmitMutation,
  useLazyGetMXBindCardDropListQuery,
  useGetPHBindCardDropListQuery,
  useLazyGetRepayPayInfoQuery,
} = APIV3;

export const API = createApi({
  reducerPath: 'api',
  // keepUnusedDataFor: 3, // 缓存时间为3秒
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
    logout: builder.mutation<PostUserLogoutResponse, PostUserLogoutRequest>({
      query: (requestData: PostUserLogoutRequest) => ({
        method: 'post',
        url: `/login/user/logout`,
        data: requestData,
      }),
    }),
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
    postRepayCreate: builder.mutation<
      PostRepayCreateResponse,
      PostRepayCreateRequest
    >({
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
          'Content-Type':
            'multipart/form-data;boundary=' + new Date().getTime(),
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
    postBankBindSaveToBangladesh: builder.mutation<
      {},
      PostBangladeshBankBindSaveRequest
    >({
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
        url: `/user/process`,
      }),
    }),
    // NOTE: DELTETE /api/v2/account 刪除帳號
    deleteUser: builder.mutation<null, null>({
      query: (requestBody: null) => ({
        url: `/account`,
        method: 'delete',
        data: requestBody,
      }),
    }),
  }),
});

export const {
  useLogoutMutation,
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
  useDeleteUserMutation,
} = API;
