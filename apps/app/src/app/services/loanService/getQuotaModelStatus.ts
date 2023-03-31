import {runAxios} from "../../api/base/runAxios";

export type GetQuotaModelStatusRequest = {
  //
}

export type GetQuotaModelStatusResponse = {
  calculating:	boolean;
  // 额度模型是否计算中

  effective:	boolean;
  // 额度是否有效

  offerExpireTime: string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 额度有效时间
}

export const getQuotaModelStatusService = async (request: GetQuotaModelStatusRequest) => {
  const {data}: {data: GetQuotaModelStatusResponse} = await runAxios(
    "/api",
    "/v3/loan/quota-model-status",
    "get",
    request,
  )
  return data;
}

