/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SubmitOrderLoanRequest = {
    /**
     * 包名
     */
    appName: string;
    /**
     * 銀行帳戶流水號 (optional 沒指定預設主卡)
     */
    bankId?: number;
    /**
     * 装置码
     */
    deviceCode: string;
    /**
     * 装置机型, required = true
     */
    deviceModel?: string;
    /**
     * IMEI
     */
    imei: string;
    /**
     * 產品ID
     */
    productId: number;
    /**
     * 安卓版本
     */
    systemVersion: string;
    /**
     * 密钥
     */
    token: string;
};
