import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {getToken} from "./getToken";
import {alertModal} from "./alertModal";

const token = getToken();

export const runAxios = async (
  baseUrl: string,
  url: string,
  method?: AxiosRequestConfig["method"],
  data?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
) => {
  // NOTICE: REFACTOR ME
  // NOTE: 這邊得 catch error, otherwise other place cannot handle
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error.status)
      // console.error(error.response);
      // Do something with this error...
      alertModal((error.response as any).data?.message);
    } else {
      // console.error(error);
      alertModal(JSON.stringify(error));
    }
    // throw error;
    return {
      data: null,
    }
  }
}
