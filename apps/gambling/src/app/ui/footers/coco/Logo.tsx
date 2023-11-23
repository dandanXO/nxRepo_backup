import React from "react";
// import LOGO from "../../../../assets/coco777bet/LOGO.png";
import {AssetMappingCoco} from "../../../../assets/assetMapping.coco";
import cx from "classnames";
type ILogo = {
  className?: string;
}
export const Logo = (props: ILogo) => {
  return (
    // <img className={"w-[50px] h-[50px]"} src={`assets/${environment.assetPrefix}/LOGO.png`}/>
    <img className={cx("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
