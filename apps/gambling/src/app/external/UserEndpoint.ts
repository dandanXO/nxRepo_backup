import { ExternelEndpoint } from "./types";
import { GET_VIP_INFO_URL } from "./ApiUrl";

type GetVIPInfoResponse = {
  code: number;
  msg: string;
  data: {
    vip_score: number;
    level_score: number;
    flow_progress: number;
    next_level_flow: number;
    withdraw_limit: number;
    level_flow: number;
    progress: number;
    vip_level: number;
    next_level_score: number;
    flow: number;
  };
};

type GetVIInfoRequest = {
  token: string
}


const GetVIPInfoEndpoint = (builder: ExternelEndpoint) => builder.query<GetVIPInfoResponse, GetVIInfoRequest>({
  query: (params) => ({
    method: 'get',
    url: GET_VIP_INFO_URL,
    params
  })
})


export {
  GetVIPInfoResponse,
  GetVIPInfoEndpoint
}
