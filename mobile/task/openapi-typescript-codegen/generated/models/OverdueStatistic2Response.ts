/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OverdueStatistic2Response = {
    /**
     * 放款笔数
     */
    loanCount?: number;
    /**
     * 放款日期
     */
    loanDay?: string;
    /**
     * 新客笔数
     */
    newGuestCount?: number;
    /**
     * 新客逾期笔数
     */
    newGuestOverdueCount?: number;
    /**
     * 新客逾期率
     */
    newGuestOverdueRate?: string;
    /**
     * 老客笔数
     */
    oldGuestCount?: number;
    /**
     * 老客逾期笔数
     */
    oldGuestOverdueCount?: number;
    /**
     * 老客逾期率
     */
    oldGuestOverdueRate?: string;
    /**
     * 逾期率
     */
    overdueRate?: string;
};
