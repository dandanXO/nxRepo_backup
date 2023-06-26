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

export interface PostPKBankBindSaveRequest {
    bankAccNr: string; // 銀行帳戶
    mobileWallet: boolean; // 是否為電子錢包
    mobileWalletAccount: string; // 電子錢包帳號
    walletVendor: string; // 電子錢包商
    bankCode: string; // 銀行代碼
    bankName: string; // 銀行名稱
    // iban: string; // IBAN
}

export interface PostBangladeshBankBindSaveRequest {
    bankAccNr: string;
    // 銀行帳戶

    mobileWallet: boolean;
    // 是否為電子錢包

    mobileWalletAccount: string;
    // 電子錢包帳號

    walletVendor: string;
    // 電子錢包商
}
export interface PostPKBankBindSaveResponse {}
