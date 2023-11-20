
import {WalletDepositNextPage as CWalletDepositNextPage} from './env/coco/WalletDepositNextPage';
import {WalletDepositNextPage as WWalletDepositNextPage} from './env/wild/WalletDepositNextPage';
import {WalletDepositNextPage as PWalletDepositNextPage} from './env/pernambucana/WalletDepositNextPage';
import { renderByPlatform } from "../../utils/renderByPlatform";



export const WalletDepositNextPage = renderByPlatform({
  "coco777bet": CWalletDepositNextPage,
  "wild777bet": WWalletDepositNextPage
}, PWalletDepositNextPage);
