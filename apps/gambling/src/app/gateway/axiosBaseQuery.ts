import { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import axios from "axios";
import {gateway} from "./index";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
    // { signal, dispatch, getState },
    // extraOptions,
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    { signal: unknown; dispatch: unknown; getState: unknown; }
    // unknown
  > =>
  {
    // console.log("getState", getState())
    return async ({ url, method, data, params, headers }, {
      dispatch,
      getState,
      signal,
    }) => {

      try {
        const resultData = await gateway(
          dispatch,
          getState,
          baseUrl,
          url,
          method,
          data,
          params,
          headers
        );
        // console.log('[app] resultData:', resultData);
        return resultData as any;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const err: AxiosError = error as AxiosError;
          console.log('[gateway][axios] error', err);
        } else {
          console.log('[gateway] error', error);
        }
      }
    }
  }
