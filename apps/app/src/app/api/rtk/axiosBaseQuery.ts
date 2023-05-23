import { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { AppFlag } from '../../../environments/flag';
import { SentryModule } from '../../modules/sentry';
import { alertModal } from '../base/alertModal';
import { runAxios } from '../base/runAxios';

export interface CustomAxiosError {
  status: any;
  data: any;
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const resultData = await runAxios(baseUrl, url, method, data, params, headers);
      console.log('[app] resultData:', resultData);
      return resultData;
    } catch (axiosError) {
      console.log('error-2', axiosError);

      // NOTE: err
      const err: AxiosError = axiosError as AxiosError;
      console.info('[app] err:', err);

      // NOTICE: err.response.status !== 200
      // if (
      //   (err.response as any).data?.code !== 404 ||
      //   (err.response as any).data?.code !== 401
      // ) {
      //
      // }

      // NOTE: backendCustomError
      const backendCustomError = err.response?.data as {
        code: number;
        data?: {
          msg?: string;
        };
        message: string;
      };
      const backendCustomErrorMessage = backendCustomError?.data?.msg || backendCustomError.message;
      console.info('[app] customErrorMessage:', backendCustomErrorMessage);

      console.log(err.config.url);
      // NOTICE: REFACTOR ME 避免頻繁 REQUEST 通知
      if (err.config.url !== '/api/v2/loan/quota/refresh' && err.config.url !== '/api/v3/trace/behavior') {
        alertModal(backendCustomErrorMessage);
      }

      // NOTE: frontendError
      const frontendError = new Error();
      frontendError.name = backendCustomErrorMessage;
      frontendError.message = JSON.stringify({
        originalError: {
          code: err.code,
          message: err.message,
          name: err.name,
          stack: err.stack,
        },
        backendCustomError,
      });

      if (AppFlag.enableSentry) {
        SentryModule.captureException(frontendError);
      }
      console.info('[app] frontendError:', frontendError);

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
      // throw err;
    }
  };

export default axiosBaseQuery;
