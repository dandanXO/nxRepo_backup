/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Option } from "./Option";

export type PanCardOcrReviewItem = {
    code?: PanCardOcrReviewItem.code;
    defaultValue?: string;
    editable?: boolean;
    format?: PanCardOcrReviewItem.format;
    hint?: string;
    options?: Array<Option>;
    required?: boolean;
    title?: string;
};

export namespace PanCardOcrReviewItem {
    export enum code {
        BIRTHDAY = "BIRTHDAY",
        FATHER_NAME = "FATHER_NAME",
        GENDER = "GENDER",
        PAN_CARD_NAME = "PAN_CARD_NAME",
        PAN_ID_NUMBER = "PAN_ID_NUMBER",
    }

    export enum format {
        DATE = "DATE",
        DATETIME = "DATETIME",
        EMAIL = "EMAIL",
        NUMBER = "NUMBER",
        PHONE = "PHONE",
        SELECT = "SELECT",
        TEXT = "TEXT",
    }
}
