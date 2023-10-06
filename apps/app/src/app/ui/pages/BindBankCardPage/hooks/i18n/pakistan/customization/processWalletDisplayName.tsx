import {WalletVendor} from '../../../../../../../externel/backend/rtk/old/GetBindCardDropList';

export const processWalletDisplayName = (wallet: WalletVendor) => {
  // if (wallet.code === "JAZZCASH") {
  //   return <div>{wallet.displayName}<span style={{color: "#f82626", marginLeft: 2, fontWeight: 600}}>Faster arrival & better discount</span></div>
  // }
  return wallet.displayName;
};
