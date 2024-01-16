import { ExternelEndpoint } from "./types";
import { GET_BOX_RECEIVE_URL } from "./ApiUrl";

export type GetBoxReceiveResponse = {
  code: number;
  msg: string;
  data: boolean;
  total: number; // 無用
}

// 領取寶箱獎勵
export const GetBoxReceiveEndpoint = (builder: ExternelEndpoint) => builder.query<GetBoxReceiveResponse, { number: number}>({
  query: (params) => ({
    method: 'get',
    url: GET_BOX_RECEIVE_URL,
    params
  })
})
