import {EndpointBuilder, EndpointDefinitions} from '@reduxjs/toolkit/src/query/endpointDefinitions';
import {BaseQueryFn} from '@reduxjs/toolkit/src/query/baseQueryTypes';
import {ExternelEndpoint} from "./types";

import {IUserInfo} from "../persistant/IUserInfo";
import { FORGET_PASSWORD_URL } from "./ApiUrl";
import { CommonLoginRequestData } from "./UserEndpoint";

export type ForgetPasswordRequestExtraData = {
  // adjust_ad_id: "0",
  verifyCode: string;
}

export type PostForgetPasswordRequest = CommonLoginRequestData & ForgetPasswordRequestExtraData;


export type PostForgetPasswordResponse =  {
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

export const ForgetPasswordEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostForgetPasswordResponse, PostForgetPasswordRequest>({
  query: (requestData: PostForgetPasswordRequest) => ({
    method: 'post',
    url: FORGET_PASSWORD_URL,
    data: requestData,
  }),
});
