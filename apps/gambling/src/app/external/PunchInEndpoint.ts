import { ExternelEndpoint } from "./types";
import { GET_PUNCH_IN_CONFIG_URL, POST_PUNCH_IN_URL } from "./ApiUrl";


type PostPunchInResponse = {
  code: number;
  msg: string;
  data: {
    vipLevel: number;
    signInConfig: {
      bonus_finish: number;
      bonus: number;
      days: number;
      cashback: number
    }[];
    signInRefreshTimestamp: number;
    signInTotalDays: number;
    todayIsSignIn: boolean;
    signInAllConfig: {
      identifier: string;
      value: string
    }[];
    signInSuccessResult: {
      bonus_finish: number;
      bonus: number;
      cashback: number
    }
  }
}

type GetPunchInConfigResponse = {
  code: number;
  msg: string;
  data: {
    vipLevel: number;
    signInConfig: {
      bonus_finish: number;
      bonus: number;
      days: number;
      cashback: number
    }[];
    signInRefreshTimestamp: number;
    signInTotalDays: number;
    todayIsSignIn: boolean;
    signInAllConfig: {
      identifier: string;
      value: string
    }[];
  }
}


const PostPunchInEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostPunchInResponse, null>({
  query: () => ({
    method: 'post',
    url: POST_PUNCH_IN_URL
  })
})

const GetPunchInConfigEndpoint = (builder: ExternelEndpoint) => builder.query<GetPunchInConfigResponse, null>({
  query: () => ({
    method: 'get',
    url: GET_PUNCH_IN_CONFIG_URL
  })
})

export {
  GetPunchInConfigResponse,
  PostPunchInResponse,

  PostPunchInEndpoint,
  GetPunchInConfigEndpoint
}
