/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdvertiseResponse = {
    /**
     * 产品平台名称
     */
    appName: string;
    createTime?: string;
    /**
     * 上/下架
     */
    enabled: boolean;
    /**
     * LOAN_SUCCESS(放款成功), LOAN_FAIL(放款失敗), REPAYMENT_1TH_TIMES(還款成功1次), REPAYMENT_ABOVE_2TH_TIMES(還款成功2次以上)
     */
    eventTags: Array<string>;
    id?: number;
    /**
     * 广告利率
     */
    interestRate: number;
    /**
     * 下载链结
     */
    linkUrl: string;
    /**
     * logo 图片url
     */
    logoUrl: string;
    /**
     * 额度
     */
    quota: string;
    /**
     * 排序
     */
    sort: number;
    /**
     * 下款成功率
     */
    successRate: number;
    /**
     * 广告借款周期
     */
    terms: number;
    /**
     * 简介
     */
    title: string;
    updateTime?: string;
};
