/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RiskControlModelListVo = {
    channelId?: string;
    channelName?: string;
    count?: number;
    expireTime?: string;
    loanTime?: string;
    minPayTime?: string;
    name?: string;
    phone?: string;
    provider?: RiskControlModelListVo.provider;
    providerDisplayName?: string;
    providerOrdinal?: number;
    score?: number;
    state?: string;
};

export namespace RiskControlModelListVo {
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
