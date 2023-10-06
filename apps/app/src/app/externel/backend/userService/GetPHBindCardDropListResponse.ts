import {WalletVendor} from './WalletVendor';

export interface GetPHBindCardDropListResponse {
  availableWalletVendors: WalletVendor[];
  showBankOption: boolean;
}
