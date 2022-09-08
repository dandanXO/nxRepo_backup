/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type adjust_Token = {
    /**
     * key
     */
    key?: adjust_Token.key;
    /**
     * event token
     */
    token?: string;
};

export namespace adjust_Token {
    /**
     * key
     */
    export enum key {
        AUTH_APP_LIST = "AUTH_APP_LIST",
        AUTH_BANK_ACCOUNT_BINDING = "AUTH_BANK_ACCOUNT_BINDING",
        AUTH_BANK_ACCOUNT_BINDING2 = "AUTH_BANK_ACCOUNT_BINDING2",
        AUTH_CDR = "AUTH_CDR",
        AUTH_CONTACTS = "AUTH_CONTACTS",
        AUTH_ID_CARD = "AUTH_ID_CARD",
        AUTH_LIVENESS = "AUTH_LIVENESS",
        AUTH_PAN_CARD = "AUTH_PAN_CARD",
        AUTH_PERSONAL_INFO = "AUTH_PERSONAL_INFO",
        CERTIFICATED = "CERTIFICATED",
        FIRST_LOAN = "FIRST_LOAN",
        FORCE_APPLY = "FORCE_APPLY",
        LOAN_COMPLETE = "LOAN_COMPLETE",
        LOAN_SUCCESS = "LOAN_SUCCESS",
        OVERDUE_FIRST = "OVERDUE_FIRST",
        REGISTER = "REGISTER",
        REPAYMENT_COMPLETE_FIRST = "REPAYMENT_COMPLETE_FIRST",
    }
}
