/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AddRecallSettingRequest = {
    /**
     * 召回簡訊內容
     */
    SMSContent?: string;
    /**
     * 符合條件後幾天召回
     */
    daysAfter?: number;
    /**
     * 召回設定狀態
     */
    enable?: boolean;
    /**
     * 召回設定名稱
     */
    name?: string;
    /**
     * 召回條件代號
     */
    recallConditionCode?: string;
};
