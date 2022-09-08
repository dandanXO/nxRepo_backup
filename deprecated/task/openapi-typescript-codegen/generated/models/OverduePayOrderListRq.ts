/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OverduePayOrderListRq = {
    begin?: number;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 订单号
     */
    orderNo?: string;
    /**
     * 预期单号
     */
    orderOverdueId?: number;
    pageEnable?: boolean;
    /**
     * 页码
     */
    pageNum?: number;
    /**
     * 一页条数
     */
    pageSize?: number;
    /**
     * 支付方式
     */
    payId?: number;
    /**
     * 开始时间
     */
    startTime?: string;
    /**
     * 支付类型,1还款 2展期
     */
    state?: number;
    /**
     * 用户手机号
     */
    userPhone?: string;
    /**
     * 用户姓名
     */
    userTrueName?: string;
};
