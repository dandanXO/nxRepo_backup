import { ExternelEndpoint } from "./types";
import { GET_MAIL_COUNT_URL, POST_MAIL_READ_URL } from "./ApiUrl";

type GetMailCountRequest = {
  token: string;
};

type GetMailCountResponse = {
  code: number;
  data: {
    mailCount: number
  };
  msg: string;
};

// 設定訊息為已讀
const PostMailReadEndpoint = (builder: ExternelEndpoint) => builder.mutation<{code: number; msg: string}, { mailId: number; token: string}>({
  query: (data) => ({
    method: 'post',
    url: POST_MAIL_READ_URL(data.mailId),
    params: {
      token: data.token
    }
  })
})

// 取得未讀訊息數量
const GetMailCountEndpoint = (builder: ExternelEndpoint) => builder.query<GetMailCountResponse, GetMailCountRequest>({
  query: (params)=> ({
    method: 'get',
    url: GET_MAIL_COUNT_URL,
    params
  })
})


export {
  GetMailCountEndpoint,
  PostMailReadEndpoint
}
