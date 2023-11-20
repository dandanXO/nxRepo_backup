// import {environment} from "../environments/environment";

// import LOGO from "./coco777bet/LOGO.png";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const LOGO = require(`./coco777bet/LOGO.png`)

export type IAssetMapping =  {
  logo: any;
  //header
  header: {
    menu: any
  },
  tab: {
    home: any;
    invite: any;
    vip: any;
    account: any;
  }
}

export const AssetMappingCoco: IAssetMapping = {
  logo: require(`./coco777bet/LOGO.png`),
  //header
  //header
  header: {
    menu: require(`./coco777bet/icon=menu.png`)
  },
  //tab
  tab: {
    home: require(`./coco777bet/icon=tab-home.png`),
    invite: require(`./coco777bet/icon=tab-convidar.png`),
    vip: require(`./coco777bet/icon=tab-vip.png`),
    account: require(`./coco777bet/icon=tab-account.png`),
  }
}
