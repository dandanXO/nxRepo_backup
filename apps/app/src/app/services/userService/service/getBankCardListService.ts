import {GetBankCardListResponse} from "../GetBankCardListResponse";
import {runAxios} from "../../base/runAxios";

export const GetBankCardListService = async (params: null) => {
  const {data}: { data: GetBankCardListResponse } = await runAxios(
    "/api",
    "/v2/user/bank-card",
    "get",
    null,
    {}
  )
  return data;
}
