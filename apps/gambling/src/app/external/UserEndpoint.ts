import { ExternelEndpoint } from "./types";
import { GET_VIP_INFO_URL, LOGIN_URL, REGISTER_URL } from "./ApiUrl";
import { IUserInfo } from "../persistant/IUserInfo";

type RegisterRequestExtraData = {
  verifyCode: string;
  web_finger: {
    cpuSize: number;
    canvas: string;
    webgl: string;
    userAgent: string;
    screenWidth: number;
    inviteUrl: string;
  },
  installTime: string;
  captcha_image_key: string;
  captcha_image_code: string;
  web_uuid: string;
}

type CommonLoginRequestData = {
  appChannel: string;
  appPackageName: string;
  appVersion: string;
  deviceId: string;
  deviceModel: string;
  deviceVersion: string;
  sysLanguage: null
  sysTimezone: null
  password?: string;
  phone?: string;
  token?: string;
}
type PostRegisterRequest = CommonLoginRequestData & RegisterRequestExtraData;

type PostRegisterResponse =  {
  "code": number;
  "msg": string;
  "data": {
    "user_info": IUserInfo;
    "bank": any;
    "pay_account": {
      "email": string
      "phone": string
      "name": string
    },
    "connection": {
      "ip": string
      "port": number,
      "server_id": number
      "api": string;
    },
    "token": string;
    "recharge_dot": [],
    "hide_entrance": [],
    "game_list": number[];
  }
}

type PostLoginRequest = CommonLoginRequestData;
type PostLoginResponse = PostRegisterResponse;

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

// 註冊
const RegisterEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostRegisterResponse, PostRegisterRequest>({
  query: (requestData: PostRegisterRequest) => ({
    method: 'post',
    url: REGISTER_URL,
    data: requestData,
  }),
});

// 登入
const LoginEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostLoginResponse, PostLoginRequest>({
  query: (requestData: PostLoginRequest) => ({
    method: 'post',
    url: LOGIN_URL,
    data: requestData,
  }),
});

// 取得VIP訊息
const GetVIPInfoEndpoint = (builder: ExternelEndpoint) => builder.query<GetVIPInfoResponse, GetVIInfoRequest>({
  query: (params) => ({
    method: 'get',
    url: GET_VIP_INFO_URL,
    params
  })
})


export {
  RegisterRequestExtraData,
  CommonLoginRequestData,
  PostRegisterResponse,
  PostRegisterRequest,
  PostLoginRequest,

  GetVIPInfoResponse,

  RegisterEndpoint,
  LoginEndpoint,
  GetVIPInfoEndpoint
}
