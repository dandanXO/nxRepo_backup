import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { GetProductListResponse } from "../types/getProductList";
import { GetAvailableMerchantResponse } from "../types/getAvailbaleMerchant";
import { PostProductCreateRequestBody } from "../types/postProductCreate";
import { PutProductProps } from "../types/putProduct"
// const baseUrl = "/api/v2";
const baseUrl = "/hs/admin";

interface LoginRequest {
  phoneNo: string;
  code: string;
}
interface LoginResponse {
  code?: number;
  data?: unknown;
  message?: string;
}
export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
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
        getProductManageList: builder.query<
            GetProductListResponse,
            null
        >({
            query: () => ({
                url: `/product-manage/list`,
                params: {
                },
                method: "get",
            }),
        }),
        getAvailableMerchantList: builder.query<GetAvailableMerchantResponse,null>({
            query: () => ({
                url: `/hs/admin/product-manage/merchant/available`,
                // params: {},
                method: "get",
            }),
        }),
        postProductCreate: builder.mutation<{}, PostProductCreateRequestBody>({
            query: (requestBody: PostProductCreateRequestBody) => ({
                url: `/hs/admin/product-manage/product`,
                method: "post",
                data: requestBody,
            }),
        }),
        putProductEdit: builder.mutation<{}, PutProductProps>({
            query: (requestBody: PutProductProps) => ({
                url: `/hs/admin/product-manage/product`,
                method: "put",
                params: { productId: requestBody.productId },
                data: requestBody,
            }),
        }),
    }),
});
export const {
  useGetProductManageListQuery,
  useLazyGetProductManageListQuery,
  useLoginMutation,
  usePrefetch,
  useGetAvailableMerchantListQuery,
  usePostProductCreateMutation,
  usePutProductEditMutation

} = API;
