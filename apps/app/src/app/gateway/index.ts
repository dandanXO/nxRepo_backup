import axios, { AxiosRequestConfig } from 'axios';
import {push} from "@lagunovsky/redux-react-router";
import {MonitorUsecaseFlow} from "../uiFlowUsercaseMoniter";
import { getToken } from '../persistant/getToken';
import {alertModal} from "../ui/components/alertModal";
import {PageOrModalPathEnum} from "../ui/PageOrModalPathEnum";
import {appStore} from "../reduxStore";

let login401 = false;

export const gateway = async (
  baseUrl: string,
  url: string,
  method?: AxiosRequestConfig['method'],
  data?: AxiosRequestConfig['data'],
  params?: AxiosRequestConfig['params'],
  headers?: AxiosRequestConfig['headers']
) => {
  // white list
  // if(logout) {
  //   return;
  // }

  // NOTICE: REFACTOR ME
  // NOTE: 這邊得 catch error, otherwise other place cannot handle

  // NOTE: Dynamic get token

  try {

    const token = getToken();
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
    console.log('runAxios.result', result);

    MonitorUsecaseFlow.debugAPIConnection({
      method,
      url,
      params,
      data,
      result,
    })
    //
    // if (
    //   result.config.url !== '/api/v2/login'
    // ) {
    //   // 基本上不會遇到
    //   login401 = false;
    // }

    // result.config.url !== '/v3/open-index'
    if(login401) {
      console.log("阻止後續請求");
      return {
        success: false,
        data: null,
      }
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.log('[runAxios] error', error);
    if (axios.isAxiosError(error)) {
      // (error as any)?.response?.data?.code === 404
      if((error as any)?.response?.data?.code === 401) {
        if(!login401) {
          login401 = true;
          alertModal((error as any)?.response?.data?.message);
          appStore.dispatch(push(PageOrModalPathEnum.LoginPage));
        } else {
          console.log("不跳 401 alert")
        }
      } else {
        alertModal((error?.response?.data as any)?.message as string);
      }
    }
    throw error;
  }
};
