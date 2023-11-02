import {EndpointBuilder, EndpointDefinitions} from '@reduxjs/toolkit/src/query/endpointDefinitions';
import {BaseQueryFn} from '@reduxjs/toolkit/src/query/baseQueryTypes';
import {ExternelEndpoint} from "./types";
import {IUserInfo} from "../persistant/pending/loginMode";

export type RegisterRequestExtraData = {
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

export type CommonLoginRequestData = {
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
export type PostRegisterRequest = CommonLoginRequestData & RegisterRequestExtraData;


export type PostRegisterResponse =  {
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

export const RegisterEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostRegisterResponse, PostRegisterRequest>({
  query: (requestData: PostRegisterRequest) => ({
    method: 'post',
    url: `/prod-api/player/sign-in`,
    data: requestData,
  }),
});
