import axios from 'axios';

import { alertModal } from '../../base/alertModal';
import { runAxios } from '../../base/runAxios';

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
  try {
    const { data } = await runAxios('/api', '/v2/login/otp-code', 'post', request, {});
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alertModal((error.response as any).data?.message);
    }
    return null;
  }
};
