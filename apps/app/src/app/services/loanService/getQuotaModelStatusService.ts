import {runAxios} from "../base/runAxios";
import {GetQuotaModelStatusRequest} from "./getQuotaModelStatusRequest";
import {GetQuotaModelStatusResponse} from "./getQuotaModelStatusResponse";

export const getQuotaModelStatusService = async (request: GetQuotaModelStatusRequest) => {
  const {data}: {data: GetQuotaModelStatusResponse} = await runAxios(
    "/api",
    "/v3/loan/quota-model-status",
    "get",
    request,
  )
  return data;
}

