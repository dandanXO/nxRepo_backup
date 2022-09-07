/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Battery } from "./Battery";
import type { Cpu } from "./Cpu";
import type { Disk } from "./Disk";
import type { Display } from "./Display";
import type { Jvm } from "./Jvm";
import type { Ram } from "./Ram";
import type { SensorsItem } from "./SensorsItem";

export type SystemInfo = {
    adid?: string;
    apiLevel?: string;
    battery?: Battery;
    bootloader?: string;
    codeName?: string;
    cpu?: Cpu;
    currentSystemTime?: number;
    deviceId?: string;
    disk?: Disk;
    display?: Display;
    imei?: string;
    isEmulator?: boolean;
    isO3language?: string;
    isRooted?: boolean;
    isTabletDevice?: boolean;
    jvm?: Jvm;
    kernelVersion?: string;
    language?: string;
    languageTag?: string;
    manufacturer?: string;
    manufacturingDay?: number;
    model?: string;
    packageName?: string;
    product?: string;
    ram?: Ram;
    releasedWith?: string;
    securityPatchLevel?: string;
    sensors?: Array<SensorsItem>;
    serial?: string;
};
