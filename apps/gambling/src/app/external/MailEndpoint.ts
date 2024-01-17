import { ExternelEndpoint } from "./types";
import { GET_MAIL_COUNT_URL, GET_MAIL_LIST_URL, POST_MAIL_READ_URL } from "./ApiUrl";

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

type GetMailListResponseData = {
  id: number;
  from_user_id: number;
  from: {
    nickname: string;
    avatar: number;
    fb_avatar: string;
  };
  user_id: number;
  type: number;
  title: string;
  content: string;
  is_read: number;
  attaches: any;
  attaches_status: number;
  created_at: string;
  created_timestamp: number;
};

type GetMailListResponse = {
  code: number;
  msg: string;
  data: GetMailListResponseData[];
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

// 取得訊息列表
const GetMailListEndpoint = (builder: ExternelEndpoint) => builder.query<GetMailListResponse, { token: string}>({
  query: (params) => ({
    method: 'get',
    url: GET_MAIL_LIST_URL,
    params
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
  GetMailListResponseData,

  GetMailCountEndpoint,
  GetMailListEndpoint,
  PostMailReadEndpoint
}
