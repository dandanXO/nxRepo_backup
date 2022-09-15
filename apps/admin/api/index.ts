import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import {GetProductInterestRatePairs, GetProductListResponse} from "../types/getProductList";

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
  }),
});
export const {
  useGetProductManageListQuery,
  useLazyGetProductManageListQuery,
  useLoginMutation,
  usePrefetch,
} = API;
