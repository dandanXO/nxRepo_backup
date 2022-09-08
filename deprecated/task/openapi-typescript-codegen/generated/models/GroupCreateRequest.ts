/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GroupCreateRequest = {
    /**
     * 所屬團隊
     */
    collectTeamId?: number;
    /**
     * 逾期天數結束
     */
    dueDaysEnd?: number;
    /**
     * 逾期天數起始
     */
    dueDaysStart?: number;
    /**
     * 團隊名稱
     */
    name?: string;
};
