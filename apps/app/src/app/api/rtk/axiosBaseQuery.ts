import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import {alertModal} from "../base/alertModal";
import {runAxios} from "../base/runAxios";
import {AppFlag} from "../../app";
import * as Sentry from "@sentry/react";

export interface CustomAxiosError {
  status: any;
  data: any;
}

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
            const resultData = runAxios(baseUrl, url, method, data, params, headers);
            console.log("resultData", resultData);
            return resultData
        } catch (axiosError) {
            console.log("axiosError1");
            console.log("axiosError", axiosError);
            const err = axiosError as AxiosError;
            console.log("err.toJSON()", err.toJSON());

            const customError = JSON.parse(JSON.stringify(err.response?.data)) as {
                code: number;
                data?: {
                  msg?: string;
                };
                message: string;
            };
            const customErrorMessage = customError?.data?.msg || customError.message;
            // console.log(err);
            // console.log(error);

            // NOTICE: REFACTOR ME 避免頻繁 REQUEST 通知
            if(err.config.url !== "/api/v2/loan/quota/refresh") {
              alertModal(customErrorMessage);
            }

            const error = new Error();
            // NOTE: 後端客製化訊息
            error.name = customError.message;
            error.message = JSON.stringify({
              originalError: {
                code: err.code,
                message: err.message,
                name: err.name,
                stack: err.stack,
              },
              customError
            })
            if(AppFlag.enableSentry) {
              Sentry.captureException(error);
            }
            console.info("[app][api] error", error);

            alertModal(err.message);

            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };



export default axiosBaseQuery;
