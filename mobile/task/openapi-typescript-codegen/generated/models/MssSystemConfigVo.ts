/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RadioValue } from "./RadioValue";

export type MssSystemConfigVo = {
    channelId: number;
    group: string;
    inputType?: string;
    key: string;
    max?: number;
    min?: number;
    name: string;
    options?: Array<RadioValue>;
    pattern?: string;
    remark: string;
    scale?: number;
    value: string;
};
