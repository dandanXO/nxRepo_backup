import {runAxios} from "../../base/runAxios";
import {GetInitServiceRequest} from "../GetInitServiceRequest";
import {GetInitServiceResponse} from "../GetInitServiceResponse";

export const getInitService = async (params: GetInitServiceRequest): Promise<GetInitServiceResponse> => {
  const {data}: { data: GetInitServiceResponse }  = await runAxios(
    "/api",
    "/v2/init",
    "get",
    null,
  params,
  )
  return data;
}
