import axios, { AxiosRequestConfig } from 'axios';
import { AppLocalStorage } from '../persistant/localstorage';
import "../external/websocket/windowProtobuf";
import {connect} from "./socket";
import {userLogout} from "../usecase/userLogout";
import {unknown} from "zod";
import {appSlice} from "../reduxStore/appSlice";

if(AppLocalStorage.getItem("token")) {
  const url = AppLocalStorage.getItem("ip");
  const token = AppLocalStorage.getItem("token");
  if(url && token) connect(url, token);
}


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
    const token =  AppLocalStorage.getItem("token") ||''
    const config = {
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        Token: token,
        ...headers,
      },
    };
    const result = await axios(config);

    // NOTE: 系統維護中
    if(result.data && result.data.code && result.data.code === 102015 ) {
      dispatch(appSlice.actions.setGlobalMessage(result.data?.msg));
      userLogout()
    }

    if(result.data && result.data.code && result.data.code === 400 ) {
      console.log("token is invalid: ", token)
      // dispatch(appSlice.actions.setGlobalMessage("token is invalid"));
      dispatch(appSlice.actions.setGlobalMessage(result.data?.msg));
      userLogout()
    }
    console.log('runAxios.result', result);
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
