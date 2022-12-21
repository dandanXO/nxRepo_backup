import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import queryString from "query-string";
import { Modal } from "@frontend/mobile/shared/ui";
import i18next from "i18next";


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
            const parsedQueryString = queryString.parse(location.search);
            const TOKEN = parsedQueryString.token
                ? (parsedQueryString.token as string)
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
            alertModal(errorMessage);
            throw axiosError;
            // alertModal(err.message);
            // return {
            //     error: {
            //         status: err.response?.status,
            //         data: err.response?.data || err.message,
            //     },
            // };
        }
    };
export default axiosBaseQuery;
