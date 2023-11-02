import {ExternelEndpoint} from "./types";

export type SendForgetPasswordSMSCodeEndpointRequest = {
  appPackageName: string;
  deviceId: string;
  phone: string;
  // 验证码类型1，登录注册忘记密码，2绑定手机号,绑定邀请人
  verifyType: number;
}


export type SendForgetPasswordSMSCodeEndpointResponse =  {
  "code": number;
  "msg": string;
}

export const SendForgetPasswordSMSCodeEndpoint = (builder: ExternelEndpoint) => builder.mutation<SendForgetPasswordSMSCodeEndpointResponse, SendForgetPasswordSMSCodeEndpointRequest>({
  query: (requestData: SendForgetPasswordSMSCodeEndpointRequest) => ({
    method: 'post',
    url: `/prod-api/otp/ping`,
    data: requestData,
  }),
});
