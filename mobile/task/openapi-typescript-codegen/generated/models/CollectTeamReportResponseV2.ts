/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CollectTeamReportResponseV2 = {
    /**
     * 催收人員
     */
    collector?: string;
    /**
     * 個人回收達成率 結清/在催訂單數
     */
    collectorCount?: string;
    /**
     * 個人回收達成率 EX:80%
     */
    collectorRate?: string;
    /**
     * 組別名稱
     */
    group?: string;
    /**
     * 組別回收達成率 結清/在催訂單數
     */
    groupCount?: string;
    /**
     * 組別回收達成率 EX:80%
     */
    groupRate?: string;
    /**
     * 報表日期 EX: 2022-03-14
     */
    reportDate?: string;
    rowIndex?: number;
    /**
     * 團隊名稱
     */
    team?: string;
    /**
     * 團隊回收達成率 結清/在催訂單數
     */
    teamCount?: string;
    /**
     * 團隊回收達成率 EX:80%
     */
    teamRate?: string;
};
