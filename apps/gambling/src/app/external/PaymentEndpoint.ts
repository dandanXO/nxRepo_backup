import { ExternelEndpoint } from "./types";
import { POST_RECHARGE_URL } from "./ApiUrl";

type PostRechargeRequestData = {
  amount: number; // 充值金额(元)
  configId: number; // 充值配置ID
  token: string;
}

type PostRechargeResponse = {
  code: number;
  msg: string;
  data: {
    amount: number; // 充值金额(分)
    paySerialNo: string; // 订单号
    channelData: {
      paymentLink: string; // 支付数据(支付链接、二维码等)
      openType: number; // 支付数据类型: 2=二维码
    };
    channelTradeNo: string; // 渠道单号
    payChannel: string; // 支付渠道
    productName: string; // 产品名称
  }
}

const PostRechargeEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostRechargeResponse, PostRechargeRequestData>({
  query: (data) => {
    const { token } = data;

    return {
      method: 'post',
      url: POST_RECHARGE_URL,
      params: {
        token
      },
      data
    }
  }
})


export {
  PostRechargeEndpoint
}
