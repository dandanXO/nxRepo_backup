import { gateway } from '../../../gateway';

export type GetOTPCodeRequest = {
  appName: string;
  // AppName Ex: bona-lends-loan

  deviceCode: string;
  // 装置试别

  phoneNo: string;
  // 手机号

  sign: string;
  // 签名串:MD5(MD5(deviceCode+phoneNo+tm)+key),此处md5全部为32位小写，key找后台开发人员获取

  tm: number;
  // 时间戳（毫秒）
};

export const GetOTPCodeService = async (request: GetOTPCodeRequest) => {
  const { data } = await gateway('/api', '/v2/login/otp-code', 'post', request, {});
  return data;
};
