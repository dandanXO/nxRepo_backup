// import {environment} from "../environments/environment";

// import LOGO from "./coco777bet/LOGO.png";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const LOGO = require(`./coco777bet/LOGO.png`)

export type IAssetMapping =  {
  // logo: any;
  //header
  header: {
    menu: any
  };
  game: {
    unfavorite: any;
    favorite: any;
  };
  tab: {
    home: any;
    invite: any;
    vip: any;
    account: any;
  };
}

export const AssetMappingCoco: IAssetMapping = {
  // logo: require(`./coco777bet/LOGO.png`),
  //header
  //header
  game: {
    unfavorite: require(`./u1/icon=favorite-default.png`),
    favorite: require(`./u1/icon=favorite-active.png`),
  },
  header: {
    menu: require(`./u1/icon=menu.png`)
  },
  //tab
  tab: {
    home: require(`./u1/icon=tab-home.png`),
    invite: require(`./u1/icon=tab-convidar.png`),
    vip: require(`./u1/icon=tab-vip.png`),
    account: require(`./u1/icon=tab-account.png`),
  }
}
