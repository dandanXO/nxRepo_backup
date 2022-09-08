/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type KycItem = {
    /**
     * 项目名称
     */
    name?: KycItem.name;
    /**
     * 是否已通过认证
     */
    pass?: boolean;
};

export namespace KycItem {
    /**
     * 项目名称
     */
    export enum name {
        APP = "APP",
        AUDIO = "AUDIO",
        BANK_CARD = "BANK_CARD",
        BLUETOOTH = "BLUETOOTH",
        CALL_RECORD = "CALL_RECORD",
        CONTACT = "CONTACT",
        EMERG_CONTACT = "EMERG_CONTACT",
        FILE = "FILE",
        ID_CARD = "ID_CARD",
        LIVNESS = "LIVNESS",
        LOCATION = "LOCATION",
        NETWORK = "NETWORK",
        PAN_CARD = "PAN_CARD",
        PERSONAL_INFO = "PERSONAL_INFO",
        PHOTO = "PHOTO",
        QUESTIONNAIRE = "QUESTIONNAIRE",
        SIM = "SIM",
        SMS = "SMS",
        SYSTEM = "SYSTEM",
        VIDEO = "VIDEO",
    }
}
