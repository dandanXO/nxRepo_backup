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
