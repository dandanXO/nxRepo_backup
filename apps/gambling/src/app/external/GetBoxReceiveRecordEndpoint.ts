import { ExternelEndpoint } from "./types";


export type GetBoxReceiveRecordResponse = {
  code: number;
  msg: string;
  total: number; // 無用
  data: {
    id: number;
    userId: number;
    number: number; // 開啟寶箱邀請人數
    boxReward: number; // 寶箱金額
    receiveFlag: number; // 是否領取
    createTime: string;
    updateTime: string;
  }[]
}


// 寶箱領取紀錄
export const GetBoxReceiveRecordEndpoint = (builder: ExternelEndpoint) => builder.query<GetBoxReceiveRecordResponse, number>({
  query: () => ({

  })
})
