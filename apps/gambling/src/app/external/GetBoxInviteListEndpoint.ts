import { ExternelEndpoint } from "./types";
import { GET_BOX＿INVITE_LIST_URL } from "./ApiUrl";

export type GetBoxInfoResponse = {
  total: number;
  rows: {
    phone: string; // 被邀請人手機號
    isEffective: boolean;  // 是否為有效邀請
    registerTime: string;
    condition: string;
  }[] | null;
  code: number;
  msg: string;
}

export type GetBoxInfoResponseData = {
  total: number;
  rows: {
    phone: string; // 被邀請人手機號
    isEffective: boolean;  // 是否為有效邀請
    registerTime: string;
    condition: string;
  }[] | null;
  code: number;
  msg: string;
}
type requestData = {
  pageNum: number,
  pageSize: number,
  isEffective?: boolean,
  phone?: string;
}

// 獲取寶箱資訊
export const GetBoxInviteListEndpoint = (builder: ExternelEndpoint) => builder.mutation<GetBoxInfoResponse, any>({
  query: (data: requestData) => {
    return({
      method: 'post',
      url: GET_BOX＿INVITE_LIST_URL,
      data: data,
    })
  }
})
