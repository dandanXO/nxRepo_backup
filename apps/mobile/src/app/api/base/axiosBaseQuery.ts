import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import queryString from "query-string";
import { Modal } from "@frontend/mobile/shared/ui";
import i18next from "i18next";
import * as Sentry from "@sentry/react";
import {AppFlag} from "../../App";

export interface CustomAxiosError {
  status: any;
  data: any;
}

const alertModal = (message: string) =>
    Modal.alert({
        show: true,
        mask: true,
        title: i18next.t("modal.Error") as string,
        content: message,
        confirmText: i18next.t("modal.Confirm") as string,
        maskClosable: true,
        enableClose: false,
        enableIcon: false,
    });

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
        let onUploadPercent = 0;
        let onDownloadPercent = 0;
        const getToken = (): string => {
            const parsedQueryString = queryString.parse(window.location.search);
            const TOKEN = parsedQueryString["token"]
                ? (parsedQueryString["token"] as string)
                : "";
            if (!TOKEN) {
                // console.log("error");
            }
            return TOKEN;
        };
        const token = getToken();
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    ...headers,
                },
                onUploadProgress: (progressEvent) => {
                    // console.log({ progressEvent });
                    if (progressEvent.lengthComputable) {
                        const complete =
                            ((progressEvent.loaded / progressEvent.total) *
                                100) |
                            0;
                        onUploadPercent = complete;
                        if (complete >= 100) {
                            onUploadPercent = 0;
                        }
                        // console.log("baseUrl + url: ", baseUrl + url);
                        // console.log("percent", onUploadPercent);
                    }
                },
                onDownloadProgress: function (progressEvent) {
                    // 對原生進度事件的處理
                    onDownloadPercent =
                        (progressEvent.loaded / progressEvent.total) * 100; // 計算進度
                    const loadingText = "進度：" + onDownloadPercent + "%";
                    // console.log(loadingText);
                },
            });
            return {
                data: result.data,
                onUploadProgress: onUploadPercent,
                onDownloadProgress: onDownloadPercent,
            };
        } catch (axiosError) {
            console.log("axiosError", axiosError);
            const err = axiosError as AxiosError;
            // console.log("err.toJSON()", err.toJSON());
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

            console.info(error);
            // throw axiosError;
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
