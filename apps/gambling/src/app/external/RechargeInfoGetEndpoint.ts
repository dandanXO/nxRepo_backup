import {ExternelEndpoint} from "./types";


type GetRechargeRequest = {
  token: string;
  type: string;
}

export type RechargeResponseConfig = {
  "id": number;
  "amount_min": string;
  "amount_max": string;
  "rate": string;
  "bonus_rate": string;
  "bonus_finish": number;
  "status": number;
  "level": number;
  "user_count_day": number;
  "start_at": number;
  "end_at": number;
  "week_start_at": number;
  "week_end_at": number;
  "mail_title": string;
  "mail_content": string;
  "min_recharge_amount": string;
  "max_recharge_amount": string;
  "created_at": string;
  "updated_at": string;
  "total_rebate": string;
  "buyTimes": number;
}

export type GetRechargeResponseOption = {
  "recharge_options": number[],
  "recharge_options_default": number;
}

export type GetRechargeResponse = {
  "code": number;
  "msg": string;
  "data": {
    "config": RechargeResponseConfig[],
    "options": GetRechargeResponseOption;
  }
}

export const RechargeInfoGetEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetRechargeResponse, GetRechargeRequest>({
  query: (requestData: GetRechargeRequest) => ({
    method: 'post',
    url: `/prod-api/global-config/recharge`,
    data: requestData,
  }),
});
