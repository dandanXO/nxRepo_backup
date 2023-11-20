// import {environment} from "../environments/environment";

// import LOGO from "./coco777bet/LOGO.png";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const LOGO = require(`./coco777bet/LOGO.png`)

export type IAssetMapping =  {
  logo: any;
  header: {
    menu: any
  },
  tab: {
    home: any;
    invite: any;
    vip: any;
    account: any;

    slot: any;
  },
}

export const AssetMappingCoco: IAssetMapping = {
  logo: require(`./wild777bet/LOGO.png`),
  //header
  header: {
    menu: require(`./wild777bet/ic_menu.png`)
  },
  //tab
  tab: {
    home: require(`./wild777bet/ic_home_h5`),
    // ic_home_inactive
    invite: require(`./coco777bet/ic_invite_friends_h5.png`),
    // ic_invite_friends_inactive
    vip: require(`./coco777bet/ic_vip_h5.png`),
    // ic_vip_inactive
    account: require(`./coco777bet/ic_account_h5.png`),
    // ic_account_inactive
    slot: require(`./coco777bet/ic_game_h5.png`),
    // ic_game_inactive
  }
}
