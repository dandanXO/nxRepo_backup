/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginOrRegisterRequest = {
    /**
     * Adjust设备ID字符串
     */
    adid: string;
    /**
     * 安卓id
     */
    androidId?: string;
    /**
     * app包名/package id
     */
    appId: string;
    /**
     * app安裝時間
     */
    appInstallTime: string;
    /**
     * APP包名
     */
    appName: string;
    /**
     * 归因的推广分组层字符串
     */
    campaign: string;
    /**
     * 手机硬盘可用空间
     */
    cashCanUse?: number;
    /**
     * 手机硬盘总空间
     */
    cashTotal?: number;
    /**
     * 渠道來源 (廣告推薦來源) != Apk渠道包 channel id
     */
    channelId: string;
    /**
     * 设备唯一标示
     */
    deviceCode: string;
    /**
     * 设备内存
     */
    deviceMemory?: string;
    /**
     * 设备型号
     */
    deviceModel: string;
    /**
     * apk 强制指定channel id
     */
    forceChannelId: number;
    /**
     * Google 广告id
     */
    gpsAdId: string;
    /**
     * imei
     */
    imei: string;
    /**
     * 裝置語言
     */
    language?: string;
    /**
     * 手机mac地址
     */
    mac?: string;
    /**
     * 图片验证码
     */
    msgCode: string;
    /**
     * 手机号码
     */
    phoneNo: string;
    /**
     * 手机出厂日期
     */
    productionDate?: string;
    /**
     * 手机内存剩余空间
     */
    ramCanUse?: number;
    /**
     * 手机总内存
     */
    ramTotal?: number;
    /**
     * 设备Serial no
     */
    sn?: string;
    /**
     * IOS/ANDROID
     */
    systemType: string;
    /**
     * Android操作系统版本号
     */
    systemVersions: string;
    /**
     * APP版本号 (非安卓版本號)
     */
    version: string;
};
