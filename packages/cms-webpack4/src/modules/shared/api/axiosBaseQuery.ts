import {BaseQueryFn} from "@reduxjs/toolkit/query";
import type {AxiosError, AxiosRequestConfig} from "axios";
import axios from "axios";
import { Modal } from "antd";

// const alertModal = (message: string) => {
    // const modal = Modal.error({
    //     mask: true,
    //     title: "Error",
    //     content: message,
    //     maskClosable: true,
    //     onOk: () => {
            // console.log("test", test)
            // modal.update({
            //     title: "test"
            // })
            // modal.destroy();
            // setTimeout(() => {
                // clearInterval(timer);
                // modal.destroy();
            // },1000);
        // },
        // onCancel: (close) => {
        //     console.log("close")
        //     close();
        // }
    // });
    // console.log("modal", modal)
// }

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

        if(result.data.code === 400) {
            result.data = undefined
        }
        return {
          data: result.data,
        };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        // const error = JSON.parse(JSON.stringify(err.response?.data)) as {
        //   code: number;
        //   message: string;
        //   data?: {
        //     msg?: string;
        //   };
        // };
        // const errorMessage = error?.data?.msg || error.message;
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
