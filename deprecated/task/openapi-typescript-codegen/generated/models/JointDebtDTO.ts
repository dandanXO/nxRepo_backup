/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type JointDebtDTO = {
    applyNearlySevenDayCount?: number;
    applyNearlyThirtyDayCount?: number;
    applyNearlyThreeDayCount?: number;
    applyNearlyTwoDayCount?: number;
    applyTodayCount?: number;
    channelName?: string;
    children?: Array<JointDebtDTO>;
    denyCount?: number;
    dueNearlySevenDayCount?: number;
    dueTodayCount?: number;
    expireTime?: string;
    historyOverdueCount?: number;
    id?: number;
    lastUpdateTime?: string;
    loanTime?: string;
    mobile?: string;
    modelScore?: number;
    orderStatus?: string;
    overdueNearlyMonthCount?: number;
    overdueNearlyWeekCount?: number;
    overdueYetCount?: number;
    overdueYetMoney?: number;
    realName?: string;
    refuseReson?: string;
    repayNearlySevenDayCount?: number;
    repayNearlyTwoDayCount?: number;
    reviewStatus?: string;
    todayRepayCount?: number;
    totalOrderCount?: number;
    totalOverduePlatformCount?: number;
    totalPlatformCount?: number;
    totalSuccessCount?: number;
    totalSuccessPlatformCount?: number;
    totalSuccessRepayCount?: number;
    totalSuccessRepayPlatformCount?: number;
    underWayCount?: number;
    userPhone?: string;
    waitCheckCount?: number;
};
