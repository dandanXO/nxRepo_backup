export interface GetBindCardDropListResponse {
  availableWalletVendors: WalletVendor[];
  showBankOption: boolean;
  availableBanks: BankVendor[];
}

export interface WalletVendor {
  code: string;
  displayName: string;
}

export interface BankVendor {
  bankCode: string;
  bankName: string;
}
