import {runAxios} from "../../base/runAxios";
import {LoanServiceRequest} from "../LoanServiceRequest";

export const postApplyLoanService = async (req: LoanServiceRequest) => {
  const {data}: { data: LoanServiceResponse } = await runAxios(
    "/api",
    "/v3/loan/apply",
    "post",
    req,
  )
  return data;
}

export type LoanServiceResponse = {
  //
}

