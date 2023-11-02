import {ExternelEndpoint} from "./types";


type GetWithdrawLimitRequest = {
  token: string;
}

type GetWithdrawLimitResponse = {
  "code": number;
  "msg": string;
  "data": {
    "withdrawMin": number;
    "withdrawMax": number;
    "withdraw_fee_rate": number;
  }
}

export const WithdrawInfoGetEndpoint = (builder: ExternelEndpoint) => builder.mutation<
  GetWithdrawLimitResponse,
  GetWithdrawLimitRequest
>({
  query: (requestData: GetWithdrawLimitRequest) => ({
    method: 'post',
    url: `/prod-api/pay-service/withdraw-limit`,
    data: requestData,
  }),
})
