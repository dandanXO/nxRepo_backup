import {BankVendor} from "./BankVendor";
import {WalletVendor} from "./WalletVendor";

export interface GetBindCardDropListResponse {
  availableWalletVendors: WalletVendor[];
  showBankOption: boolean;
  availableBanks: BankVendor[];
}

