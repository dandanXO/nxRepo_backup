import axios, { AxiosRequestConfig } from 'axios';
import { AppLocalStorage } from '../persistant/localstorage';
import "../external/websocket/windowProtobuf";
import {userLogout} from "../usecase/userLogout";

import {appSlice} from "../reduxStore/appSlice";
import {AppLocalStorageKey} from "../persistant/AppLocalStorageKey";

export const gateway = async (
  dispatch: (action: any) => void,
  getState: () => any,
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
    const token =  AppLocalStorage.getItem(AppLocalStorageKey.token) ||''
    const config = {
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        Token: token,
        'Cache-Control': 'max-age=3',
        ...headers,
      },
    };
    const result = await axios(config);
    // NOTE: 系統維護中
    if(result?.data && result?.data?.code && result?.data?.code === 102015 ) {
      dispatch(appSlice.actions.setGlobalMessage(result?.data?.msg));
      userLogout()
    }

    if(result?.data && result?.data?.code && result?.data?.code === 400 ) {
      console.log("[gateway] token is invalid: ", token)
      // dispatch(appSlice.actions.setGlobalMessage("token is invalid"));
      dispatch(appSlice.actions.setGlobalMessage(result?.data?.msg));
      userLogout()
    }

    if(result?.data && result?.data?.code && result?.data?.code === 401 ) {
      console.log("[gateway] token is invalid: ", token)
      // dispatch(appSlice.actions.setGlobalMessage("token is invalid"));
      dispatch(appSlice.actions.setGlobalMessage(result?.data?.msg));
      userLogout()
    }

    // NOTE: other msg
    if(result?.data?.code !==null && result?.data?.code !== 200) {
      dispatch(appSlice.actions.setGlobalMessage(result?.data?.msg));
      return {
        error: "error",
        data: result?.data?.msg,
      };
    }
    // console.log('[gateway] runAxios.result', result);

    return {
      // success: true,
      data: result.data,
    };
  } catch (error) {
    console.log('[gateway] error', error);
    // throw error;
    return {
      error: "error",
      // data: result.data,
    };
  }
};
