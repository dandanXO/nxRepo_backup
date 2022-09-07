/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderOverdueDistributionRq = {
    /**
     * 催收人id:1,2,3
     */
    collectorIds?: string;
    /**
     * 催收组id:1,2,3
     */
    departmentIds?: string;
    /**
     * 逾期单id:1,2,3,4
     */
    disIds?: string;
};
