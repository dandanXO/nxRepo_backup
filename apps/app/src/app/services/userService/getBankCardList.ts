import {GetBankCardListResponse} from "../api/types/getBankCardList";
import {runAxios} from "../api/base/runAxios";

export const GetBankCardList = async (params: null) => {
  const {data}: { data: GetBankCardListResponse } = await runAxios(
    "/api",
    "/v2/user/bank-card",
    "get",
    null,
    {}
  )
  return data;
}
