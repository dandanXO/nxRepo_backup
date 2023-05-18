import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../../modules/querystring/getToken';
import {AppEnvironment} from "../../modules/appEnvironment";
import {SentryModule} from "../../modules/sentry";

export const runAxios = async (
  baseUrl: string,
  url: string,
  method?: AxiosRequestConfig['method'],
  data?: AxiosRequestConfig['data'],
  params?: AxiosRequestConfig['params'],
  headers?: AxiosRequestConfig['headers']
) => {
  // NOTICE: REFACTOR ME
  // NOTE: 這邊得 catch error, otherwise other place cannot handle

  // NOTE: Dynamic get token
  const token = getToken();
  try {
    const config = {
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        ...headers,
      },
    };
    const result = await axios(config);
    console.log("runAxios.result", result)

    if(AppEnvironment.isDev()) {
      if(method === "get") {
        SentryModule.captureMessage(`API: ${method} ${url}`, {}, {
          params,
          data,
        })
      }
    }
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // console.log('error', error);
    if (axios.isAxiosError(error)) {
      // console.log("isAxiosError.error", error)
      // if (
        // (error.response as any).data?.code !== 404 ||
        // (error.response as any).data?.code !== 401
      // ) {
        // alertModal((error.response as any).data?.message);
      // }
    }
    throw error;
  }
};
