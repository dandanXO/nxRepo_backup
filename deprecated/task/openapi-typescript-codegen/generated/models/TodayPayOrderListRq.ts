/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TodayPayOrderListRq = {
    begin?: number;
    /**
     * 结束时间
     */
    endTime?: TodayPayOrderListRq.endTime;
    /**
     * 到期结束时间
     */
    expiredEndTime?: TodayPayOrderListRq.expiredEndTime;
    /**
     * 到期开始时间
     */
    expiredStartTime?: TodayPayOrderListRq.expiredStartTime;
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
    startTime?: TodayPayOrderListRq.startTime;
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

export namespace TodayPayOrderListRq {
    /**
     * 结束时间
     */
    export enum endTime {
        YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss",
    }

    /**
     * 到期结束时间
     */
    export enum expiredEndTime {
        YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss",
    }

    /**
     * 到期开始时间
     */
    export enum expiredStartTime {
        YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss",
    }

    /**
     * 开始时间
     */
    export enum startTime {
        YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss",
    }
}
