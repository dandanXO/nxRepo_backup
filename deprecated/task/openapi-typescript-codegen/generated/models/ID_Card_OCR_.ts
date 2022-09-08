/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IDCardOcrReviewItem } from "./IDCardOcrReviewItem";

export type ID_Card_OCR_ = {
    items?: Array<IDCardOcrReviewItem>;
    /**
     * OCR类型  EX: ADVANCE
     */
    kycProvider?: ID_Card_OCR_.kycProvider;
};

export namespace ID_Card_OCR_ {
    /**
     * OCR类型  EX: ADVANCE
     */
    export enum kycProvider {
        ADVANCE = "ADVANCE",
        GCT = "GCT",
        MOBI = "MOBI",
    }
}
