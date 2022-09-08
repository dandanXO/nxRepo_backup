/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RiskControlModelResponse = {
    channelId?: string;
    channelName?: string;
    count?: number;
    expireTime?: string;
    loanTime?: string;
    minPayTime?: string;
    name?: string;
    phone?: string;
    provider?: RiskControlModelResponse.provider;
    providerDisplayName?: string;
    providerOrdinal?: number;
    score?: number;
    state?: string;
};

export namespace RiskControlModelResponse {
    export enum provider {
        BATEI = "BATEI",
        BLUE_RAY = "BLUE_RAY",
        DESTINY = "DESTINY",
        DUMMY = "DUMMY",
        HX = "HX",
        MERCURY = "MERCURY",
        WU_PIAN = "WU_PIAN",
    }
}
