/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PanCardOcrReviewItem } from "./PanCardOcrReviewItem";

export type PAN_Card_OCR_ = {
    items?: Array<PanCardOcrReviewItem>;
    /**
     * OCR类型  EX: ADVANCE
     */
    kycProvider?: PAN_Card_OCR_.kycProvider;
};

export namespace PAN_Card_OCR_ {
    /**
     * OCR类型  EX: ADVANCE
     */
    export enum kycProvider {
        ADVANCE = "ADVANCE",
        GCT = "GCT",
        MOBI = "MOBI",
    }
}
