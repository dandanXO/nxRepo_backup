import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import {GetMerchantListResponseData} from "../types/getMerchantList";
import {PostMerchantCreateRequestBody} from "../types/postMerchantCreate";
import {PutMerchantProps} from "../types/putMerchant";

// const baseUrl = "/api/v2";
const baseUrl = "/hs/admin";

export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
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
  usePrefetch,
  useGetMerchantManageListQuery,
  useLazyGetMerchantManageListQuery,
  usePostMerchantCreateMutation,
  usePutMerchantEditMutation
} = API;
