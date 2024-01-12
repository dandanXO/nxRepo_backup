
import {WalletDepositNextPage as PWalletDepositNextPage} from './env/pernambucana/WalletDepositNextPage';
import {WalletDepositNextPage as WWalletDepositNextPage} from './env/wild/WalletDepositNextPage';
import {WalletDepositNextPage as CWalletDepositNextPage} from './env/u1/WalletDepositNextPage';
import {WalletDepositNextPage as RWalletDepositNextPage} from './env/u2/WalletDepositNextPage';


import { renderByUVersion } from "../../utils/renderByUVersion";



export const WalletDepositNextPage = renderByUVersion({
  "u1": CWalletDepositNextPage,
  "wild777bet": WWalletDepositNextPage,
  "u2": RWalletDepositNextPage,
}, PWalletDepositNextPage);
