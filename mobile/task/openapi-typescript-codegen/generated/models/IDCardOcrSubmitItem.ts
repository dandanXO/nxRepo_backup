/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IDCardOcrSubmitItem = {
    code?: IDCardOcrSubmitItem.code;
    value?: string;
};

export namespace IDCardOcrSubmitItem {
    export enum code {
        BIRTHDAY = "BIRTHDAY",
        CITY = "CITY",
        CURRENT_ADDRESS = "CURRENT_ADDRESS",
        DISTRICT = "DISTRICT",
        EXPIRY_DATE = "EXPIRY_DATE",
        FAMILY_NUMBER = "FAMILY_NUMBER",
        FATHER_NAME = "FATHER_NAME",
        FULL_ADDRESS = "FULL_ADDRESS",
        GENDER = "GENDER",
        IDENTIFIER = "IDENTIFIER",
        ID_NAME = "ID_NAME",
        ID_NUMBER = "ID_NUMBER",
        ISSUE_DATE = "ISSUE_DATE",
        PIN_CODE = "PIN_CODE",
        STATE = "STATE",
        STREET = "STREET",
        SUB_DISTRICT = "SUB_DISTRICT",
    }
}
