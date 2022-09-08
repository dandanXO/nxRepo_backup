/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GroupUpdateRequest = {
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
     * 組別ID
     */
    id?: number;
    /**
     * 團隊名稱
     */
    name?: string;
};
