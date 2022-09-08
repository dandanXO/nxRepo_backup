/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IDCardOcrSubmitItem } from "./IDCardOcrSubmitItem";

export type IDCard_ = {
    items?: Array<IDCardOcrSubmitItem>;
    /**
     * OCR类型  EX: ADVANCE
     */
    kycProvider?: string;
};
