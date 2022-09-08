/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoresItem } from "./CoresItem";

export type Cpu = {
    bit?: string;
    coreCount?: number;
    cores?: Array<CoresItem>;
    cpuClockSpeed?: number;
    hardware?: string;
    maximumFreq?: number;
    minimumFreq?: number;
    supportedAbis?: Array<string>;
    type?: string;
};
