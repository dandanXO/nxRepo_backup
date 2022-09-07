/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderOverdueRq = {
    begin?: number;
    /**
     * 催收人id
     */
    collectorId?: number;
    /**
     * 催收组id
     */
    departmentId?: number;
    /**
     * 逾期结束时间
     */
    endTime?: string;
    /**
     * 分配结束时间
     */
    fendTime?: string;
    /**
     * 分配开始时间
     */
    fstartTime?: string;
    /**
     * 是否查询电催
     */
    isDc?: string;
    /**
     * 订单号
     */
    orderNo?: string;
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
     * 逾期开始时间
     */
    startTime?: string;
    /**
     * 状态 0逾期中，1已结清，2已展期
     */
    status?: number;
    /**
     * 用户手机号
     */
    userPhone?: string;
    /**
     * 用户姓名
     */
    userTrueName?: string;
};
