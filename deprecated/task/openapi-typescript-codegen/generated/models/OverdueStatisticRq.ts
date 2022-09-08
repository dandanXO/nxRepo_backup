/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OverdueStatisticRq = {
    /**
     * 渠道id
     */
    channelId?: number;
    /**
     * 催收天数
     */
    days?: string;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 是否老用户（true：老客户，false:新客户）
     */
    isOldUser?: boolean;
    /**
     * 是否统计展期
     */
    isStatistLeng?: boolean;
    /**
     * 页码
     */
    pageNum?: number;
    /**
     * 单页大小
     */
    pageSize?: number;
    /**
     * 开始时间
     */
    startTime?: string;
};
