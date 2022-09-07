/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RecallSettingResponse = {
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
     * 召回設定ID
     */
    id?: number;
    /**
     * 召回設定名稱
     */
    name?: string;
    /**
     * 召回條件代號
     */
    recallConditionCode?: string;
    /**
     * 召回條件名稱
     */
    recallConditionName?: string;
};
