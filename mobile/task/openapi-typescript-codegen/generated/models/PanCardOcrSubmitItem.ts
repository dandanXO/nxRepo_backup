/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PanCardOcrSubmitItem = {
    code?: PanCardOcrSubmitItem.code;
    value?: string;
};

export namespace PanCardOcrSubmitItem {
    export enum code {
        BIRTHDAY = "BIRTHDAY",
        FATHER_NAME = "FATHER_NAME",
        GENDER = "GENDER",
        PAN_CARD_NAME = "PAN_CARD_NAME",
        PAN_ID_NUMBER = "PAN_ID_NUMBER",
    }
}
