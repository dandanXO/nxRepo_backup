import {BaseQueryFn} from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axios from "axios";
import queryString from "query-string";


let percent = 0;
const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
        },
        unknown,
        unknown
        > =>
        async ({ url, method, data, params, headers }) => {
            const getToken = () => {
                const parsedQueryString = queryString.parse(location.search);
                const TOKEN = parsedQueryString.token ? parsedQueryString.token as string: undefined;
                if(!TOKEN) {
                    console.log("error");
                }
                return TOKEN
            };
            try {
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': TOKEN,
                        'Authorization': getToken(),
                        ...headers,
                    },
                    onUploadProgress: (progressEvent) => {

                        if(progressEvent.lengthComputable) {
                            var complete = ((progressEvent.loaded / progressEvent.total) * 100 | 0)
                            percent = complete;
                            if(complete >= 100) {
                                percent = 0;
                            }
                            console.log("baseUrl + url: ", baseUrl + url);
                            console.log("percent", percent);
                        }
                    }
                })
                return { data: result.data, percent,  }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                console.log("err", err);
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
export default axiosBaseQuery;
