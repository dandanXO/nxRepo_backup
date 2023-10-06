import {BankVendor} from './BankVendor';

export interface GetMXBindCardDropListResponse {
  availableBanks: BankVendor[];
  showBankOption: boolean;
  cardholderName: string;
}
