
import {WalletDepositNextPage as PWalletDepositNextPage} from './env/pernambucana/WalletDepositNextPage';
import {WalletDepositNextPage as WWalletDepositNextPage} from './env/wild/WalletDepositNextPage';
import {WalletDepositNextPage as CWalletDepositNextPage} from './env/coco/WalletDepositNextPage';
import {WalletDepositNextPage as RWalletDepositNextPage} from './env/riojungle/WalletDepositNextPage';


import { renderByPlatform } from "../../utils/renderByPlatform";



export const WalletDepositNextPage = renderByPlatform({
  "u1": CWalletDepositNextPage,
  "wild777bet": WWalletDepositNextPage,
  "u2": RWalletDepositNextPage,
}, PWalletDepositNextPage);
