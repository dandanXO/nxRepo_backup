
import {WalletDepositNextPage as PWalletDepositNextPage} from './env/pernambucana/WalletDepositNextPage';
import {WalletDepositNextPage as WWalletDepositNextPage} from './env/wild/WalletDepositNextPage';
import {WalletDepositNextPage as CWalletDepositNextPage} from './env/coco/WalletDepositNextPage';
import {WalletDepositNextPage as RWalletDepositNextPage} from './env/riojungle/WalletDepositNextPage';


import { renderByUVersion } from "../../utils/renderByUVersion";



export const WalletDepositNextPage = renderByUVersion({
  "u1": CWalletDepositNextPage,
  "wild777bet": WWalletDepositNextPage,
  "u2": RWalletDepositNextPage,
}, PWalletDepositNextPage);
