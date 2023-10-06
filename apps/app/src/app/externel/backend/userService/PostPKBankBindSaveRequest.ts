export interface PostPKBankBindSaveRequest {
  bankAccNr: string; // 銀行帳戶
  mobileWallet: boolean; // 是否為電子錢包
  mobileWalletAccount: string; // 電子錢包帳號
  walletVendor: string; // 電子錢包商
  bankCode: string; // 銀行代碼
  bankName: string; // 銀行名稱
  //   iban: string; // IBAN
}
