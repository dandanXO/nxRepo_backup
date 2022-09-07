/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OverdueStatisticResponse = {
    /**
     * 当天生成逾期单合同金
     */
    amount?: number;
    /**
     * 催回合同金
     */
    backMoney?: number;
    /**
     * 回單率
     */
    backRate?: number;
    day?: string;
    /**
     * 在催单量
     */
    ingMoney?: number;
    /**
     * 在催单量
     */
    ingNum?: number;
    /**
     * 催回展期费
     */
    lengMoney?: number;
    /**
     * 当天生成逾期单数
     */
    num?: number;
    /**
     * 催回滞纳金
     */
    overMoney?: number;
    /**
     * 总回款
     */
    totalAmount?: number;
};
