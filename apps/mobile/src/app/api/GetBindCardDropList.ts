export interface GetBindCardDropListResponse {
  availableWalletVendors: WalletVendor[];
  showBankOption: boolean;
}

export interface WalletVendor {
  code:	string;
  displayName:	string;
}
