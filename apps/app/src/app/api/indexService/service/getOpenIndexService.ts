import {runAxios} from "../../base/runAxios";
import {GetOpenIndexRequest} from "../GetOpenIndexRequest";
import {GetOpenIndexResponse} from "../GetOpenIndexResponse";

export const getOpenIndexService = async (params: GetOpenIndexRequest) => {
  const {data}: { data: GetOpenIndexResponse } = await runAxios(
    "/api",
    "/v3/open-index",
    "get",
    null,
    params,
  )
  return data;
}


