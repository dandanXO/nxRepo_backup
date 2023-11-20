// import {environment} from "../../../../environments/environment";
import React from "react";
// import LOGO from "../../../../assets/coco777bet/LOGO.png";
import {AssetMappingCoco} from "../../../../assets/assetMapping.coco";
export const Logo = () => {
  return (
    // <img className={"w-[50px] h-[50px]"} src={`assets/${environment.assetPrefix}/LOGO.png`}/>
    <img className={"w-[50px] h-[50px]"} src={AssetMappingCoco["logo"]}/>
  )
}
