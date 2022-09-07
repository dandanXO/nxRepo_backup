/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoanPlatformAddRq = {
    /**
     * id
     */
    id?: number;
    /**
     * 下款速度
     */
    loanSpeed?: string;
    /**
     * 下款速度单位
     */
    loanUnit?: string;
    /**
     * logo地址
     */
    logo?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 额度
     */
    quota?: string;
    /**
     * 利率
     */
    rate?: string;
    /**
     * 利率单位
     */
    rateUnit?: string;
    /**
     * 排序
     */
    sort?: string;
    /**
     * 状态: 1=上架，0=下架
     */
    status?: number;
    /**
     * 副标题
     */
    title?: string;
    /**
     * 状态: 1=合格，2=不合格，3=未通过
     */
    type?: number;
    /**
     * url地址
     */
    url?: string;
};
