import {WalletVendor} from "../../../../../../../api/GetBindCardDropList";

export const processWalletDisplayName = (wallet: WalletVendor) => {
  if (wallet.code === "JAZZCASH") {
    return <div>{wallet.displayName}<span style={{color: "#f82626", marginLeft: 8, fontWeight: 600}}>Get better discount</span></div>
  }
  return wallet.displayName;
}
