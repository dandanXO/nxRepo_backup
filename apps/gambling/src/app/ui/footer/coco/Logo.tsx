import React from "react";
import {AssetMappingCoco} from "../../../../assets/assetMapping.coco";
import { twMerge } from 'tailwind-merge';
import {environment} from "../../../../environments/environment";

type ILogo = {
  className?: string;
}
export const Logo = (props: ILogo) => {
  return (
    <img className={"w-[50px] h-[50px]"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/LOGO.png`}/>
    // <img className={twMerge("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
