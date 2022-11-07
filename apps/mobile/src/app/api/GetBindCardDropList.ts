export interface GetBindCardDropListResponse {
  availableWalletVendors: WalletVendor[];
  showBankOption: boolean;
}

interface WalletVendor {
  code:	string;
  displayName:	string;
}
