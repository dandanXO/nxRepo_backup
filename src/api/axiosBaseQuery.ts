import {BaseQueryFn} from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axios from "axios";
import queryString from "query-string";

const parsedQueryString = queryString.parse(location.search);
// console.log("parsedQueryString", parsedQueryString);

const TOKEN = parsedQueryString.token ? parsedQueryString.token as string: undefined;
if(!TOKEN) {
    console.log("error");
}

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
            try {
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': TOKEN,
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
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
export default axiosBaseQuery;
