import {ExternelEndpoint} from "./types";

type RechargeRequest = {
  amount: number;
  appPackageName: string;
  appVersion: string;
  configId: number;
  phone: string;
  qr: number;
  token: string;
}
type RechargeResponse = {
  "code": number;
  "msg": string;
  "data": {
    "amount": number;
    "orderId": string;
    "payChannel": string;
    "paySerialNo": string;
    "channelTradeNo": string;
    "productName": string;
    "channelData": {
      "paymentLink": string;
      "openType": number;
    }
  }
}

export const RechargeActionEndpoint = (builder: ExternelEndpoint) => builder.mutation<RechargeResponse, RechargeRequest>({
  query: (requestData: RechargeRequest) => ({
    method: 'post',
    url: `/prod-api/pay-service/recharge`,
    data: requestData,
  }),
})
