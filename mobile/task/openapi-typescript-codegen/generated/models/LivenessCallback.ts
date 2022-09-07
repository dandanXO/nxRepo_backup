/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Data } from "./Data";

export type LivenessCallback = {
    comment?: string;
    content?: string;
    data?: Data;
    imei_code?: string;
    par1?: string;
    report_id?: string;
    status?: number;
    uid?: string;
};
