import { ExternelEndpoint } from "./types";
import { GET_RECHARGE_RECORD_URL, GET_WITHDRAW_LIMIT_URL, GET_WITHDRAW_RECORD_URL, POST_RECHARGE_URL } from "./ApiUrl";
import { Page } from "./types/Page";

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

type GetRechargeRecordRequest = {
  limit: number;
  page: number;
  token: string;
}

type GetRechargeRecordResponseData = {
  amount: string; // 充值金额
  user_id: number;  // 用户ID
  rate: string; // 充值返利
  pay_serial_no: string;  // 充值流水号
  pay_channel: string;  // 充值渠道
  created_at: string; // 创建时间
  status: 1 | 2 |3;
};

type GetRechargeRecordResponse = {
  code: number;
  msg: string;
  data: GetRechargeRecordResponseData[]
  page: Page
}

type GetWithdrawRecordRequest = {
  limit: number;
  page: number;
  token: string;
};

type GetWithdrawRecordResponseData = {
  amount: string; // 提现金额
  user_id: number;  // 用户ID
  fee: string;  // 提现手续费
  pay_serial_no: string;  // 提现流水号
  pay_channel: string;  // 提现渠道
  created_at: string; // 创建时间
  status: 1 | 2 | 3;
};

type GetWithdrawRecordResponse = {
  code: number;
  msg: string;
  data: GetWithdrawRecordResponseData[];
  page: Page;
}

type GetWithdrawLimitResponse = {
  code: number;
  msg: string;
  data: {
    withdrawMin: number;
    withdrawMax: number;
    withdrawFeeRate: number;
  }
}


// 充值
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

// 取得充值紀錄
const GetRechargeRecordEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetRechargeRecordResponse, GetRechargeRecordRequest>({
  query: (data) => {
    const { token } = data;

    return {
      method: 'post',
      url: GET_RECHARGE_RECORD_URL,
      params: {
        token
      },
      data
    }
  }
})


// 取得提現紀錄
const GetWithdrawRecordEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetWithdrawRecordResponse, GetWithdrawRecordRequest>({
  query: (data) => {
    const { token } = data;
    return {
      method: 'post',
      url: GET_WITHDRAW_RECORD_URL,
      params: {
        token
      },
      data
    }
  }
})

// 取得提現限制
const GetWithdrawLimitEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetWithdrawLimitResponse, { token: string }>({
  query: (params) => ({
    method: 'post',
    url: GET_WITHDRAW_LIMIT_URL,
    params
  })
})


export {
  GetRechargeRecordResponseData,
  GetWithdrawRecordResponseData,

  PostRechargeEndpoint,
  GetRechargeRecordEndpoint,
  GetWithdrawRecordEndpoint,
  GetWithdrawLimitEndpoint
}
