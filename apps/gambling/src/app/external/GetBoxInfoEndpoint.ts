import { ExternelEndpoint } from "./types";
import { GET_BOX_INFO_URL } from "./ApiUrl";

export type GetBoxInfoResponse = {
  code: number;
  msg: string;
  data: {
    id: number; // always 1
    contentVoList: {
      amount: number; // 寶箱金額
      number: number; // 開啟寶箱所需邀請人數
      receiveFlag: number; // 是否已領取
    }[];  // 寶箱歷程
    status: number; // 是否開啟寶箱遊戲
    number: number; // 有效邀請人數
    receiveAmount: number; // 已領取寶箱總金額
    firstRechargeRequiredAmount: number | null; // 有效邀請所需首充金額
    boxFlow: number | null; // 有效邀請所需流水
    inviteList: {
      phone: string; // 被邀請人手機號
      isEffective: boolean;  // 是否為有效邀請
      registerTime: string;
      condition: string;
    }[] | null; // 邀請清單
  },
  total: number // 無用
}

export type GetBoxInfoResponseData = {
  id: number; // always 1
  contentVoList: {
    amount: number; // 寶箱金額
    number: number; // 開啟寶箱所需邀請人數
    receiveFlag: number; // 是否已領取
  }[];  // 寶箱歷程
  status: number; // 是否開啟寶箱遊戲
  number: number; // 有效邀請人數
  receiveAmount: number; // 已領取寶箱總金額
  firstRechargeRequiredAmount: number | null; // 有效邀請所需首充金額
  boxFlow: number | null; // 有效邀請所需流水
  inviteList: {
    phone: string; // 被邀請人手機號
    isEffective: boolean;  // 是否為有效邀請
  }[] | null; // 邀請清單
}


// 獲取寶箱資訊
export const GetBoxInfoEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetBoxInfoResponse, any>({
  query: () => ({
    method: 'get',
    url: GET_BOX_INFO_URL
  })
})
