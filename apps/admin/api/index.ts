import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import {GetProductInterestRatePairs, GetProductListResponse} from "../types/getProductList";

// const baseUrl = "/api/v2";
const baseUrl = "/hs/admin";

export const API = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getProductManageList: builder.query<
      GetProductListResponse,
      {}
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
  useLazyGetProductManageListQuery
} = API;
