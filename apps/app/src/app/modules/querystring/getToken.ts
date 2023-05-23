import queryString from 'query-string';
import { NativeAppInfo } from '../../persistant/nativeAppInfo';

export const getToken = (): string => {
  const parsedQueryString = queryString.parse(window.location.search);
  // NOTICE: refactor me
  const TOKEN = parsedQueryString['token']
    ? (parsedQueryString['token'] as string)
    : NativeAppInfo.token
    ? NativeAppInfo.token
    : '';
  // console.log("parsedQueryString", parsedQueryString['token']);
  if (!TOKEN) {
    console.log('[app] TOKEN is missing');
  }
  return TOKEN;
};
