import axios, {AxiosRequestConfig} from "axios";
import {getToken} from "./getToken";

const token = getToken();

export const runAxios = async (
  baseUrl: string,
  url: string,
  method?: AxiosRequestConfig["method"],
  data?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
) => {
  const config = {
    url: baseUrl + url,
    method,
    data,
    params,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
      ...headers,
    },
  }
  const result = await axios(config);
  return {
    data: result.data,
  };
}
