/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderTodayDistributionRq = {
    /**
     * 催收人id
     */
    collectorId?: number;
    /**
     * 催收组id
     */
    departmentId?: number;
    /**
     * 单id:1,2,3,4
     */
    disIds?: string;
    /**
     * 人员id:1,2,3,4
     */
    personIds?: string;
    /**
     * 分配类型,1、所有单据 2、切换分配
     */
    type?: string;
};
