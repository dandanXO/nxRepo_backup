/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentStatisticData = {
    /**
     * 日期
     */
    dateStr?: string;
    /**
     * 支付成功比數
     */
    paySuccessCount?: number;
    /**
     * 支付成功率
     */
    paySuccessRate?: string;
    /**
     * 支付總比數
     */
    payTotal?: number;
    /**
     * 支付名稱
     */
    platName?: string;
    /**
     * 代付成功比數
     */
    settleSuccessCount?: number;
    /**
     * 代付成功率
     */
    settleSuccessRate?: string;
    /**
     * 代付總比數
     */
    settleTotal?: number;
};
