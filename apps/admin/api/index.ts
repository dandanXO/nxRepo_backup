import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import {GetMerchantListResponseData} from "../types/getMerchantList";
import {PostMerchantCreateRequestBody} from "../types/postMerchantCreate";
import {PutMerchantProps} from "../types/putMerchant";
import {LoginRequest, LoginResponse} from "../types/postLogin";

// const baseUrl = "/api/v2";
const baseUrl = "/hs/admin";

export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        // NOTE: POST /hs/admin/auth/login
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials: LoginRequest) => ({
                url: "/auth/login",
                method: "POST",
                data: {
                    phoneNo: credentials.phoneNo,
                    code: credentials.code,
                }
            })
        }),

         // NOTE: GET /hs/admin/merchant-manage/list 商戶管理列表
         getMerchantManageList: builder.query<GetMerchantListResponseData, null>({
            query: () => ({
              url: `/merchant-manage/list`,
              params: {},
              method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/merchant-manage/merchant 创建商戶
        postMerchantCreate: builder.mutation<{}, PostMerchantCreateRequestBody>({
            query: (requestBody: PostMerchantCreateRequestBody) => ({
                url: `/merchant-manage/merchant`,
                method: "post",
                data: requestBody,
            }),
        }),
         // NOTE: PUT /hs/admin/merchant-manage/merchant/{merchantId} 异动商戶
         putMerchantEdit: builder.mutation<{}, PutMerchantProps>({
            query: ({merchantId,...requestBody}: PutMerchantProps) => ({
                url: `/merchant-manage/merchant/${merchantId}`,
                method: "put",
                // params: { merchantId : requestBody.merchantId  },
                data: requestBody,
            }),
        }),
    }),
});

export const {
  useLoginMutation,
  usePrefetch,
  useGetMerchantManageListQuery,
  useLazyGetMerchantManageListQuery,
  usePostMerchantCreateMutation,
  usePutMerchantEditMutation
} = API;
