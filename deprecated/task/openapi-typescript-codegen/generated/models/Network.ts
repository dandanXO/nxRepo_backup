/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WifisItem } from "./WifisItem";

export type Network = {
    bssid?: string;
    dns1?: string;
    dns2?: string;
    gateway?: string;
    ipAddress?: string;
    isAutoWakeupEnabled?: boolean;
    isVpn?: boolean;
    isWifiConnected?: boolean;
    leaseDuration?: string;
    macAddress?: string;
    proxy?: string;
    realIp?: string;
    serverAddress?: string;
    ssid?: string;
    subnetMask?: string;
    type?: string;
    voiceType?: string;
    wifis?: Array<WifisItem>;
};
