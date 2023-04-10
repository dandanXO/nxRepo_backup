import {runAxios} from "../base/runAxios";
import {GetUserInfoServiceRequest} from "./getUserInfoServiceRequest";
import {GetUserInfoServiceResponse} from "./getUserInfoServiceResponse";

export const GetUserInfoService = async (params: GetUserInfoServiceRequest) => {
  const {data}: { data: GetUserInfoServiceResponse } = await runAxios(
    "/api",
    "/v2/login/info",
    "get",
    null,
    {}
  )
  return data;
}




