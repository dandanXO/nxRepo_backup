import {runAxios} from "../base/runAxios";
import {GetInitServiceRequest} from "./getInitServiceRequest";
import {GetInitServiceResponse} from "./getInitServiceResponse";

export const GetInitService = async (params: GetInitServiceRequest): Promise<GetInitServiceResponse> => {
  const {data}: { data: GetInitServiceResponse }  = await runAxios(
    "/api",
    "/v2/init",
    "get",
    null,
  params,
  )
  return data;
}
