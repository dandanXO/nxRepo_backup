import {BankAccount} from "./BankAccount";

export interface GetBankCardListResponse {
    bankAccounts: BankAccount[];
    tip: string;
}

