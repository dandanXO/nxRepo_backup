import { ExternelEndpoint } from "./types";
import { POST_PUNCH_IN_URL } from "./ApiUrl";


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


const PostPunchInEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostPunchInResponse, null>({
  query: () => ({
    method: 'post',
    url: POST_PUNCH_IN_URL
  })
})

export {
  PostPunchInResponse,

  PostPunchInEndpoint
}
