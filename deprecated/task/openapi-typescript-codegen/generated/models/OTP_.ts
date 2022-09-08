/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OTP_ = {
    /**
     * 装置试别
     */
    deviceCode?: string;
    /**
     * 手机号
     */
    phoneNo?: string;
    /**
     * 签名串:MD5(MD5(deviceCode+phoneNo+tm)+key),此处md5全部为32位小写，key找后台开发人员获取
     */
    sign?: string;
    /**
     * 时间戳（毫秒）
     */
    tm?: number;
};
