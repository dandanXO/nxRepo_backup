// postBankBindSave

export interface PostBankBindSaveRequest {
    /** 銀行帳戶 **/
    bankAccount: string;
    /** 印度 银行代号 **/
    ifscCode: string;
    /** 印度 UPI number **/
    upiId: string;
}

export interface PostBankBindSaveResponse {}
