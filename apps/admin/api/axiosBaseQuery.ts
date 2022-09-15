import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
// import { Modal } from "@frontend/mobile/shared/ui";

// const alertModal = (message: string) =>
//   Modal.alert({
//     show: true,
//     mask: true,
//     title: "Error",
//     content: message,
//     confirmText: "Confirm",
//     maskClosable: true,
//     enableClose: false,
//     enableIcon: false,
//   });

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
    > =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });
        return {
          data: result.data,
        };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        const error = JSON.parse(JSON.stringify(err.response?.data)) as {
          code: number;
          message: string;
          data?: {
            msg?: string;
          };
        };
        const errorMessage = error?.data?.msg || error.message;
        // console.log(err);
        // console.log(error);
        // alertModal(errorMessage);
        // alertModal(err.message);
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
export default axiosBaseQuery;
