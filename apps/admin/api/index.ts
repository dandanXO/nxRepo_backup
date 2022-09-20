import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { GetProductListResponse } from "../types/getProductList";
import { GetAvailableMerchantResponse } from "../types/getAvailbaleMerchant";
import { PostProductCreateRequestBody } from "../types/postProductCreate";
import { PutProductProps } from "../types/putProduct"
import {GetProductRequestQuery, GetProductQueryResponse} from "../types/getProduct";
import {PostUploadProductIcon} from "../types/postUploadProductIcon";
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
        // NOTE: GET /hs/admin/product-manage/merchant/available 可用商户
        getAvailableMerchantList: builder.query<GetAvailableMerchantResponse,null>({
          query: () => ({
            url: `/product-manage/merchant/available`,
            // params: {},
            method: "get",
          }),
        }),
        // NOTE: GET /hs/admin/product-manage/list 产品管理列表
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
        // NOTE: POST /hs/admin/product-manage/product 创建产品
        postProductCreate: builder.mutation<{}, PostProductCreateRequestBody>({
            query: (requestBody: PostProductCreateRequestBody) => ({
                url: `/product-manage/product`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: POST /hs/admin/product-manage/icon/upload ICON图标上传
        postUploadProductICON: builder.mutation<PostUploadProductIcon, FormData>({
          query: (requestBody: FormData) => ({
            url: `/product-manage/icon/upload`,
            method: "post",
            headers: {
              // "Content-Type": "multipart/form-data",
              // https://www.it145.com/9/182527.html
              "Content-Type":
                "multipart/form-data;boundary=" + new Date().getTime(),
            },
            data: requestBody,
            // data: {
            //     file: query.file,
            //     orderNo: query.orderNo,
            //     receipt: query.receipt,
            // }
          }),
        }),
        // NOTE: GET /hs/admin/product-manage/product 產品詳情
        getProduct: builder.query<GetProductQueryResponse, GetProductRequestQuery>({
          query: (arg: GetProductRequestQuery) => ({
            url: `/product-manage/product?productId=${arg.productId}`,
            method: 'get',
          })
        }),
        // NOTE: PUT /hs/admin/product-manage/product/{productId} 异动产品
        putProductEdit: builder.mutation<{}, PutProductProps>({
            query: (requestBody: PutProductProps) => ({
                url: `/product-manage/product`,
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
  useGetProductQuery,
  useLazyGetProductQuery,
  usePutProductEditMutation

} = API;
