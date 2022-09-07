/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankAccount } from "./BankAccount";

export type LoanApplyDetail = {
    /**
     * 已綁定銀行帳戶
     */
    bankAccounts?: Array<BankAccount>;
    /**
     * 產品客服郵件
     */
    csEmail?: string;
    /**
     * 產品客服時間
     */
    csTime?: string;
    /**
     * 日利息
     */
    dailyFee?: number;
    /**
     * 訂單到期日 yyyy-MM-dd
     */
    dueDate?: string;
    /**
     * 借款金額
     */
    loanAmount?: number;
    /**
     * logo
     */
    logoUrl?: string;
    /**
     * 應還金額 (Total Amount)
     */
    payableAmount?: number;
    /**
     * 產品流水號
     */
    productId?: number;
    /**
     * 產品名稱
     */
    productName?: string;
    /**
     * 服務費
     */
    serviceCharge?: number;
    /**
     * 稅額
     */
    taxFee?: number;
    /**
     * 借款詳情模板  1: 借款金額 = 到手金額  2: 借款金額 = 應還金額
     */
    templateType?: LoanApplyDetail.templateType;
};

export namespace LoanApplyDetail {
    /**
     * 借款詳情模板  1: 借款金額 = 到手金額  2: 借款金額 = 應還金額
     */
    export enum templateType {
        "_1" = 1,
        "_2" = 2,
    }
}
