import queryString from 'query-string';

import {NativeAppInfo} from './nativeAppInfo';
import {AppLocalStorage} from "../persistant/localstorage";

export const getToken = (): string => {
  // NOTE: SimpleWebview, IndexWebview token 根據 location.search
  const parsedQueryString = queryString.parse(window.location.search);

  let token = "";
  if(parsedQueryString['token']) {
    token = parsedQueryString['token'] as string

  } else if(NativeAppInfo.token) {
    token = NativeAppInfo.token;

  } else if(AppLocalStorage.getItem("token")) {
    // NOTE: PureH5 token 可以儲存在 localStorage | cookies (這邊先採取儲存在 LocalStorage)
    token = String(AppLocalStorage.getItem("token"));
  }

  // console.log("parsedQueryString", parsedQueryString['token']);
  if (!token) {
    console.log('[app] TOKEN is missing');
  }

  return token;
};

export const setTokenToLocalStorage = (token: string) => {
  AppLocalStorage.setItem("token", token);
}
export const removeTokenFromLocalStorage = () => {
  AppLocalStorage.removeItem("token");
}
