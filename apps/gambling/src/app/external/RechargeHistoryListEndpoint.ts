import {ExternelEndpoint} from "./types";
import {Page} from "./types/Page";

type RechargeListRequest = {
  limit: number;
  page: number;
  token: string;
}

export type RechargeListResponseData = {
  "id": number;
  "user_id": number;
  "pay_serial_no": string;
  "pay_channel": string;
  "status": number;
  "amount": string;
  "rate": string;
  "created_at": string;
};

type RechargeListResponse = {
  "code": number;
  "msg": string;
  "data": RechargeListResponseData[];
  "page": Page;
}

export const RechargeHistoryListEndpoint = (builder: ExternelEndpoint) => builder.mutation<
  RechargeListResponse,
  RechargeListRequest
>({
  query: (data: RechargeListRequest) => ({
    method: 'post',
    url: `/prod-api/pay-service/recharge-list`,
    data,
  }),
})
